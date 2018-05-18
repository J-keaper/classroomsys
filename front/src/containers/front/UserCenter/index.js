import React from 'react';
import {Layout, Menu} from "antd";
import {Link, Route} from "react-router-dom";
import UserApply from "./Apply";
import UserInfo from "./Info";
import UserPassword from "./Password";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class UserCenter extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <Layout style={{padding:60,paddingTop:20,height:"100%",background:"rgb(240,242,245)"}}>
                <Sider width={200} >
                    <Menu mode="inline" style={{ height: '100%' }}>
                        <Menu.Item key="apply">
                            <Link to={"/user/apply"}>我的申请</Link>
                        </Menu.Item>
                        <Menu.Item key="info">
                            <Link to={"/user/info"}>修改信息</Link>
                        </Menu.Item>
                        <Menu.Item key="password">
                            <Link to={"/user/password"}>修改密码</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{marginLeft:10}}>
                    <Route path="/user/apply" component={UserApply}/>
                    <Route path="/user/info" component={UserInfo}/>
                    <Route path="/user/password" component={UserPassword}/>
                </Content>
            </Layout>
        )
    }
}

export default UserCenter;