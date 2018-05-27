import React from 'react';
import {Upload, Icon, Table, Button, Row, Col, message, Spin} from "antd";
import Breadcrumb from "../../../components/Breadcrumb/index";
import XLSX from 'xlsx';
import API from "../../../api";

const Dragger = Upload.Dragger;


class ClassroomImport extends React.Component{
    constructor(){
        super();
        this.columns = [{
                title:"校区",
                dataIndex:"campus",
                key:"campus"
            },{
                title:"教学楼",
                dataIndex:"building",
                key:"building"
            },{
                title:"教室",
                dataIndex:"number",
                key:"number"
            },{
                title:"容量",
                dataIndex:"seating",
                key:"seating"
            }];

        this.state = {
            data: [],
            loading:false
        };
    }

    handleImport = async() => {
        if(this.state.data === []){
            message.error("数据为空！");
        }
        this.setState({loading:true});
        let result = await API.importClassroomList(this.state.data);
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

                    const ws = wb.Sheets[wb.SheetNames[0]];
                    let data = XLSX.utils.sheet_to_json(ws, {header:1}).slice(1);

                    let classroomData = [];
                    for(let index in data){
                        let row = data[index];
                        classroomData.push({no:index,campus:row[0].trim(), building:row[1].trim(),
                            number:row[2].trim(),seating:row[3].trim()});
                    }
                    this.setState({data:classroomData});
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
                <Breadcrumb path={[{text:"教室导入",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Dragger  {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽上传教室信息文件！</p>
                    </Dragger>
                    <Row style={{marginTop:10}}>
                        <Col span={4}>
                            <h4>文件解析结果：</h4>
                        </Col>
                        <Col offset={16} span={4}>
                            <h4 style={{textAlign:"right"}}><a href="/file/教室信息模板文件.xlsx">点击下载模板文件</a></h4>
                        </Col>
                    </Row>
                    <Spin spinning={this.state.loading} tip={"导入中..."}>
                        <Table style={{marginTop:10,marginBottom:10}} columns={this.columns}
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

export default ClassroomImport;