import React from 'react';
import HeadBar from "./Header/index";
import Footer from "./Footer/index";
import {Layout} from "antd";
import Apply from "./Apply";
import Home from "./Home";
import Classroom from "./Classroom";
import {Redirect, Route, Switch} from "react-router-dom";

const {Content} = Layout;


function isLogined() {
    return !!localStorage.getItem("token");
}

class FrontApp extends React.Component{

    render(){
        return (
            <Layout style={{height:"100%"}}>
                <HeadBar/>
                <Content style={{paddingTop:10}}>
                    <Switch>
                        <Route path="/home"  component={Home}/>
                        <Route path="/apply" render={ () => (isLogined() ?
                            <Apply/> : <Redirect to="/login"/>)}/>
                        <Route path="/classroom"  component={Classroom}/>
                    </Switch>
                    </Content>
                <Footer/>
            </Layout>
        );
    }

}

export default FrontApp;