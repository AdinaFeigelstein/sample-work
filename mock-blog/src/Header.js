import { Link } from "react-router-dom";

export default function Header() {
    return (   
        <div id="mainHeader">
           <h1><Link id="homeButton" to='/'>My Blog Site</Link> </h1>  
        </div>
        
    )
}