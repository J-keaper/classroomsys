import React from 'react';
import {Carousel, Col, Row} from "antd";

import './index.less';

class Home extends React.Component{

    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <Carousel autoplay>
                    <div>
                        <img src={"/banner1.png"}/>
                    </div>
                    <div>
                        <img src={"/banner2.png"}/></div>
                    <div>
                        <img src={"/banner3.png"}/></div>
                </Carousel>
                <Row>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>
            </div>
        );
    }

}


export default Home;