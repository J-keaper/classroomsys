import React from 'react';
import {Button, Card, Form, Input} from "antd";

const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
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

class Apply extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <Card>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="申请单位"
                    >
                        {getFieldDecorator('apply', {
                            rules: [{
                                required: true, message: '请输入申请单位！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="申请用途"
                    >
                        {getFieldDecorator('apply', {
                            rules: [{
                                required: true, message: '请选择申请用途！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="申请原因"
                    >
                        {getFieldDecorator('apply', {
                            rules: [{
                                required: true, message: '请输入申请原因！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="申请教室要求"
                    >
                        {getFieldDecorator('apply', {
                            rules: [{
                                required: true, message: '请选择申请教室要求！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="申请时间"
                    >
                        {getFieldDecorator('apply', {
                            rules: [{
                                required: true, message: '请选择申请时间！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>

                </Form>
            </Card>
        );
    }
}
export default Form.create()(Apply);