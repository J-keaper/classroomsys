import React from 'react';
import {Button, Form, Input, Radio, message, Modal, List, Card, Icon, Spin} from "antd";
import moment from "moment/moment";
import {withRouter} from "react-router-dom";
import API from "../../../api";

const formItemLayout = {
    labelCol: {
        span: 4,
    }, wrapperCol: {
        span: 12
    }
};

const tailfFormItemLayout = {
    wrapperCol: {
        offset: 4
    }
};
const {TextArea} = Input;

class AuditForm extends React.Component {
    constructor() {
        super();
        this.state = {
            auditResult: "pass",
            selectClassroomModalVisible: false,
            auditClassroom: "",
            searchClassroom: "",
            classroomList: [],
            loading:false
        }
    }

    componentDidMount = async () => {
        const applyId = this.props.match.params.id;
        let result = await API.getCanApplyClassroom(applyId);
        if (result.ret) {
            this.setState({classroomList: result.data});
        } else {
            this.setState({classroomList: []});
        }
    };

    handleAuditResult = (e) => {
        this.setState({auditResult: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.submitAudit(values);
            }
        });
    };

    submitAudit = async (values) => {
        this.setState({loading:true});
        let result = await API.submitAudit(values.id, values.auditResult, values.auditOpinion, values.auditClassroom);
        this.setState({loading:false});
        if (result.ret) {
            this.props.history.push("/admin/apply");
        } else {
            message.error(result.data);
        }
    };

    handleSelectClassroom = () => {
        this.setState({selectClassroomModalVisible: true});
    };

    handleSelectClassroomCancel = () => {
        this.setState({selectClassroomModalVisible: false, searchClassroom: ""});
    };

    handleClassroomSelect = (number) => {
        this.setState({
            selectClassroomModalVisible: false,
            searchClassroom: "", auditClassroom: number
        });
    };

    handleSearchClassroomChange = (e) => {
        let value = e.target.value;
        this.setState({searchClassroom: value});
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {auditApply} = this.props;
        const isPending = auditApply && auditApply.status.code === 1;
        const {classroomList} = this.state;
        return (
            <div>
                <Spin spinning={this.state.loading} tip={"提交中..."}>
                    <Form onSubmit={this.handleSubmit}>
                        {getFieldDecorator('id', {
                            initialValue: auditApply ? auditApply.id : ""
                        })(
                            <Input type={"hidden"}/>
                        )}
                        <Form.Item
                            {...formItemLayout}
                            label="申请人">
                            <span>{auditApply && auditApply !== {} ? auditApply.applicant.account : ""}</span>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="申请用途">
                        <span>{auditApply && auditApply !== {} ?
                            auditApply.applyPurpose.desc + " --- " + auditApply.applyReason : ""}</span>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="申请时间">
                        <span>{auditApply && auditApply !== {} ?
                            moment(auditApply.startTime).format("YYYY-MM-DD HH:mm") +
                            " 至 " + moment(auditApply.endTime).format("YYYY-MM-DD HH:mm") : ""}</span>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="申请教室容量">
                            <span>{auditApply && auditApply !== {} ? auditApply.capacity : ""}</span>
                        </Form.Item>
                        {isPending ?
                            <div>
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核结果">
                                    {getFieldDecorator('auditResult', {
                                        rules: [{
                                            required: true,
                                            message: "请选择审核结果！"
                                        }],
                                        initialValue: this.state.auditResult ? this.state.auditResult : "pass"
                                    })(
                                        <Radio.Group onChange={this.handleAuditResult}>
                                            <Radio.Button value="pass">通过</Radio.Button>
                                            <Radio.Button value="deny">拒绝</Radio.Button>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                {this.state.auditResult === "pass" &&
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核教室">
                                    {getFieldDecorator('auditClassroom', {
                                        rules: [{
                                            required: true,
                                            message: "请输入审核教室！"
                                        }],
                                        initialValue: this.state.auditClassroom
                                    })(
                                        <Input readOnly={true} onClick={this.handleSelectClassroom}/>
                                    )}
                                </Form.Item>
                                }
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核意见">
                                    {getFieldDecorator('auditOpinion', {
                                        rules: [{
                                            required: true,
                                            message: "请输入审核意见！"
                                        }]
                                    })(
                                        <TextArea rows={4}/>
                                    )}
                                </Form.Item>
                            </div> :
                            <div>
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核结果">
                                    <span>{auditApply && auditApply !== {} ? auditApply.status.desc : ""}</span>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核人">
                            <span>{auditApply && auditApply !== {} ?
                                auditApply.auditor.account + " - " + auditApply.auditor.name : ""}</span>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核教室">
                                    <span>{auditApply && auditApply !== {} ? auditApply.classroom : ""}</span>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="审核意见">
                                    <span>{auditApply && auditApply !== {} ? auditApply.auditResult : ""}</span>
                                </Form.Item>
                            </div>
                        }
                        <Form.Item {...tailfFormItemLayout}>
                            {isPending && <Button type="primary" htmlType="submit">提交审核</Button>}
                            <Button type="primary" htmlType="button" style={{marginLeft: 10}}
                                    onClick={() => {
                                        this.props.history.goBack()
                                    }}>返回</Button>
                        </Form.Item>
                    </Form>
                </Spin>
                <Modal width={700} title="选择教室" footer={null} destroyOnClose={true}
                       visible={this.state.selectClassroomModalVisible}
                       onCancel={this.handleSelectClassroomCancel}
                >
                    <Input style={{marginBottom: 10}}
                           suffix={<Icon type="close"
                                         onClick={() => this.setState({searchClassroom: ""})}/>}
                           value={this.state.searchClassroom}
                           onChange={this.handleSearchClassroomChange}/>
                    <div style={{maxHeight: 350, overflow: "auto", overflowX: "hidden"}}>
                        <List grid={{gutter: 4, column: 6}}
                              dataSource={classroomList.filter((v) => v.includes(this.state.searchClassroom))}
                              renderItem={item => (
                                  <List.Item>
                                      <Card bodyStyle={{padding: 0, textAlign: "center"}} bordered={false}>
                                          <Button onClick={() => this.handleClassroomSelect(item)}>{item}</Button>
                                      </Card>
                                  </List.Item>
                              )
                              }
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Form.create()(AuditForm));