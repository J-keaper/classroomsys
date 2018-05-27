import React from 'react';
import {DatePicker, Form} from "antd";

const formItemLayout = {
    labelCol:{
        span:4,
    },wrapperCol:{
        span:20
    }
};




class OpenForm extends React.Component{


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
        return (
            <Form>
                <Form.Item
                    {...formItemLayout}
                    label="开始时间">
                    {getFieldDecorator('startTime', {
                        rules: [{
                            required: true, message: '请选择开始时间！',
                        }],
                    })(
                        <DatePicker showTime={{minuteStep:5,format:"HH:mm"}} format="YYYY-MM-DD HH:mm"
                                    placeholder="请选择开始时间"/>
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="结束时间">
                    {getFieldDecorator('endTime', {
                        rules: [{
                            required: true,
                            validator:this.validateEndTime

                        }],
                    })(
                        <DatePicker showTime={{minuteStep:5,format:"HH:mm"}} format="YYYY-MM-DD HH:mm"
                                    placeholder="请选择结束时间"/>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(OpenForm);