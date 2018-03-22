import React from 'react';
import Breadcrumb from '../../../components/Breadcrumb/index';
import {Card} from "antd";

class Help extends  React.Component{
    render(){
        return (
            <div>
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <Card style={{margin:20,marginTop:0}}>
                    <h3>教室管理系统</h3>
                    <div>帮助文档</div>
                </Card>
            </div>
        );
    }
}
export  default Help;