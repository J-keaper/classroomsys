import React from 'react';
import {withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import './index.less';
import '../../../exart/nc';
import API from "../../../api";

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            canSubmit:false,
            csessionid:"",
            sig:"",
            token:"",
            scene:"nc_login",
        }
    }

    componentDidMount(){
        this.initValidation();
    }

    validateCallBack = (data) => {
        this.setState({canSubmit:true,csessionid:data.csessionid, sig:data.sig, token:data.token});
    };

    initValidation = () => {
        let NC_Opt = {
            renderTo: "#captcha",
            appkey: "FFFF0N00000000005B69",
            scene: this.state.scene,
            token: ["FFFF0N00000000005B69", (new Date()).getTime(), Math.random()].join(':'),
            customWidth: 240,
            callback: this.validateCallBack,
        };
        let nc = new noCaptcha(NC_Opt)

        nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.submit(values);
            }
        });
    };

    submit = async (values) => {
        let params = new URLSearchParams();
        params.append("csessionid",this.state.csessionid);
        params.append("sig",this.state.sig);
        params.append("token",this.state.token);
        params.append("scene",this.state.scene);
        params.append("a",values.account);
        params.append("p",values.password);

        let res = await API.login(params);
        console.log(res);
        if(res.code === 0){
            if(res.data.type.code <= 10){
                this.props.history.push("/");
            }else{
                this.props.history.push("/admin/");
            }

        }else{
            message.error(res.data);
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <Form style={{maxWidth: '300px'}} onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <div id="captcha" className="nc-container"/>
                        <FormItem>
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" disabled={!this.state.canSubmit}
                                    className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

export default withRouter(Form.create()(Login));