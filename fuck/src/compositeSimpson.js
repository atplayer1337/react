import React, { Component } from 'react';
import './App.css';
import { Card, Input, Button, Table, Layout } from 'antd';
import { range, compile, derivative } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';

var Algebrite = require('algebrite')

var I = 0, exact, error;
class CompositeSimpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_simpson(a, b, n) {
        var h = (b - a) / n
        var x = a
        for (var i = 0; i <= n; i++) {
            if (i === 0 || i === n) {
                I += this.func(x);
            } else {
                if (i % 2 == 1) {
                    I += 4 * this.func(x);
                }
                else {
                    I += 2 * this.func(x);
                }
            }
            x += h
        }
        I = (h / 3) * I
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact - I) / exact)
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({ x: b }) - expr.eval({ x: a })

    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    componentDidMount() {
        axios.get("http://192.168.99.100:3001/api/integrations").then(res => {
            console.log(res.data)
            console.log(res.data.data.fx)
            this.setState({ fx: res.data.data[0].fx });
            this.setState({ a: res.data.data[0].a });
            this.setState({ b: res.data.data[0].b });
            this.setState({ n: res.data.data[0].n });
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>

                <h2 style={{ color: "black", fontWeight: "bold" }}>CompositeSimpson</h2>

                <div
                    onChange={this.handleChange}
                    style={{ marginLeft: 20, marginTop: 10, width: 400 }}
                >
                    <h2>Equation</h2><Input size="large" name="fx" style={{ width: 200 }}></Input>
                    <h2>Lower(a)</h2><Input size="large" name="a" style={{ width: 200 }}></Input>
                    <h2>Upper(b)</h2><Input size="large" name="b" style={{ width: 200 }}></Input>
                    <h2>N</h2><Input size="large" name="n" style={{ width: 200 }}></Input><br /><br />
                    <Button onClick={() => this.composite_simpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))}
                        style={{ marginLeft: 0, color: '#ffffff', background: '#12406A' }}>Submit</Button>
                    <Button onClick={() => this.componentDidMount()}
                        style={{ marginLeft: 10, color: '#ffffff', background: '#12406A' }}>call data</Button>
                    <br /><br />
                </div>
                {this.state.showOutputCard &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                        id="output12"
                    >
                        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                            Calculation value = {I}<br />
                            True value = {exact}<br />
                            Error(ε) = {error.toFixed(6)}<br />
                        </p>
                    </Card>
                }

            </Layout>
        );
    }
}

export default CompositeSimpson;
