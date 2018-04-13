import React from 'react';
import {connect} from 'react-redux';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Divider, Modal, Table, message} from 'antd';
import {getCommonType, getUserList} from "../../../redux/action";
import {bindActionCreators} from "redux";
import DetailForm from './DetailForm';
import ResetForm from './ResetForm';
import API from "../../../api";


class User extends React.Component{

    constructor(){
        super();
        this.columns = [{
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
            key: 'type',
            render:(text,record)=>(
                record.type.desc
            )
        }, {
            title: '操作',
            key: 'operation',
            render:(text,record)=>(
                <div>
                    <a onClick={() => this.handleEdit(record)}>详情</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleReset(record)}>重置密码</a>
                </div>
            )
        }];
        this.state={
            detailModalVisible:false,
            detailUser:{},
            resetModalVisible:false,
            resetUser:{},
        }
    }

    componentWillMount(){
        if(this.props.userType !== {}){
            this.props.getCommonType();
        }
        this.props.getUserList(1);
    }

    handleEdit = (user) => {
        this.setState({detailModalVisible:true, detailUser:user});
    };

    handleEditCancel = () => {
        this.setState({detailModalVisible:false});
    };

    handleEditOk = () => {
        let detailForm = this.detailForm.props.form;
        detailForm.validateFields((err,values) => {
            if(!err){
                console.log('Received values of form: ', values); //获取表单的值
                this.submitEdit(values);
            }
        });
    };

    submitEdit = async (user) => {
        let result = await API.updateUserInfo(user.account,user.phone,user.email);
        if(result.ret){
            message.success("更新成功！");
        }else{
            message.error(result.data);
        }
        this.setState({detailModalVisible:false});
        this.props.getUserList(1);
    };



    handleReset = (user) => {
        this.setState({resetModalVisible:true, resetUser:user});
    };

    handleResetCancel = () => {
        this.setState({resetModalVisible:false});
    };

    handleResetOk = () => {
        let resetForm = this.resetForm.props.form;
        resetForm.validateFields((err,values) => {
            if(!err){
                console.log('Received values of form: ', values); //获取表单的值
                this.submitReset(values);
            }
        });
    };

    submitReset = async (user) => {
        let result = await API.updateUserPassword(user.account,user.password);
        if(result.ret){
            message.success("更新成功！");
        }else{
            message.error(result.data);
        }
        this.setState({resetModalVisible:false});
    };


    render(){
        const {userList} = this.props;
        return(
            <div>
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <Table style={{margin:20,marginTop:0}}
                       columns={this.columns}
                       dataSource={userList}
                       rowKey="id"/>
                <Modal title="详情" okText="确定" cancelText="取消" destroyOnClose={true}
                       visible={this.state.detailModalVisible}
                       onCancel={this.handleEditCancel}
                       onOk={this.handleEditOk}
                >
                    <DetailForm wrappedComponentRef={(node) => this.detailForm = node} user={this.state.detailUser}/>
                </Modal>

                <Modal title="重置密码" okText="确定" cancelText="取消" destroyOnClose={true}
                       visible={this.state.resetModalVisible}
                       onCancel={this.handleResetCancel}
                       onOk={this.handleResetOk}
                >
                    <ResetForm wrappedComponentRef={(node) => this.resetForm = node} user={this.state.resetUser}/>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userList:state.user.userList,
    userType:state.common.userType ? state.common.userType : {}
});

const mapDispatchToProps = dispatch => ({
    getCommonType:bindActionCreators(getCommonType,dispatch),
    getUserList:bindActionCreators(getUserList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(User);