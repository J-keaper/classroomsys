import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Button, Input, message, Modal, Popover, Select, Table} from "antd";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import {getClassroomList, getCommonConstant} from "../../../redux/action";
import API from "../../../api";
import OpenForm from "./OpenForm";
import moment from "moment/moment";

const Option = Select.Option;


const formItemLayout = {
    labelCol: {
        span:8
    },
    wrapperCol: {
        span:16
    },
};

class Classroom extends React.Component{

    constructor(){
        super();
        this.columns=[{
            title:"校区",
            dataIndex:"campus",
            key:"campus"
        },{
            title:"教学楼",
            dataIndex:"building",
            key:"building"
        },{
            title:"教室",
            dataIndex:"number",
            key:"number"
        },{
            title:"容量",
            dataIndex:"seating",
            key:"seating"
        },{
            title:"状态",
            key:"status",
            render:(text,record) => (
                record.status.code === 4 && record.apply != null ?
                    <Popover content={<div>
                        活动详情：{record.apply.applyPurpose.desc + " - " + record.apply.applyReason}
                        <br/>
                        活动时间：{moment(record.apply.startTime).format("YYYY-MM-DD HH:mm") +
                    " 至 " + moment(record.apply.endTime).format("YYYY-MM-DD HH:mm")}
                    </div>}>
                        <a>{record.status.desc}</a>
                    </Popover>
                    : record.status.desc
            )
        }];

        this.defaultPageSize = 10;

        this.state = {
            pagination: {defaultPageSize:this.defaultPageSize},
            searchCampus:"",
            searchBuilding:"",
            searchStatus:-1,
            searchNumber:"",
            selectedRowKeys: [],
            openModalVisible:false
        }
    }

    componentDidMount = async() => {
        this.props.getCommonConstant();
        await this.getClassroomList(1);
    };

    getClassroomList = async (pageCount = 1,pageSize = this.defaultPageSize) => {
        await this.props.getClassroomList(this.state.searchCampus,this.state.searchBuilding,
            this.state.searchStatus,this.state.searchNumber, pageCount,pageSize);
        const pagination = { ...this.state.pagination };
        pagination.total = this.props.classroomCount;
        pagination.current = pageCount;
        this.setState({pagination});
    };

    handleSearchCampusChange = (v) => {
        this.setState({selectedRowKeys:[],searchCampus:v},this.handleSearch);
    };

    handleSearchBuildingChange = (v) => {
        this.setState({selectedRowKeys:[],searchBuilding:v},this.handleSearch);
    };

    handleSearchStatusChange = (v) => {
        this.setState({selectedRowKeys:[],searchStatus:v},this.handleSearch);
    };

    handleSearchNumberChange = (e) => {
        if(e.target.value !== this.state.searchNumber){
            this.setState({selectedRowKeys:[],searchNumber:e.target.value});
        }
    };

    handleSearch = async () => {
        await this.getClassroomList(1);
    };

    handleTableChange = async (pagination, filters, sorter) => {
        await this.getClassroomList(pagination.current);
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    handleOpen = () => {
        this.setState({openModalVisible:true});
    };

    handleOpenCancel = () => {
        this.setState({openModalVisible:false});
    };

    handleOpenOk = () => {
        let openForm = this.openForm.props.form;
        openForm.validateFields((err,values) => {
            if(!err){
                values.startTime = values.startTime.format("YYYY-MM-DD HH:mm");
                values.endTime = values.endTime.format("YYYY-MM-DD HH:mm");
                this.submitOpen(this.state.selectedRowKeys,values.startTime,values.endTime);
            }
        });
    };

    submitOpen = async (classroomList,startTime,endTime) => {
        let result = await API.addOpenSchedule(classroomList,startTime,endTime);
        if(result.ret){
            message.success("设置成功！");
            this.setState({openModalVisible:false,selectedRowKeys:[]});
        }else{
            message.error(result.data);
        }
    };

    render(){
        const {classroomStatus,classroomList,campusList,buildingList,loading} = this.props;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.status.code === 2, // Column configuration not to be checked
            }),
        };
        return(
            <div>
                <Breadcrumb path={[{text:"教室管理",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    校区：<Select style={{width:150,marginRight:50}} placeholder="选择校区"
                               optionFilterProp="children" defaultValue={""}
                               onChange={this.handleSearchCampusChange}>
                    <Option key={-1} value={""}>全部</Option>
                    {campusList &&
                    campusList.map((v,i)=>(
                        <Option key={i} value={v}>{v}</Option>
                    ))
                    }
                </Select>

                    教学楼：<Select showSearch style={{width:150,marginRight:50}} placeholder="选择教学楼"
                                    optionFilterProp="children" defaultValue={""}
                                    onChange={this.handleSearchBuildingChange}>
                    <Option key={-1} value={""}>全部</Option>
                    {buildingList &&
                    buildingList.map((v,i)=>(
                        <Option key={i} value={v}>{v}</Option>
                    ))
                    }
                </Select>

                    状态：<Select style={{width:150,marginRight:50}} placeholder="选择状态"
                               optionFilterProp="children" defaultValue={-1}
                               onChange={this.handleSearchStatusChange}>
                    <Option key={-1} value={-1}>全部</Option>
                    {classroomStatus &&
                    Object.values(classroomStatus).map((v,i)=>(
                        <Option key={i} value={v.code}>{v.desc}</Option>
                    ))
                    }
                </Select>

                <Input style={{width:200}} placeholder="教室号"
                   onChange={this.handleSearchNumberChange}
                   onBlur={this.handleSearch} />
                </div>
                <Table style={{margin:20,marginTop:0,marginBottom:0}} columns={this.columns} rowKey={"number"}
                       rowSelection = {rowSelection}
                       dataSource={classroomList !== undefined ? classroomList : []}
                       pagination={this.state.pagination}
                       loading={!!loading}
                       onChange={this.handleTableChange}/>
                <Button style={{marginLeft:20}} disabled={this.state.selectedRowKeys.length === 0}
                        type={"primary"}
                        onClick={this.handleOpen}>
                    开放自习
                </Button>

                <Modal title="选择开放时间段" okText={"确认开放"} cancelText="取消" destroyOnClose={true}
                       visible={this.state.openModalVisible}
                       onCancel={this.handleOpenCancel}
                       onOk={this.handleOpenOk}
                >
                    <OpenForm wrappedComponentRef={(node) => this.openForm = node}/>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    classroomCount:state.classroom.classroomCount,
    classroomList:state.classroom.classroomList,
    classroomStatus:state.common.classroomStatus,
    campusList:state.common.campusList,
    buildingList:state.common.buildingList,
    loading:state.common.fetching
});

const mapDispatchToProps = dispatch => ({
    getCommonConstant:bindActionCreators(getCommonConstant,dispatch),
    getClassroomList:bindActionCreators(getClassroomList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Classroom);