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
                    label="手机">
                    {getFieldDecorator('phone', {
                        initialValue:user ? user.phone : ""
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="邮箱">
                    {getFieldDecorator('email', {
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