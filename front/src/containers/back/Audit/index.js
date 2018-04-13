import React from 'react';
import Breadcrumb from "../../../components/Breadcrumb/index";
import {connect} from "react-redux";
import AuditForm from './AuditForm';
import {bindActionCreators} from "redux";
import {getAuditApply} from "../../../redux/action";

class Audit extends React.Component{

    componentWillMount(){
        const applyId = this.props.match.params.id;
        this.props.getAuditApply(applyId);
    }

    render(){
        const {auditApply} = this.props;
        return (
            <div>
                <Breadcrumb path={[{text:"申请审核",link:""}]}/>
                <AuditForm auditApply={auditApply}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auditApply:state.apply.auditApply
});
const mapDispatchToProps = dispatch => ({
    getAuditApply:bindActionCreators(getAuditApply,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Audit);