import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminApp from "./containers/back";
import FrontApp from "./containers/front";
import {Switch} from "react-router";
import Login from './containers/common/Login'
import store from './redux/store';
import {Provider} from "react-redux";

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={AdminApp}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={FrontApp}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ,document.getElementById("root")
);