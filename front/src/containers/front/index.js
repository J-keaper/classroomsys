import React from 'react';
import HeadBar from "./Header/index";
import Footer from "./Footer/index";
import {Layout} from "antd";
import {FrontRouter as ContentRouter} from "../../routers/index"

const {Content} = Layout;

class FrontApp extends React.Component{

    render(){
        return (
            <Layout style={{height:"100%"}}>
                <HeadBar/>
                <Content>
                    <ContentRouter/>
               </Content>
                <Footer/>
            </Layout>
        );
    }

}

export default FrontApp;