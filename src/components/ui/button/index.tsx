import React from "react"
import "./index.css"

const Button = (props) => {
    return (
        <button
            className={"custom-button" + (props.className ? ` ${props.className}` : "")}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default Button