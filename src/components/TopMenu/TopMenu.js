import React from "react";
import { Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import CustomButton from "../Button/Button";

import Col from 'react-bootstrap/Col';
import './TopMenu.css';


import { ReactComponent as Logo } from "../../img/Logo.svg";

export default function TopMenu(){
    return(
        <Container fluid="true" className="TopMenu">
            <Container fluid="true" className="Content">
                <Row>
                    <Col>
                        <Logo className="img"/>
                    </Col>
                        <Col xl="auto" md="auto" sm="auto" xs="auto" className="btnUsers" >
                            <CustomButton text="&nbsp;&nbsp;Users&nbsp;&nbsp;"/>
                        </Col>
                        <Col xl="auto" md="auto" sm="auto" xs="auto" className="btnSign">
                            <CustomButton text="Sign up" />
                        </Col>
                    
                </Row>
            </Container>
        </Container>
    )
}