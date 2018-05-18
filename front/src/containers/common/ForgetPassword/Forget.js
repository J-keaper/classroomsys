import React from 'react';
import {Button, Card, Col, Form, Icon, Input, Spin} from "antd";
import Row from "antd/es/grid/row";
import API from "../../../api";
import {message} from "antd";


class Forget extends React.Component{
    constructor(){
        super();
        this.state = {
            sentEmail:false,
            toEmail:"",
            loading:false
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.submitReset(values.email);
            }
        });
    };
    submitReset = async (email) => {
        this.setState({loading:true});
        let result = await API.forgetPassword(email);
        this.setState({loading:false});
        if(result.ret){
            this.setState({sentEmail:true,toEmail:email});
        }else{
            message.error(result.data);
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {sentEmail,toEmail,} = this.state;
        return (
            <div>
                {!sentEmail ?
                    <Spin spinning={this.state.loading} tip={"发送邮件中..."}>
                        <Card style={{height: "100%"}}>
                            <Row>
                                <Col offset={9} span={6}>
                                    <h2>忘记密码</h2>
                                    <h4>通过绑定邮箱重设密码</h4>
                                </Col>
                            </Row>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col offset={9} span={6}>
                                            <Form.Item>
                                                {getFieldDecorator('email', {
                                                    rules: [{
                                                        required: true,
                                                        message: "请输入邮箱"
                                                    }]
                                                })(
                                                    <Input style={{width: "100%"}} size={"large"} placeholder={"请输入邮箱"}/>
                                                )}
                                            </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={9} span={6}>
                                        <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>重置密码</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Spin>:
                    <Card>
                        <Row >
                            <Col offset={9} span={6} style={{textAlign:"center"}}>
                                <Icon style={{fontSize:50}} type="ellipsis" />
                                <Icon style={{fontSize:50}} type="mail" />
                                <p style={{fontSize:18}}>密码重设链接邮件发送成功！</p>
                                <p>已发送至{toEmail}</p>
                            </Col>
                        </Row>
                    </Card>
                }
            </div>
        );
    }
}



export default Form.create()(Forget);