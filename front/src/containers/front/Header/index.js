import React from 'react';
import {Icon, Layout, Menu} from 'antd';
import './index.less';
import {Link, withRouter} from "react-router-dom";
import {getUserInfo} from "../../../redux/action";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeadBar extends React.Component{
    constructor(){
        super();
    }

    componentWillMount(){
        if(!!localStorage.getItem("token")){
            this.props.getUserInfo();
        }
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };

    render(){
        const {userInfo} = this.props;
        return (
            <Header className="header-container">
                <div className="logo"></div>
                <Menu mode="horizontal" className="header-menu">
                    <Menu.Item key="1">
                        <Link to="/apply">申请教室</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/classroom">教室查询</Link>
                    </Menu.Item>
                    {!!localStorage.getItem('token') ? (
                        <SubMenu style={{float:"right"}} title={
                            <div>
                                <Icon type="user" />
                                <span>{userInfo ? userInfo.name : ""}</span>
                            </div>}>
                            <Menu.Item key="user-center"><span >用户中心</span></Menu.Item>
                            <Menu.Item key="logout" ><span onClick={this.handleLogout}>退出登录</span></Menu.Item>
                        </SubMenu>
                    ) : (
                        <Menu.Item key="3" style={{float:"right"}}>
                            <Link to={"/login"}>登录</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    userInfo:state.user.loginedUser
});

const mapDispatchToProps = dispatch => ({
    getUserInfo:bindActionCreators(getUserInfo,dispatch)
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeadBar));