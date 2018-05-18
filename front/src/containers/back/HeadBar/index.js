import React from 'react';
import {Icon, Layout, Menu} from 'antd';
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
        this.props.getUserInfo();
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.history.push("/login");
    };

    render(){
        const {userInfo} = this.props;
        return (
            <Header style={{background:"#fff",padding:0,paddingLeft:20,}}>
                <Icon style={{fontSize:18}}
                    onClick={this.props.toggle}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
                <Menu mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}>
                    <SubMenu title={
                        <div>
                            <Icon type="user" />
                            <span>{userInfo ? userInfo.name : ""}</span>
                        </div>}>
                        <Menu.Item key="front" >
                            <Link to={"/"}>返回前台</Link>
                        </Menu.Item>
                        <Menu.Item key="logout" >
                            <span onClick={this.handleLogout}>退出登录</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    userInfo:state.user.loginedUser
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: bindActionCreators(getUserInfo, dispatch)
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeadBar));