import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Table} from "antd";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import {getClassroomList} from "../../../redux/action";



class Classroom extends React.Component{

    componentWillMount(){
        this.props.getClassroomList(1);
    }

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
        },{
            title: '操作',
            key: 'operation',
            render:(text,record)=>(
                <div>

                </div>
            )
        }];
    }

    render(){
        const {classroomList} = this.props;
        return(
            <div>
                <Breadcrumb path={[{text:"教室管理",link:""}]}/>
                <Table style={{margin:20,marginTop:0}} columns={this.columns}
                       dataSource={classroomList} rowKey={"id"}/>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    classroomList:state.classroom.classroomList,
});

const mapDispatchToProps = dispatch => ({
    getClassroomList:bindActionCreators(getClassroomList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Classroom);