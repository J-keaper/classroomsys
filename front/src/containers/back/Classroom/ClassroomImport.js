import React from 'react';
import {Upload, Icon} from "antd";
import Breadcrumb from "../../../components/Breadcrumb/index";

const Dragger = Upload.Dragger;


class ClassroomImport extends React.Component{
    constructor(){
        super();
    }

    render(){
        const props = {};
        return (
            <div>
                <Breadcrumb path={[{text:"用户管理",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Dragger  {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽上传用教室信息文件！</p>
                    </Dragger>
                </div>
            </div>
        );
    }
}

export default ClassroomImport;