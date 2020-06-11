import React, { useState, useEffect } from "react";
import Eggs from "./Eggs";
import Milk from "./Milk";
import API from "../utils/API";



function Omelet() {
    const [sheep, setState] = useState([])

    useEffect(() => {
        getMemeTable();
      }, [])
    

    function getMemeTable(memes) {
        API.getMemes(memes)
            .then(res => setState(res.data.data.memes))
            .catch(err => console.log(err));
    };
        console.log(sheep)
        return (
                <Milk>{sheep.map((meme) => meme ? <div>
                    <div className="img">
                    <img src={meme.url} alt=''></img>
                    </div>
                    <div className="meatTable">
                    <Eggs
                    name={meme.name}
                    ></Eggs>
                    </div>
                    </div> : null
                )}</Milk>
            
        )
    }


export default Omelet;