import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {Divider, Modal, Table, Input, Select, Button} from 'antd';
import {bindActionCreators} from "redux";
import {getApplyList, getCommonConstant} from "../../../redux/action";
import {connect} from "react-redux";
import DetailModal from "./DetailModal";
import moment from "moment";
import {Link} from "react-router-dom";

const Option = Select.Option;

class Apply extends  React.Component{
    constructor(){
        super();
        this.columns = [ {
            title: '申请人',
            key: 'applicant',
            render:(text,record)=>(
                record.applicant.account + " - " + record.applicant.name
            )
        }, {
            title: '申请时间',
            key: 'applyTime',
            render:(text,record)=>{
                return (moment(record.createTime).format("YYYY-MM-DD HH:mm"));
            }
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

        this.defaultPageSize = 10;

        this.state = {
            pagination: {defaultPageSize:this.defaultPageSize},
            detailModalVisible:false,
            detailApply:{},
            searchApplicant:"",
            searchStatus:-1
        };
    }

    componentWillMount = async() => {
        if(this.props.applyStatus !== {}){
            this.props.getCommonConstant();
        }
        await this.getApplyList(1);
        const pagination = { ...this.state.pagination };
        pagination.total = this.props.applyCount;
        pagination.current = 1;
        this.setState({pagination});
    };

    getApplyList = async (pageCount,pageSize = this.defaultPageSize) => {
        await this.props.getApplyList(this.state.searchApplicant,this.state.searchStatus, pageCount,pageSize);
    };

    handleDetail = (apply) => {
        this.setState({detailModalVisible:true,detailApply:apply})
    };


    handleDetailCancel  = () => {
        this.setState({detailModalVisible:false})
    };

    handleSearch = async() => {
        await this.getApplyList(1);
        const pager = { ...this.state.pagination };
        pager.total = this.props.applyCount;
        pager.current = 1;
        this.setState({pagination:pager});
    };

    handleSearchApplicantChange = (e) => {
        this.setState({searchApplicant:e.target.value});
    };

    handleSearchStatusChange = (v) => {
        this.setState({searchStatus:v},this.handleSearch);
    };

    handleTableChange = async (pagination, filters, sorter) => {
        await this.getApplyList(pagination.current);
        const pager = { ...this.state.pagination };
        pager.total = this.props.applyCount;
        pager.current = pagination.current;
        this.setState({pagination:pager});
    };


    render(){
        const {applyList, applyStatus,loading} = this.props;
        return (
            <div>
                <Breadcrumb path={[{text:"教室申请",link:""}]}/>
                <div style={{margin:20,marginTop:0}}>
                    <Input style={{width:200,marginRight:50}} placeholder="申请人"
                           onChange={this.handleSearchApplicantChange}
                           onBlur={this.handleSearch} />

                    状态：<Select style={{width:200}} placeholder="选择状态"
                        optionFilterProp="children" defaultValue={-1}
                               onChange={this.handleSearchStatusChange}
                    >
                        <Option key={-1} value={-1}>全部</Option>
                        {applyStatus &&
                        Object.values(applyStatus).map((v,i)=>(
                            <Option key={i} value={v.code}>{v.desc}</Option>
                        ))
                        }
                    </Select>
                </div>
                <Table style={{margin:20,marginTop:0}} columns={this.columns} rowKey={"id"}
                       dataSource={applyList !== undefined ? applyList : []}
                       pagination={this.state.pagination}
                       loading={!!loading}
                       onChange={this.handleTableChange}
                />
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
    applyCount:state.apply.applyCount,
    applyList:state.apply.applyList,
    applyStatus:state.common.applyStatus,
    loading:state.common.fetching
});

const mapDispatchToProps = dispatch => ({
    getCommonConstant:bindActionCreators(getCommonConstant,dispatch),
    getApplyList:bindActionCreators(getApplyList,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Apply);


