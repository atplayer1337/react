import React, { Component } from 'react';
import './App.css';
import { Card, Input, Button, Table, Layout } from 'antd';
import { range, compile, derivative } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios' ;

var dataTable = []
var dataA = []

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x"
  },
  {
    title: "Error",
    key: "error",
    dataIndex: "error"
  }
];
class Secant extends Component {
  constructor() {
    super();
    this.state = {
      fx: "",
      xold: 0,
      xnew: 0,
      showOutput: false,
      showGraph: false,
    }
    this.myChange = this.myChange.bind(this);
    this.secant = this.secant.bind(this);
  }
  secant() {
    var xold = parseFloat(this.state.xold)
    var xnew = parseFloat(this.state.xnew)
    var xm = 0, sum = parseFloat(0.000000);
    var i = 0;
    var data = []
    data['x'] = []
    data['error'] = []
    data['iteration'] = []

    do {
      xnew.toFixed(6)
      xm = xnew.toFixed(6)
      xnew = xnew - (this.func(xnew) / this.funcD())
      xold = xnew.toFixed(6);
      sum = this.error(xnew, xm)
      data['iteration'][i] = i;
      data['x'][i] = xnew.toFixed(6);
      data['error'][i] = Math.abs(sum).toFixed(6);
      console.log(Math.abs(sum))
      i++;
    } while (Math.abs(sum) > 0.000001);
    this.createTable(data['x'], data['error']);
    this.setState({
      showOutput: true,
      showGraph: true
    })

  }
  func(X) {
    var exp = compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return exp.eval(scope);
  }
  funcD() {
    return (this.func(this.state.xold) - this.func(this.state.xnew)) / (this.state.xold - this.state.xnew)
  }
  error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
  }
  myChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  createTable(x, error) {
    for (var i = 0; i < x.length; i++) {
      dataTable.push({
        iteration: i + 1,
        x: x[i],
        error: error[i]
      });
      dataA.push({
        x: x[i],
        y: this.func(x[i]).toFixed(6),
      });
    }

  }
  componentDidMount(){
    axios.get("http://192.168.99.100:3001/api/secants").then(res=>{
        console.log(res.data)
        console.log(res.data.data.fx)
        this.setState({fx: res.data.data[0].fx});
        this.setState({xold: res.data.data[0].xold});
        this.setState({xnew: res.data.data[0].xnew});
    })
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <h2 style={{ color: "black", fontWeight: "bold" }}>Secant</h2>
        <div
          onChange={this.myChange}
          style={{ marginLeft: 20, marginTop: 10, width: 400 }}
        >
          <h2>Equation</h2><Input size="large" name="fx" style={{ width: 200, }}></Input>
          <h2>X<sub>old</sub></h2><Input size="large" name="xold" style={{ width: 200 }}></Input>
          <h2>X<sub>new</sub></h2><Input size="large" name="xnew" style={{ width: 200 }}></Input><br /><br />
          <Button onClick={() => this.secant()}
            style={{ marginLeft: 0, color: '#ffffff', background: '#12406A' }}>Submit</Button>
            <Button onClick={() => this.componentDidMount()}
            style={{  marginLeft: 10 ,color:'#ffffff',background:'#12406A'}}>call data</Button><br /><br />
        </div>
        {this.state.showOutput &&
          <div
            title={"Output12"}
            bordered={true}
            style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
            id="output12"
          >
            <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataTable} pagination={{ pageSize: 10 }} >

            </Table>
          </div>
        }
        {this.state.showGraph &&
          <div>

            <LineChart
              width={950}
              height={400}
              data={dataA}
              margin={{ top: 30, bottom: 10 }}
              style={{ backgroundColor: "#fff" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis
                type="number"
                dataKey="y"
                domain={["auto", "auto"]}
                allowDataOverflow="true"
              />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="y" stroke="#8884d8" />
            </LineChart>

          </div>
        }
      </Layout>
    );
  }
}
export default Secant; 