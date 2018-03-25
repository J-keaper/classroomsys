import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from "react-router-dom";

/**
 * @param path:list,每个元素包含一个link,text
 */
class CustomBreadcrumb extends React.Component {
    render(){
        return (
            <Breadcrumb style={{padding:15,paddingLeft:20}}>
                <Breadcrumb.Item ><Link to={'/'}>首页</Link></Breadcrumb.Item>
                {
                    this.props.path.map((v,i)=>{
                        return (
                            <Breadcrumb.Item key={i}>
                                 v.link !== "" ? <Link to={v.link}>{v.text}</Link> : v.text
                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        );
    }
}

export default CustomBreadcrumb;