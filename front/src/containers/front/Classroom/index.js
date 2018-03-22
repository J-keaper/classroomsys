import React from 'react';
import {Card, Table} from "antd";


const data = [{
    key:1,
    campus:"主校区",
    building:"主楼",
    classroom:"11506",
    status:"上课中"
},{
    key:2,
    campus:"主校区",
    building:"主楼",
    classroom:"11201",
    status:"社团活动"
},{
    key:3,
    campus:"主校区",
    building:"主楼",
    classroom:"11218",
    status:"空闲（开）"
},{
    key:4,
    campus:"主校区",
    building:"主楼",
    classroom:"11218",
    status:"空闲（关）"
},];

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
            dataIndex:"classroom",
            key:"classroom"
        },{
            title:"教室状态",
            dataIndex:"status",
            key:"status"
        },];
    }

    render(){
        return (
            <Card>
                <Table style={{margin:20,marginTop:0}} columns={this.columns} dataSource={data}/>
            </Card>
        );
    }
}


export default Classroom;