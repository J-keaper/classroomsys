import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Table} from "antd";


const columns=[{
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
},];

const data=[{
    key:"1",
    campus:"主校区",
    building:"逸夫楼",
    classroom:"#12301"
},{
    key:"2",
    campus:"主校区",
    building:"主楼",
    classroom:"#11301"
},{
    key:"3",
    campus:"朔州校区",
    building:"逸夫楼",
    classroom:"#12301"
},
];


class Classroom extends React.Component{

    render(){
        return(
            <div>
                <Breadcrumb path={[{text:"教室管理",link:""}]}/>
                <Table style={{margin:20,marginTop:0}} columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default Classroom;