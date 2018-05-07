import React from 'react';
import {Alert, Form, Input} from "antd";

const formItemLayout = {
    labelCol:{
        span:4,
    },wrapperCol:{
        span:20
    }
};

class DetailForm extends React.Component{

    validateConfirmPassword = (rule, value, callback) => {
        let form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        const { user } = this.props;
        return (
            <Form>
                {getFieldDecorator('id', {
                    initialValue:user ? user.id : ""
                })(
                    <Input type={"hidden"} />
                )}
                <Form.Item
                    {...formItemLayout}
                    label="账号">
                    {getFieldDecorator('account', {
                        initialValue:user ? user.account : ""
                    })(
                        user ? <Input readOnly/> : <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="新密码">
                    {getFieldDecorator('password', {
                        rules:[{
                            required:true,
                            min:8,
                            max:20,
                            pattern:"^[\\w]{8,20}$",
                            message:"密码长度在8~20之间，只能包含字母、数字和下划线"
                        },],
                        initialValue:user ? user.account : ""
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="确认密码">
                    {getFieldDecorator('confirmPassword',
                        {rules:[{
                            required:true,
                            validator:this.validateConfirmPassword
                        },],
                        initialValue:user ? user.account : ""
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <Alert message="默认重置密码为账户名" type="info" showIcon />
            </Form>
        );
    }
}

export default Form.create()(DetailForm);