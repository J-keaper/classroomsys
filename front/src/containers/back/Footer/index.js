import React from 'react';
import {Layout} from 'antd';

export default class Footer extends React.Component{

    render() {
        return (
            <Layout.Footer style={{textAlign: 'center'}}>
                <div>
                    教室资源管理系统 <br/>
                    Copyright © <a target="_blank" href="http://keaper.cn/">keaper</a> 版权所有
                </div>
            </Layout.Footer>
        );
    }
}