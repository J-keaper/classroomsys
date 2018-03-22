import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Divider, Table} from 'antd';


const columns = [{
    title: '账号',
    dataIndex:'account',
    key: 'account',
}, {
    title: '邮箱',
    dataIndex:'email',
    key: 'email',
}, {
    title: '手机',
    dataIndex:'phone',
    key: 'phone',
}, {
    title: '账号类型',
    dataIndex:'type',
    key: 'type',
}, {
    title: '操作',
    key: 'operation',
    render:(text)=>(
        <div>
            <a href="#">详情</a>
            <Divider type="vertical" />
            <a href="#">重置密码</a>
        </div>
    )
}];

const data = [{
    key: '1',
    account:"1407084125",
    email:"1273570695@qq.com",
    phone:"18434361009",
    type:"学生"
}, {
    key: '2',
    account:"1407084125",
    email:"1273570695@qq.com",
    phone:"18434361009",
    type:"教师"
}, {
    key: '3',
    account:"1407084125",
    email:"1273570695@qq.com",
    phone:"18434361009",
    type:"管理员"
}, ];

class User extends React.Component{
    render(){
        return(
            <div>
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <Table style={{margin:20,marginTop:0}} columns={columns} dataSource={data}/>
            </div>
        );
    }
}
export default User;