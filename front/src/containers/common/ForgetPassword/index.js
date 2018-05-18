import React from 'react';
import {Route} from "react-router-dom";
import Forget from "./Forget";
import Reset from "./Reset";

class ForgetPassword extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <Route path={"/pass/forget"} component={Forget}/>
                <Route path={"/pass/reset"} component={Reset}/>
            </div>
        );
    }
}

export default ForgetPassword;