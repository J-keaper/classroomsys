import React from 'react';
import {Button, Form, Input, Radio, message} from "antd";
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
const { TextArea } = Input;

class AuditForm extends React.Component {
    constructor(){
        super();
        this.state={
            auditResult:"pass"
        }
    }
    handleAuditResult = (e) => {
        this.setState({ auditResult: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.submitAudit(values);
            }
        });
    };

    submitAudit = async(values) => {
        let result = await API.submitAudit(values.id,values.auditResult,values.auditOpinion,values.auditClassroom);
        if(result.ret){
            this.props.history.push("/admin/apply");
        }else{
            message.error(result.data);
        }
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {auditApply} = this.props;
        const isPending = auditApply && auditApply.status.code === 1;
        return (
            <div>
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
                                rules:[{
                                    required:true,
                                    message:"请选择审核结果！"
                                }],
                                initialValue: this.state.auditResult ? this.state.auditResult : "pass"
                            })(
                                <Radio.Group onChange={this.handleAuditResult}>
                                    <Radio.Button value="pass" >通过</Radio.Button>
                                    <Radio.Button value="deny" >拒绝</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        {this.state.auditResult === "pass" &&
                        <Form.Item
                            {...formItemLayout}
                            label="审核教室">
                            {getFieldDecorator('auditClassroom', {
                                rules:[{
                                    required:true,
                                    message:"请输入审核教室！"
                                }]
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        }
                        <Form.Item
                            {...formItemLayout}
                            label="审核意见">
                            {getFieldDecorator('auditOpinion', {
                                rules:[{
                                    required:true,
                                    message:"请输入审核意见！"
                                }]
                            })(
                                <TextArea rows={4} />
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
                        <Button type="primary" htmlType="button" style={{marginLeft:10}}
                                onClick={()=>{this.props.history.goBack()}}>返回</Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

export default withRouter(Form.create()(AuditForm));