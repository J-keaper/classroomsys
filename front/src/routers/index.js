import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminHome from "../containers/back/Home";
import AdminApply from "../containers/back/Apply";
import AdminUser from "../containers/back/User";
import AdminClassroom from "../containers/back/Classroom";
import AdminHelp from "../containers/back/Help";

import Apply from '../containers/front/Apply';
import Classroom from '../containers/front/Classroom';

export  class AdminRouter extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/home" component={AdminHome}/>
                <Route path="/admin/apply" component={AdminApply}/>
                <Route path="/admin/user" component={AdminUser}/>
                <Route path="/admin/classroom" component={AdminClassroom}/>
                <Route path="/admin/help" component={AdminHelp}/>
            </Switch>
        );
    }
}

export class FrontRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/apply" component={Apply}/>
                <Route path="/classroom" component={Classroom}/>
            </Switch>
        );
    }
}