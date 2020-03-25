import React, { Component } from 'react';
import './App.css';
import { Card, Input, Button, Table ,Layout} from 'antd';
import { range, compile, derivative} from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios' ;

var y, error, exact;
class Centralh extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x+(1*h)) - this.func(x-(1*h))) / (2*h)
                break;
            case 2:
                y = (this.func(x+(1*h)) - 2*this.func(x) + this.func(x-(1*h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + 2*this.func(x-(1*h)) - this.func(x-(2*h))) / (2*Math.pow(h, 3))
                break;
            default:
                y = (this.func(x+(2*h)) - 4*this.func(x+(1*h)) + 6*this.func(x) - 4*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((exact-y) / exact)
        this.setState({
            showOutputCard: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }
    componentDidMount(){
        axios.get("http://192.168.99.100:3001/api/diffs").then(res=>{
            console.log(res.data)
            console.log(res.data.data.fx)
            this.setState({fx: res.data.data[0].fx});
            this.setState({degree: res.data.data[0].degree});
            this.setState({x: res.data.data[0].x});
            this.setState({h: res.data.data[0].h});
        })
      }

    render() { 
        return (
        <Layout style={{ minHeight: '100vh' }}>
                    
            <h2 style={{ color: "black", fontWeight: "bold" }}>Centralh</h2>
                        
                <div
                    onChange={this.handleChange}
                    style={{ marginLeft: 20, marginTop: 10, width: 400 }}
                >
                <h2>Equation</h2><Input size="large" name="fx" style={{ width: 200 }}></Input>
                <h2>degree</h2><Input size="large" name="degree" style={{ width: 200 }}></Input>
                <h2>x</h2><Input size="large" name="x" style={{ width: 200 }}></Input>
                <h2>h</h2><Input size="large" name="h" style={{ width: 200 }}></Input><br /><br />
                <Button onClick= {()=>this.backwardh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))}  
                style={{  marginLeft: 0 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                <Button onClick={() => this.componentDidMount()}
                style={{  marginLeft: 10 ,color:'#ffffff',background:'#12406A'}}>call data</Button>
                <br /><br />
                </div>
                {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                            id="output12"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Calculation value = {y.toFixed(6)}<br/>
                                True value = {exact.toFixed(6)}<br/>
                                Error(ε) = {error.toFixed(6)}<br/>
                            </p>
                        </Card>
                    }
                    
             </Layout>
          );
        }
    }
    
      export default Centralh;