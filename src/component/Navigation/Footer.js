import React from 'react';
import { Footer, FooterSection, FooterLinkList } from "react-mdl";
import { Link } from "react-router-dom";
var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function FooterNav() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
               <h2>hello</h2>
            </div>
        </div>
    )
}

export default FooterNav