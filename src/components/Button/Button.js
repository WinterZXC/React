import React from "react";
import './Button.css';

export default function CustomButton(props){
    return(
        <button className="button" disabled={props.isDisabled} onClick={props.function}>{props.text}</button>
    )
}