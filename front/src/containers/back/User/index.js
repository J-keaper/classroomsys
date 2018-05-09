import React from 'react';
import {connect} from 'react-redux';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Divider, Modal, Table, message, Input, Select} from 'antd';
import {getCommonConstant, getUserList} from "../../../redux/action";
import {bindActionCreators} from "redux";
import DetailForm from './DetailForm';
import ResetForm from './ResetForm';
import API from "../../../api";

const Option = Select.Option;
class User extends React.Component{

    constructor(){
        super();
        this.columns = [{
            title: '账号',
            dataIndex:'account',
            key: 'account',
        },{
            title: '姓名',
            dataIndex:'name',
            key: 'name',
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
        this.defaultPageSize = 10;

        this.state={
            pagination: {defaultPageSize:this.defaultPageSize},
            detailModalVisible:false,
            detailUser:{},
            resetModalVisible:false,
            resetUser:{},
            searchKey:"",
            searchType:-1,
        }
    }

    componentDidMount = async() => {
        if(this.props.userType !== {}){
            this.props.getCommonConstant();
        }
        await this.getUserList(1);
    };

    getUserList = async(pageCount = 1,pageSize = this.defaultPageSize) => {
        await this.props.getUserList(this.state.searchKey,this.state.searchType,pageCount,pageSize);
        const pagination = { ...this.state.pagination };
        pagination.total = this.props.userCount;
        pagination.current = pageCount;
        this.setState({pagination});
    };


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

    handleSearch = async() => {
        await this.getUserList(1);
    };

    handleSearchKeyChange = (e) => {
        this.setState({searchKey:e.target.value});
    };

    handleSearchTypeChange = (v) => {
        this.setState({searchType:v},this.handleSearch);
    };

    handleTableChange = async (pagination, filters, sorter) => {
        await this.getUserList(pagination.current);
    };

    render(){
        const {userType,userList,loading} = this.props;
        return(
            <div>
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Input style={{width:200,marginRight:50}} placeholder="账户名/姓名/邮箱/手机号"
                           onChange={this.handleSearchKeyChange}
                           onBlur={this.handleSearch} />
                    类型：<Select style={{width:200}} placeholder="选择类型"
                               optionFilterProp="children" defaultValue={-1}
                               onChange={this.handleSearchTypeChange}
                >
                    <Option key={-1} value={-1}>全部</Option>
                    {userType &&
                    Object.values(userType).map((v,i)=>(
                        <Option key={i} value={v.code}>{v.desc}</Option>
                    ))
                    }
                    </Select>
                </div>
                <Table style={{margin:20,marginTop:0}}
                       columns={this.columns} rowKey="id"
                       dataSource={userList !== undefined ? userList : []}
                       pagination={this.state.pagination}
                       loading={!!loading}
                       onChange={this.handleTableChange}
                />

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
    userCount:state.user.userCount,
    userList:state.user.userList,
    userType:state.common.userType,
    loading:state.common.fetching
});

const mapDispatchToProps = dispatch => ({
    getCommonConstant:bindActionCreators(getCommonConstant,dispatch),
    getUserList:bindActionCreators(getUserList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(User);