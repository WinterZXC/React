import React from "react";
import './UploadFile.css';

export default function UploadFile(props){
    return(
        <div className={props.className} name="file" onChange={props.onChange} data-text={props.text}>
            <input className="FileUploadField" type="file" required/>
        </div>
    )
}