import React from "react";
import './Input.css';

export default function CustomInput(props){
    return(
        <div className="FloatingLabelGroup">
            <input type={props.type} className={props.className} name={props.name} onChange={props.onChange} defaultValue={props.value} required />
            <label className={props.FloatingLabel}>{props.text}</label>
            
        </div>
    )
}