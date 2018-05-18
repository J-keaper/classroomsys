import React from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import API from "../../../api";
import {message} from "antd";
import {withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken';


class Reset extends React.Component {
    constructor() {
        super();
        this.state = {
            account: ""
        }

    };

    componentWillMount() {
        let token = location.search && location.search.substr(3);
        if (!token) {
            message.error("链接无效！");
            return;
        }
        let claims = jwt.decode(token);
        this.setState({account: claims.account})
    }


    validateConfirmPassword = (rule, value, callback) => {
        let form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.submitReset(values.password);
            }
        });
    };

    submitReset = async (password) => {
        let token = location.search && location.search.substr(3);
        let result = await API.resetPassword(token, password);
        if (result.ret) {
            message.success("重置成功，请使用新密码登录！");
            this.props.history.push("/login");
        } else {
            message.error(result.data);
        }
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Card>
                <Row>
                    <Col offset={9} span={6}>
                        <h2>重置密码</h2>
                        {this.state.account !== "" &&
                        <h4>账户：{this.state.account}</h4>
                        }
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col offset={9} span={6}>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        min: 8,
                                        max: 20,
                                        pattern: "^[\\w]{8,20}$",
                                        message: "密码长度在8~20之间，只能包含字母、数字和下划线"
                                    },],
                                })(
                                    <Input style={{width: "100%"}} type={"password"}
                                           placeholder={"请输入新密码"}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('confirmPassword',
                                    {
                                        rules: [{
                                            required: true,
                                            validator: this.validateConfirmPassword
                                        },],
                                    })(
                                    <Input style={{width: "100%"}} type="password"
                                           placeholder={"请再次输入新密码"}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={9} span={6}>
                            <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>确认</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );

    }

}

export default withRouter(Form.create()(Reset));