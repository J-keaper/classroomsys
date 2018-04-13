import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Divider, Modal, Table} from 'antd';
import {bindActionCreators} from "redux";
import {getApplyList} from "../../../redux/action";
import {connect} from "react-redux";
import DetailModal from "./DetailModal";
import moment from "moment";
import {Link} from "react-router-dom";

class Apply extends  React.Component{
    constructor(){
        super();
        this.columns = [ {
            title: '申请人',
            key: 'applicant',
            render:(text,record)=>(
                record.applicant.account
            )
        }, {
            title: '申请时间',
            key: 'applyTime',
            render:(text,record)=>(
                moment(record.createTime).format("YYYY-MM-DD HH:mm")
            )
        }, {
            title: '状态',
            key: 'status',
            render:(text,record)=>(
                record.status.desc
            )
        }, {
            title: '操作',
            key: 'operation',
            render:(text,record)=>(
                <span>
                    <a onClick={() => this.handleDetail(record)}>详情</a>
                    <Divider type="vertical" />
                    <Link to={`/admin/apply/audit/${record.id}`}>审核</Link>
                </span>
            )
        }];

        this.state = {
            detailModalVisible:false,
            detailApply:{}
        };
    }

    componentWillMount(){
        this.props.getApplyList(1);
    }

    handleDetail = (apply) => {
        this.setState({detailModalVisible:true,detailApply:apply})
    };


    handleDetailCancel  = () => {
        this.setState({detailModalVisible:false})
    };


    render(){
        const {applyList} = this.props;
        return (
            <div>
                <Breadcrumb path={[{text:"教室申请",link:""}]}/>
                <Table style={{margin:20,marginTop:0}} columns={this.columns}
                       dataSource={applyList} rowKey={"id"}/>
                <Modal title="详情" footer={null}
                       visible={this.state.detailModalVisible}
                       onCancel={this.handleDetailCancel}>
                    <DetailModal applyInfo={this.state.detailApply}/>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    applyList:state.apply.applyList
});

const mapDispatchToProps = dispatch => ({
    getApplyList:bindActionCreators(getApplyList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Apply);


