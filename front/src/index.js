import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from "./App";

ReactDom.render(
    <BrowserRouter>
        <Route path="/" component={App}/>
    </BrowserRouter>
    ,document.getElementById("root")
);