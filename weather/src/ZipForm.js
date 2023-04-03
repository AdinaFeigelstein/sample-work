import React, {useState} from "react";

export default function ZipForm({setZip, setMoreInfo}){
    const [newZip, setNewZip] = useState();

    return(
        <div>
                <input id="zipInput" name="zipInput" placeholder="Enter zip" onChange={e=>setNewZip(e.target.value)}/>
                <button id="zipButton" onClick={()=>{setZip(newZip); setMoreInfo(false)}}>Get Weather</button>
        </div>
    )
}