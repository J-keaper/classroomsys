import React from 'react';
import {Upload, Icon, Table, Button, message, Row, Col, Spin} from "antd";
import Breadcrumb from "../../../components/Breadcrumb/index";
import XLSX from 'xlsx';
import API from "../../../api";

const Dragger = Upload.Dragger;

class UserImport extends React.Component{
    constructor(){
        super();
        this.columns = [{
            title: '账号',
            dataIndex:'account',
            key: 'account',
        },{
            title: '姓名',
            dataIndex:'name',
            key: 'name',
        }, {
            title: '邮箱',
            dataIndex:'email',
            key: 'email',
        }, {
            title: '手机',
            dataIndex:'phone',
            key: 'phone',
        },{
            title: '账号类型',
            key: 'type',
            render:(text,record)=>(
                record.type.desc
            )
        }, ];

        this.state = {
            data: [],
            loading:false
        };
    }

    handleImport = async () => {
        if(this.state.data === []){
            message.error("数据为空！");
        }
        this.setState({loading:true});
        let result = await API.importUserList(this.state.data);
        this.setState({loading:false});
        if(result.ret){
            this.setState({data:[]});
            message.success("导入成功！");
        }else{
            message.error("导入失败！");
        }
    };

    render(){
        const props = {
            beforeUpload: (file) => {
                const reader = new FileReader();
                const rABS = !!reader.readAsBinaryString;
                reader.onload = (e) => {
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});

                    const studentWs = wb.Sheets["学生"];
                    const teacherWs = wb.Sheets["教师"];
                    const adminWs = wb.Sheets["管理员"];
                    let studentData = XLSX.utils.sheet_to_json(studentWs, {header:1}).slice(1);
                    let teacherData = XLSX.utils.sheet_to_json(teacherWs, {header:1}).slice(1);
                    let adminData = XLSX.utils.sheet_to_json(adminWs, {header:1}).slice(1);

                    let userData = [];
                    for(let index in studentData){
                        let row = studentData[index];
                        userData.push({no:index,account:row[0].trim(),name:row[1].trim(),
                            phone:row[2].trim(), email:row[3].trim(),
                            type:{code:11,desc:"学生"}});
                    }
                    for(let index in teacherData){
                        let row = teacherData[index];
                        userData.push({no:index,account:row[0].trim(),name:row[1].trim(),
                            phone:row[2].trim(), email:row[3].trim(),
                            type:{code:12,desc:"教师"}});
                    }
                    for(let index in adminData){
                        let row = adminData[index];
                        userData.push({no:index,account:row[0].trim(),name:row[1].trim(),
                            phone:row[2].trim(), email:row[3].trim(),
                            type:{code:1,desc:"管理员"}});
                    }
                    this.setState({data:userData});
                };
                if(rABS){
                    reader.readAsBinaryString(file);
                } else{
                    reader.readAsArrayBuffer(file);
                }
                return false;
            },
        };
        return (
            <div>
                <Breadcrumb path={[{text:"用户导入",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Dragger  {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽上传用户信息文件！</p>
                    </Dragger>
                    <Row style={{marginTop:10}}>
                        <Col span={4}>
                            <h4>文件解析结果：</h4>
                        </Col>
                        <Col offset={16} span={4}>
                            <h4 style={{textAlign:"right"}}><a href="/file/用户信息模板文件.xlsx">点击下载模板文件</a></h4>
                        </Col>
                    </Row>
                    <Spin spinning={this.state.loading} tip={"导入中..."}>
                        <Table style={{marginTop:5,marginBottom:10}} columns={this.columns}
                               rowKey="no" dataSource={this.state.data}/>
                        <Button style={{marginLeft:"45%"}} type={"primary"}
                                onClick={this.handleImport}
                        >导入</Button>
                    </Spin>

                </div>
            </div>
        );
    }
}

export default UserImport;