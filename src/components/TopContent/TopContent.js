import React from "react";
import './TopConetent.css';
import Container from 'react-bootstrap/Container';
import CustomButton from "../Button/Button";

export default function TopContent(){
    return(
        <Container fluid="true" className="TopContentBg">
            <Container fluid="true" className="TopContent">
                <h1 className="h1">Test assignment for front-end developer</h1>
                <h2 className="h2">What defines a good front-end developer
                is one that has skilled knowledge of HTML, CSS, JS
                with a vast understanding of User design thinking
                as they'll be building web interfaces with accessibility
                in mind. They should also be excited to learn, as the world
                of Front-End Development keeps evolving.</h2>
                <CustomButton text="Sign up"  />
            </Container>
        </Container>
    )
}