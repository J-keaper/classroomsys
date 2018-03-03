import React from 'react';
import {Layout} from 'antd';
import SideBar from "./components/SideBar";
import HeadBar from "./components/HeadBar";
import Footer from "./components/Footer";
import ContentRouter from './routers';

const {Content} = Layout;
class App extends React.Component {

    constructor(){
        super();
        this.state = {
            collapsed: false,
        };
    }

    toggle = ()=>{
        this.setState({
            collapsed: !this.state.collapsed
        });
    };


    render() {
        return (
            <Layout style={{height:"100%"}}>
                <SideBar collapsed={this.state.collapsed} />
                <Layout>
                    <HeadBar collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Content>
                        <ContentRouter/>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        );
    }
}
export default App;