import React from 'react';
import {Icon, Layout, Menu} from 'antd';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeadBar extends React.Component{
    render(){
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
                            <span>Keaper</span>
                        </div>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="logout"><span >退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default HeadBar;