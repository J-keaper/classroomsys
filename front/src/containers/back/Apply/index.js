import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Button, Col, Modal, Row, Table} from 'antd';

const columns = [{
    title: '教室',
    dataIndex:'classroom',
    key: 'classroom',
}, {
    title: '申请人',
    dataIndex:'applicant',
    key: 'applicant',
}, {
    title: '申请时间',
    dataIndex:'applyTime',
    key: 'applyTime',
}, {
    title: '状态',
    dataIndex:'status',
    key: 'status',
}, {
    title: '操作',
    key: 'operation',
    render:(text)=>(
        <span>
            <a href="#">详情</a>
        </span>
    )
}];

const data = [{
    key: '1',
    classroom: "#11210",
    status:"待审核",
    applicant: '1407084125',
    applyTime:"2017-08-20",
}, {
    key: '2',
    classroom: "#15412",
    status:"待审核",
    applicant: '1407084125',
    applyTime:"2017-08-20",
},{
    key: '3',
    classroom: "#11210",
    status:"待审核",
    applicant: '1407084125',
    applyTime:"2017-08-20",
}];

class Apply extends  React.Component{
    render(){
        return (
            <div>
                <Breadcrumb path={[{text:"教室申请",link:""}]}/>
                <Table style={{margin:20,marginTop:0}} columns={columns} dataSource={data}/>
                <Modal
                    visible={false}
                    title="详情"
                    footer={
                        <div>
                            <Button type="danger">拒绝</Button>
                            <Button type="primary">通过</Button>
                        </div>
                    }>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>申请人：</Col>
                        <Col span={20}>
                            {data[1].applicant}
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>申请教室：</Col>
                        <Col span={20}>
                            {data[1].classroom}
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>申请用途：</Col>
                        <Col span={20}>
                            社团活动
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>申请时间：</Col>
                        <Col span={20}>
                            {data[1].applyTime}
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>当前状态：</Col>
                        <Col span={20}>
                            {data[1].status}
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>审核人：</Col>
                        <Col span={20}>
                            admin1
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>审核时间：</Col>
                        <Col span={20}>
                            2017-08-20 12:12
                        </Col>
                    </Row>
                    <Row style={{margin:5}}>
                        <Col span={4} style={{textAlign:"right"}}>拒绝原因：</Col>
                        <Col span={20}>
                            时间冲突
                        </Col>
                    </Row>

                </Modal>

            </div>
        );
    }
}

export default Apply;


