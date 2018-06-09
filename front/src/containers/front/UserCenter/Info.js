import React from 'react';
import {Button, Card, Col, Form, Input, Row,message} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCommonConstant, getUserInfo} from "../../../redux/action";
import API from "../../../api";

const formItemLayout = {
    labelCol:{
        span:4,
    },wrapperCol:{
        span:12
    }
};

const FormItem = Form.Item;

class UserInfo extends React.Component{
    constructor(){
        super();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.submitModifyInfo(values.phone,values.email);
            }
        });
    };

    submitModifyInfo = async (phone,email) => {
        let result = await API.updateUserInfo(phone,email);
        if(result.ret){
            message.success("修改成功！");
        }else{
            message.error(result.data);
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {user} = this.props;
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
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
const mapStateToProps = state => ({
    user:state.user.loginedUser
});


const mapDispatchToProps = dispatch => ({
    getUserInfo:bindActionCreators(getUserInfo,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(UserInfo));