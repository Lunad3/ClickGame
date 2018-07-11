import React from "react";
import "./Block.css";

const Block = props=>(
    <div className="block">
        {props.colorArr.map(color=>{
            return <div className="colorRow" style={{backgroundColor:color}} key={color}></div>
        })}
    </div>
);

export default Block;