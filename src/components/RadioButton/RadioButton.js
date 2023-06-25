import React from "react";
import './RadioButton.css';

export default function RadioButton(props){
    return(
        <label className="Container">{props.text}
            <input type="radio" name="Radio" className="RadioLabel" defaultValue={props.value} onChange={props.onChange} required/>
            <span className="Checkmark"></span>
        </label>
    )
}