import React from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCommonConstant, getUserInfo} from "../../../redux/action";
import API from "../../../api";
import {message} from "antd/lib/index";

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