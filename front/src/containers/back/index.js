import React from 'react';
import {Layout} from 'antd';
import SideBar from "./SideBar";
import HeadBar from "./HeadBar";
import Footer from "./Footer";
import {menus} from "../../constants/menus";
import AdminApply from "./Apply";
import AdminClassroom from "./Classroom";
import AdminUser from "./User";
import AdminClassroomImport from "./Classroom/ClassroomImport";
import AdminHome from "./Home";
import AdminUserImport from "./User/UserImport";
import AdminHelp from "./Help";
import AdminApplyAudit from "./Audit";
import {Route} from "react-router-dom";

const {Content} = Layout;
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            collapsed: false,
        };
    }

    toggle = ()=>{
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <Layout style={{height:"100%"}}>
                <SideBar collapsed={this.state.collapsed} menus={menus} />
                <Layout>
                    <HeadBar collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Content>
                        <Route path="/admin" exact component={AdminHome}/>
                        <Route path="/admin/apply" exact component={AdminApply}/>
                        <Route path="/admin/apply/audit/:id" component={AdminApplyAudit}/>
                        <Route path="/admin/user" exact component={AdminUser}/>
                        <Route path="/admin/user/import" exact component={AdminUserImport}/>
                        <Route path="/admin/classroom" exact component={AdminClassroom}/>
                        <Route path="/admin/classroom/import" exact component={AdminClassroomImport}/>
                        <Route path="/admin/help" component={AdminHelp}/>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        );
    }
}
export default App;