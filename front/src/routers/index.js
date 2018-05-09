import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminHome from "../containers/back/Home";
import AdminApply from "../containers/back/Apply";
import AdminUser from "../containers/back/User";
import AdminUserImport from "../containers/back/User/UserImport";
import AdminClassroom from "../containers/back/Classroom";
import AdminClassroomImport from "../containers/back/Classroom/ClassroomImport";
import AdminHelp from "../containers/back/Help";
import AdminApplyAudit from '../containers/back/Audit';

import Home from '../containers/front/Home';
import Apply from '../containers/front/Apply';
import Classroom from '../containers/front/Classroom';

export  class AdminRouter extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/admin" exact component={AdminHome}/>
                <Route path="/admin/apply" exact component={AdminApply}/>
                <Route path="/admin/apply/audit/:id" component={AdminApplyAudit}/>
                <Route path="/admin/user" exact component={AdminUser}/>
                <Route path="/admin/user/import" exact component={AdminUserImport}/>
                <Route path="/admin/classroom" exact component={AdminClassroom}/>
                <Route path="/admin/classroom/import" exact component={AdminClassroomImport}/>
                <Route path="/admin/help" component={AdminHelp}/>
            </Switch>
        );
    }
}

export class FrontRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/apply" component={Apply}/>
                <Route path="/classroom" component={Classroom}/>
            </Switch>
        );
    }
}