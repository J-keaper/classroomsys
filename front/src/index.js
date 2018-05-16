import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import AdminApp from "./containers/back";
import FrontApp from "./containers/front";
import Login from './containers/common/Login'
import store from './redux/store';
import {Provider} from "react-redux";


function isLogined() {
    return !!localStorage.getItem("token");
}

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render ={()=>(isLogined() ?
                    <AdminApp/> : <Redirect to="/login"/>)}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={FrontApp}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ,document.getElementById("root")
);