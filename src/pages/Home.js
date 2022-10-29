import React from 'react'
import '../CSS/home.css';
import {Link} from "react-router-dom";

function Home() {
  
    return (
    <div>
        <div className='title'>
            <h1>Chain Reaction</h1>
            <h3>Select the amount of players</h3>
        </div>
        <div className='selection'>
            {
                [2,3,4,5,6].map(number => (
                    <Link to={"game/"+number} className='buttons'>{number}</Link    >
                ))
            }
        </div>
    </div>
  )
}

export default Home