import React, {  useState } from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';
import Bisection from './bisection';
import FalsePosition from './false_position';
import Secant from './secant.js';
import Onepoint from './onepoint.js';
import Backwardh from './backwardh.js';
import Backwardh2 from './backwardh2.js';
import Centralh from './centralh.js';
import Centralh2 from './centralh2.js';
import Forwardh from './forwardh.js';
import Forwardh2 from './forwardh2.js';
import CompositeTrap from './compositeTrap.js';
import CompositeSimpson from './compositeSimpson.js';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined ,UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Newtonraphson from './newton_raphson';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App(){
  const [page, setpage] = useState();
  const bisection = () => setpage(<Bisection />)
  const falsePosition = () => setpage(<FalsePosition />)
  const newtonraphson = () => setpage(<Newtonraphson />)
  const secant = () => setpage(<Secant />)
  const onepoint = () => setpage(<Onepoint />)
  const backwardh = () => setpage(<Backwardh />)
  const backwardh2 = () => setpage(<Backwardh2 />)
  const centralh = () => setpage(<Centralh />)
  const centralh2 = () => setpage(<Centralh2 />)
  const forwardh = () => setpage(<Forwardh />)
  const forwardh2 = () => setpage(<Forwardh2 />)
  const compositeTrap = () => setpage(<CompositeTrap />)
  const compositeSimpson = () => setpage(<CompositeSimpson />)
return(
<Layout> 
    <Header className="header">
      <div className="logo" />
      <Menu
            theme="dark"
            mode="horizontal"
            style={{ height: '100%' }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  Differentiation
                </span>
              }
            >
              <Menu.Item onClick={backwardh}>Backwardh</Menu.Item>
              <Menu.Item onClick={backwardh2}>Backwardh 2</Menu.Item>
              <Menu.Item onClick={centralh}>Centralh</Menu.Item>
              <Menu.Item onClick={centralh2}>Centralh 2</Menu.Item>
              <Menu.Item onClick={forwardh}>Forwardh</Menu.Item>
              <Menu.Item onClick={forwardh2}>Forwardh 2</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <LaptopOutlined />
                  Integration
                </span>
              }
            >
              <Menu.Item onClick={compositeSimpson}>CompositeSimpson</Menu.Item>
              <Menu.Item onClick={compositeTrap}>CompositeTrapzoidal</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <NotificationOutlined />
                  Interpolation
                </span>
              }
            >
              <Menu.Item key="9">Lagrange</Menu.Item>
              <Menu.Item key="10">Newton</Menu.Item>
              <Menu.Item key="11">Spline</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <NotificationOutlined />
                  Linear Algebra
                </span>
              }
            >
              <Menu.Item key="12">Cholesky</Menu.Item>
              <Menu.Item key="13">Cramer</Menu.Item>
              <Menu.Item key="14">Gauss</Menu.Item>
              <Menu.Item key="15">Gradient</Menu.Item>
              <Menu.Item key="16">Inverse</Menu.Item>
              <Menu.Item key="17">Jacobi</Menu.Item>
              <Menu.Item key="18">Jordan</Menu.Item>
              <Menu.Item key="19">LU</Menu.Item>
              <Menu.Item key="20">Seidel</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <NotificationOutlined />
                  ODE
                </span>
              }
            >
              <Menu.Item key="21">Euler</Menu.Item>
              <Menu.Item key="22">Heun</Menu.Item>
              <Menu.Item key="23">Modified_Euler</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <NotificationOutlined />
                  Regression
                </span>
              }
            >
              <Menu.Item key="24">Linear</Menu.Item>
              <Menu.Item key="25">MultipleLinear</Menu.Item>
              <Menu.Item key="26">Polynomial</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <NotificationOutlined />
                  Root of Equation
                </span>
              }
            >
              <Menu.Item onClick={bisection}>Bisection</Menu.Item>
              <Menu.Item onClick={falsePosition}>False-position</Menu.Item>
              <Menu.Item onClick={newtonraphson}>Newton-raphson</Menu.Item>
              <Menu.Item onClick={secant}>Secant</Menu.Item>
              <Menu.Item onClick={onepoint}>Onepoint</Menu.Item>
            </SubMenu>
          </Menu>
    </Header>
    <Content style={{ padding: '0 10px' }}>
    {page}
    </Content>
  </Layout>
);
}

export default App;
