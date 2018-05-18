import React from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {message} from "antd/lib/index";
import API from "../../../api";
import {withRouter} from "react-router-dom";

const formItemLayout = {
    labelCol:{
        span:4,
    },wrapperCol:{
        span:12
    }
};

class UserPassword extends React.Component{
    constructor(){
        super();
    }

    validateConfirmPassword = (rule, value, callback) => {
        let form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.submitModifyPassword(values.oldPassword,values.newPassword);
            }
        });
    };

    submitModifyPassword = async (oldPassword,newPassword) => {
        console.log(oldPassword,newPassword);
        let result = await API.updatePasswordByOld(oldPassword,newPassword);
        if(result.ret){
            localStorage.removeItem("token");
            this.props.history.push("/login");
            message.success("修改成功，请重新登录！");
        }else{
            message.error(result.data);
        }
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        const { user } = this.props;
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="旧密码">
                        {getFieldDecorator('oldPassword', {
                            rules:[{
                                required:true,
                                message:"请输入旧密码"
                            }]
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="新密码">
                        {getFieldDecorator('newPassword', {
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
                        {getFieldDecorator('confirmNewPassword',
                            {rules:[{
                                    required:true,
                                    validator:this.validateConfirmPassword
                                },],
                                initialValue:user ? user.account : ""
                            })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Row>
                        <Col offset={4}>
                            <Button  type={"primary"} htmlType={"submit"}>确认修改</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}
export default withRouter(Form.create()(UserPassword));