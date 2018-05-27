import React from 'react';
import {Row,Col} from 'antd';
import moment from "moment";

class DetailModal extends React.Component{

    render(){
        const {applyInfo} = this.props;
        return (
            <div>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>申请人：</Col>
                    <Col span={16}>
                        {applyInfo.applicant.account}
                    </Col>
                </Row>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>申请用途：</Col>
                    <Col span={16}>
                        {applyInfo.applyPurpose.desc + " --- " + applyInfo.applyReason}
                    </Col>
                </Row>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>申请时间：</Col>
                    <Col span={16}>
                        {moment(applyInfo.startTime).format("YYYY-MM-DD HH:mm") +
                    " 至 " + moment(applyInfo.endTime).format("YYYY-MM-DD HH:mm")}
                    </Col>
                </Row>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>申请教室容量：</Col>
                    <Col span={16}>
                        {applyInfo.capacity}
                    </Col>
                </Row>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>申请时间：</Col>
                    <Col span={16}>
                        {moment(applyInfo.createTime).format("YYYY-MM-DD HH:mm")}
                    </Col>
                </Row>
                <Row style={{margin:5}}>
                    <Col span={8} style={{textAlign:"right"}}>当前状态：</Col>
                    <Col span={16}>
                        {applyInfo.status.desc}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DetailModal;