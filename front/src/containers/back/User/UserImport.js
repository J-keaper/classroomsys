import React from 'react';
import {Upload, Icon, Table} from "antd";
import Breadcrumb from "../../../components/Breadcrumb/index";
import XLSX from 'xlsx';


const Dragger = Upload.Dragger;

class UserImport extends React.Component{
    constructor(){
        super();
        this.columns = {

        }
    }

    render(){
        const props = {
            beforeUpload: (file) => {
                console.log(file);
                const reader = new FileReader();
                const rABS = !!reader.readAsBinaryString;
                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    let data = XLSX.utils.sheet_to_json(ws, {header:1});
                    console.log(data);
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
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Dragger  {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽上传信息用户文件！</p>
                    </Dragger>
                    {/*<Table style={{margin:20}} columns={this.columns} rowKey="id">*/}

                    {/*</Table>*/}
                </div>
            </div>
        );
    }
}

export default UserImport;