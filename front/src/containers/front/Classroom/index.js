import React from 'react';
import {Card, Input, Select, Table} from "antd";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import {getClassroomList, getCommonConstant} from "../../../redux/action";

const Option = Select.Option;


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
                record.status.desc
            )
        }];

        this.defaultPageSize = 10;

        this.state = {
            pagination: {defaultPageSize:this.defaultPageSize},
            searchCampus:"",
            searchBuilding:"",
            searchStatus:-1,
            searchNumber:""
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
        this.setState({searchCampus:v},this.handleSearch);
    };

    handleSearchBuildingChange = (v) => {
        this.setState({searchBuilding:v},this.handleSearch);
    };

    handleSearchStatusChange = (v) => {
        this.setState({searchStatus:v},this.handleSearch);
    };

    handleSearchNumberChange = (e) => {
        this.setState({searchNumber:e.target.value});
    };

    handleSearch = async () => {
        console.log(this.state);
        await this.getClassroomList(1);
    };

    handleTableChange = async (pagination, filters, sorter) => {
        await this.getClassroomList(pagination.current);
    };

    render(){
        const {classroomStatus,classroomList,campusList,buildingList,loading} = this.props;
        return(
            <Card style={{background:"#f0f2f5"}} bordered={false}>
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

                    教学楼：<Select style={{width:150,marginRight:50}} placeholder="选择教学楼"
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
                <Table style={{margin:20,marginTop:0}} columns={this.columns} rowKey={"id"}
                       dataSource={classroomList !== undefined ? classroomList : []}
                       pagination={this.state.pagination}
                       loading={!!loading}
                       onChange={this.handleTableChange}/>
            </Card>
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