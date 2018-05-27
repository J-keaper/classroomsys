import React from 'react';
import {Button, Card, Form, Input, Radio, InputNumber, DatePicker, message, Spin, Icon, Tooltip} from "antd";
import API from "../../../api";
import {bindActionCreators} from "redux";
import {getCommonConstant} from "../../../redux/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const { TextArea } = Input;

class Apply extends React.Component{
    constructor(){
        super();
        this.state={
            loading:false
        }
    }

    componentWillMount = () => {
        this.props.getCommonConstant();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                values.startTime = values.startTime.format("YYYY-MM-DD HH:mm");
                values.endTime = values.endTime.format("YYYY-MM-DD HH:mm");
                this.submitApply(values);
            }
        });
    };

    submitApply = async(values) => {
        console.log(values);
        this.setState({loading:true});
        let result = await API.submitApply(values.applyPurpose,values.applyReason,
            values.applyCapacity,values.startTime,values.endTime);
        this.setState({loading:false});
        if(result.ret){
            message.success("提交成功！");
            this.props.history.push("/user/apply");
        }else {
            message.error(result.data);
        }
    };

    validateEndTime = (rule, value, callback) => {
        let form = this.props.form;
        if(!value){
            callback("请选择结束时间！");
        } else if (!value.isAfter(form.getFieldValue("startTime"))) {
            callback('结束时间必须大于开始时间！');
        } else {
            callback();
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {applyPurpose} = this.props;
        return (
            <Spin spinning={this.state.loading} tip={"提交中..."}>
                <Card style={{background:"#f0f2f5"}} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="申请用途"
                        >
                            {getFieldDecorator('applyPurpose', {
                                rules: [{
                                    required: true, message: '请选择申请用途！',
                                }],
                            })(
                                <Radio.Group >
                                    {applyPurpose &&
                                    Object.values(applyPurpose).sort((a,b)=>b.code-a.code).map((v,i)=>(
                                        <Radio.Button key={i} value={v.code} >{v.desc}</Radio.Button>
                                    ))
                                    }
                                </Radio.Group>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="申请原因"
                        >
                            {getFieldDecorator('applyReason', {
                                rules: [{
                                    required: true, message: '请输入申请原因！',
                                }],
                            })(
                                <TextArea placeholder="请输入申请原因" rows={4} />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="申请教室容量"
                        >
                            {getFieldDecorator('applyCapacity', {
                                rules: [{
                                    required: true, message: '请选择申请教室容量！',
                                }],
                            })(
                                <InputNumber style={{width:150}} step={10} min={0}
                                             placeholder="请选择申请教室容量" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="开始时间"
                        >
                            {getFieldDecorator('startTime', {
                                rules: [{
                                    required: true, message: '请选择开始时间！',
                                }],
                            })(
                                <DatePicker showTime={{minuteStep:5,format:"HH:mm"}} format="YYYY-MM-DD HH:mm"
                                            placeholder="请选择开始时间"/>
                            )}
                            <Tooltip title="申请时间段必须在同一天，并且不能早于24小时之后，不能晚于7*24小时之后">
                                <Icon style={{marginLeft:10}} type="question-circle-o" />
                            </Tooltip>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="结束时间"
                        >
                            {getFieldDecorator('endTime', {
                                rules: [{
                                    required: true,
                                    validator:this.validateEndTime
                                }],
                            })(
                                <DatePicker showTime={{minuteStep:5,format:"HH:mm"}} format="YYYY-MM-DD HH:mm"
                                                placeholder="请选择结束时间"/>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>

                    </Form>
                </Card>
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    applyPurpose:state.common.applyPurpose,
});

const mapDispatchToProps = dispatch => ({
    getCommonConstant:bindActionCreators(getCommonConstant,dispatch),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form.create()(Apply)));