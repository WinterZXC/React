import React from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontSize: 16,
    },
  }));

export default function Card(props){
    return(
        <div className="Card">
            <img src={props.ImgUrl} className="Img" alt="userphoto"></img>
            <CustomTooltip  title={props.Name} >
                <p className="UserName" >{props.Name}</p>
            </CustomTooltip>

            <CustomTooltip  title={props.Position} >
                <p className="UserData" >{props.Position}</p>
            </CustomTooltip>

            <CustomTooltip  title={props.Mail} >
            <p className="UserData" >{props.Mail}</p>
            </CustomTooltip>

            <CustomTooltip  title={props.Phone} >
            <p className="UserData" >{props.Phone}</p>
            </CustomTooltip>
        </div>
    )
}