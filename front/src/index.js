import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminApp from "./containers/back";
import FrontApp from "./containers/front";
import {Switch} from "react-router";

ReactDom.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" component={AdminApp}/>
            <Route path="/" component={FrontApp}/>
        </Switch>
    </BrowserRouter>
    ,document.getElementById("root")
);