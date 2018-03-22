import React from 'react';
import {Layout} from 'antd';
import SideBar from "./SideBar";
import HeadBar from "./HeadBar";
import Footer from "./Footer";
import {AdminRouter as ContentRouter} from '../../routers';
import {menus} from "../../constants/menus";

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