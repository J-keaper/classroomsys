import React from 'react';
import {Icon, Layout, Menu} from 'antd';
import './index.less';
import {Link} from "react-router-dom";

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeadBar extends React.Component{
    render(){
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
                    <Menu.Item key="3" style={{float:"right"}}>登录</Menu.Item>
                    <SubMenu style={{float:"right"}} title={
                        <div>
                            <Icon type="user" />
                            <span>Keaper</span>
                        </div>}>
                        <Menu.Item key="user-center"><span >用户中心</span></Menu.Item>
                        <Menu.Item key="logout"><span >退出登录</span></Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default HeadBar;