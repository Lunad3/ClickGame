import React from "react";
import "./Block.css";

const Block = props=>(
    <div className="block" onClick={()=>{props.selectBlock(props.colorArr)}}>
        {props.colorArr.map(colorObj=>{
            return <div className="colorRow" style={{backgroundColor:colorObj.color}} key={colorObj.key}></div>
        })}
    </div>
);

export default Block;