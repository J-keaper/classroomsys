import React from 'react';
import {Card, Col, Modal, Row, Table} from "antd";
import {bindActionCreators} from "redux";
import {getCommonConstant, getUserApply} from "../../../redux/action";
import {connect} from "react-redux";
import moment from "moment/moment";

class UserApply extends React.Component{
    constructor(){
        super();
        this.columns = [{
            title: '申请时间',
            key: 'applyTime',
            render:(text,record)=>{
                return (moment(record.createTime).format("YYYY-MM-DD HH:mm"));
            }
        },{
            title: '申请用途',
            key: 'applyPurpose',
            render:(text,record)=>(
                record.applyPurpose.desc
            )
        }, {
            title: '状态',
            key: 'status',
            filters:[],
            onFilter:(value, record) => record.status.code === parseInt(value),
            render:(text,record)=>(
                record.status.desc
            )
        }, {
            title: '操作',
            key: 'operation',
            render:(text,record)=>(
                <span>
                    <a onClick={() => this.handleDetail(record)}>详情</a>
                </span>
            )
        }];

        this.state={
            detailModalVisible:false,
            detailApply:{},
        }
    }

    componentWillMount = async () => {
        await this.props.getCommonConstant();
        let applyStatus = this.props.applyStatus;
        let filters = [];
        Object.values(applyStatus).map((v,i)=>{
           filters.push({text:v.desc,value:v.code});
        });
        this.columns[2].filters=filters;
        await this.props.getUserApply();
    };

    handleDetail = (apply) => {
        this.setState({detailModalVisible:true,detailApply:apply})
    };

    handleDetailCancel  = () => {
        this.setState({detailModalVisible:false})
    };

    render(){
        const {applyList,loading} = this.props;
        const {detailApply} = this.state;
        return (
            <Card>
                <Table style={{margin:10}} columns={this.columns} rowKey={"id"}
                       dataSource={applyList !== undefined ? applyList : []}
                       loading={!!loading}
                       pagination={false}
                />
                <Modal title="详情" footer={null}
                       visible={this.state.detailModalVisible}
                       onCancel={this.handleDetailCancel}>
                    {Object.keys(detailApply).length !== 0 &&
                    <div>
                        <Row style={{margin: 5}}>
                            <Col span={8} style={{textAlign: "right"}}>申请用途：</Col>
                            <Col span={16}>
                                {detailApply.applyPurpose.desc + " --- " + detailApply.applyReason}
                            </Col>
                        </Row>
                        <Row style={{margin: 5}}>
                            <Col span={8} style={{textAlign: "right"}}>申请时间：</Col>
                            <Col span={16}>
                                {moment(detailApply.startTime).format("YYYY-MM-DD HH:mm") +
                                " 至 " + moment(detailApply.endTime).format("YYYY-MM-DD HH:mm")}
                            </Col>
                        </Row>
                        <Row style={{margin: 5}}>
                            <Col span={8} style={{textAlign: "right"}}>申请教室容量：</Col>
                            <Col span={16}>
                                {detailApply.capacity}
                            </Col>
                        </Row>
                        {!(detailApply && detailApply.status.code === 1) &&
                        <div>
                            <Row style={{margin: 5}}>
                                <Col span={8} style={{textAlign: "right"}}>审核结果：</Col>
                                <Col span={16}>
                                    {detailApply && detailApply !== {} ? detailApply.status.desc : ""}
                                </Col>
                            </Row>
                            {detailApply.status.code === 2 &&
                                <Row style={{margin: 5}}>
                                    <Col span={8} style={{textAlign: "right"}}>审核教室：</Col>
                                    <Col span={16}>
                                        {detailApply && detailApply !== {} ? detailApply.classroom : ""}
                                    </Col>
                                </Row>
                            }
                            <Row style={{margin: 5}}>
                                <Col span={8} style={{textAlign: "right"}}>审核意见：</Col>
                                <Col span={16}>
                                    {detailApply && detailApply !== {} ? detailApply.auditResult : ""}
                                </Col>
                            </Row>
                        </div>
                        }
                    </div>
                    }
                </Modal>

            </Card>
        );
    }
}

const mapStateToProps = state => ({
    applyList:state.user.apply,
    applyStatus:state.common.applyStatus,
    loading:state.common.fetching
});

const mapDispatchToProps = dispatch => ({
    getCommonConstant:bindActionCreators(getCommonConstant,dispatch),
    getUserApply:bindActionCreators(getUserApply,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(UserApply);