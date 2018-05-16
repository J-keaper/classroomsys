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
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
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