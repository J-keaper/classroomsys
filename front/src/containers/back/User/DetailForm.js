import React from 'react';
import {Form, Input} from "antd";


const formItemLayout = {
    labelCol:{
        span:4,
    },wrapperCol:{
        span:20
    }
};

class DetailForm extends React.Component{
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
                    label="姓名">
                    {getFieldDecorator('name', {
                        initialValue:user ? user.name : ""
                    })(
                        user ? <Input readOnly/> : <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="手机">
                    {getFieldDecorator('phone', {
                        rules:[{
                            pattern:"^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$",
                            message:"手机号码格式不符合要求！"
                        }],
                        initialValue:user ? user.phone : ""
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="邮箱">
                    {getFieldDecorator('email', {
                        rules:[{
                            pattern:"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
                            message:"邮箱格式不符合要求！"
                        }],
                        initialValue:user ? user.email : ""
                    })(
                        <Input />
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(DetailForm);