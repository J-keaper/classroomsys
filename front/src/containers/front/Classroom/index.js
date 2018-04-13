import React from 'react';
import {Card, Table} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
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
        }];
    }

    render(){
        const {classroomList} = this.props;
        return (
            <Card style={{margin:20,background:"#f0f2f5"}} bordered={false}>
                <Table style={{margin:20,marginTop:0}} columns={this.columns}
                       dataSource={classroomList} rowKey={"id"}/>
            </Card>
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