import React, { useEffect } from "react"
import "./index.css"

const Button = (props) => {
    let classes = "custom-button";
    classes += props.className ? ` ${props.className}` : "";

    return (
        <button
            className={classes}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default Button