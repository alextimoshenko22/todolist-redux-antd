//UI уровень
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import ToDoListContainer from './components/Todolist/TodolistContainer';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <HeaderContainer />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Redirect exact from="/" to="/todolist" />
              <Route path="/todolist" render={() => <ToDoListContainer />} />
              <Route path="*" render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>To Do List ©2021 Created by Alex Timoshenko</Footer>
      </Layout>
    );
  };
}

export default App;