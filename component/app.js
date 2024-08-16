import React from "react";              
import ReactDOM  from "react-dom/client";  
import rainyImage from "./assets/rainy.jpg"
import Background from "./background";

const Body=()=>{
    return(
        <Background/>
    )
}
const Root=ReactDOM.createRoot(document.getElementById("root"))
Root.render(<Body/>)
