import React from 'react';
import {Layout} from "antd";
import SideMenu from './SideMenu';

const {Sider} = Layout;

class SideBar extends React.Component {
    render(){
        return (
            <Sider collapsed={this.props.collapsed}>
                <div style={{ float: "left", height:64,padding:"10px 20px"}}>
                    {this.props.collapsed ?
                    <img style={{height:36}} src="/logo.svg"/> :
                    <img style={{height:36}} src="/logo_white.svg"/>
                    }
                </div>

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