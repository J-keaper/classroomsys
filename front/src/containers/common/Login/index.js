import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Col, Form, Icon, Input, message, Row, Spin} from 'antd';
import './index.less';
import API from "../../../api";
import config from '../../../conf/captcha';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            canSubmit: false,
            csessionid: "",
            sig: "",
            token: "",
            scene: config.scene,
            loading: false
        }
    }

    componentDidMount() {
        this.initValidation();
    }

    validateCallBack = (data) => {
        this.setState({canSubmit: true, csessionid: data.csessionid, sig: data.sig, token: data.token});
    };

    initValidation = () => {
        let NC_Opt = {
            renderTo: "#captcha",
            appkey: config.appkey,
            scene: this.state.scene,
            token: [config.appkey, (new Date()).getTime(), Math.random()].join(':'),
            customWidth: 300,
            callback: this.validateCallBack,
        };
        let nc = new noCaptcha(NC_Opt);

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
        params.append("csessionid", this.state.csessionid);
        params.append("sig", this.state.sig);
        params.append("token", this.state.token);
        params.append("scene", this.state.scene);
        params.append("a", values.account);
        params.append("p", values.password);

        this.setState({loading: true});
        let res = await API.login(params);
        this.setState({loading: false});
        if (res.code === 0) {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type.code <= 10) {
                this.props.history.push("/admin/");
            } else {
                this.props.history.push("/");
            }
        } else {
            message.error(res.data);
            this.initValidation(); //失败需要重新加载验证
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <Spin spinning={this.state.loading} tip={"登录中..."}>
                    <div className="login-form">
                        <div>
                            <img style={{height:50}} src="/logo_black.svg"/>
                        </div>
                        <Form  onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="用户名"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password"
                                           placeholder="密码"/>
                                )}
                            </FormItem>
                            <div id="captcha" className="nc-container"/>
                            <FormItem>
                                <Link style={{float: 'right'}} to={"/pass/forget"}>忘记密码</Link>
                                <Button type="primary" htmlType="submit"
                                        disabled={!this.state.canSubmit}
                                        className="login-form-button" style={{width: '100%'}}>
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Spin>
            </div>


        );
    }
}

export default withRouter(Form.create()(Login));