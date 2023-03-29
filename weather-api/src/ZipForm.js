import React, {useState} from "react";

export default function ZipForm({setZip}){
    const [newZip, setNewZip] = useState();

    return(
        <div>
                <input id="zipInput" name="zipInput" placeholder="Enter zip" onChange={e=>setNewZip(e.target.value)}/>
                <button id="zipButton" onClick={()=>setZip(newZip)}>Get Weather</button>
        </div>
    )
}