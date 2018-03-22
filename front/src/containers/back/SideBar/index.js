import React from 'react';
import {Layout} from "antd";
import SideMenu from './SideMenu';

const {Sider} = Layout;

class SideBar extends React.Component {
    render(){
        return (
            <Sider
                collapsed={this.props.collapsed}
            >
                <div style={{height:50}}/>
                <SideMenu
                    menus={this.props.menus}
                    mode="inline"
                    theme="dark"

                />
            </Sider>
        );
    }

}

export default SideBar;