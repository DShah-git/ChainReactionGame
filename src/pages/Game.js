import {React,useEffect,useState} from 'react'
import '../CSS/game.css'
import {Link, useParams} from 'react-router-dom';
import gridDataStart from '../Data/gridData.json'; 


const availableColor = {
  2:["red","blue"],
  3:["red","blue","green"],
  4:["red","blue","green","cyan"],
  5:["red","blue","green","cyan","yellow"],
  6:["red","blue","green","cyan","yellow","pink"],
}



function Game() {
  const params = useParams();
  const playerCount = params.playerCount;
  const selectedColors = availableColor[playerCount]
  const [gridData,setGridData] = useState(gridDataStart); 
  const [currentPlayer,setCurrentPlayer] = useState(0);

  const [turnCounter,setTurnCounter] = useState(0);

  useEffect(() => {
    let counter = turnCounter
    setTurnCounter(counter+1);
    
    if(turnCounter<=playerCount){ return; }
    console.log(turnCounter)

    // let checker = {}
    // for(let i=0;i<playerCount;i++){
    //   checker[selectedColors[i]] = 0;
    // }

    // for(let i=0;i<gridData.length;i++){
    //   for(const box in gridData[i]){
    //     if(gridData[i][box].currentColor==='black') continue;
    //     checker[gridData[i][box].currentColor]+=1;
    //   }
    // }

    // for(let i=0;i<selectedColors.length;i++){
    //   if(checker[selectedColors[i]]===0){
    //     selectedColors.splice(i,1);
    //   }
    // }

    // // console.log(selectedColors,checker)
    // if(selectedColors.length===1){
    //   console.log(selectedColors[0] + " WINS")
    //   // eslint-disable-next-line no-restricted-globals
    //   location.href = "/"
    // }    

  }, [gridData]);


  


  function increaseHold(location,reaction){
    
    //get grid information
    let grid = gridData;
    let rowIndex = location.split(",")[0] - 1    
    let row  = grid[rowIndex];

    //check if box belongs to currentPlayer
    if(row[location].currentHold>0 && row[location].currentColor!==selectedColors[currentPlayer]&&reaction===false) {return} ;

    //update grid
    row[location] = {
      currentHold : row[location].currentHold+1,
      currentColor : selectedColors[currentPlayer],
      influence : row[location].influence,
      type : row[location].type
    }

    
    grid.splice(rowIndex,1,row);
    setGridData([...grid]);

    //check if chain reaction needs to happen
    if(row[location].type==="corner"&&row[location].currentHold>1)
    {
      row[location] = {
        currentHold : 0,
        currentColor : "black",
        influence : row[location].influence,
        type : row[location].type
      }


      grid.splice(rowIndex,1,row);
      setGridData([...grid]);
      
      increaseHold(row[location].influence[0],true);
      increaseHold(row[location].influence[1],true);
      
    }else if(row[location].type==="edge"&&row[location].currentHold>2)
    {
      row[location] = {
        currentHold : 0,
        currentColor : "black",
        influence : row[location].influence,
        type : row[location].type
      }

      grid.splice(rowIndex,1,row);
      setGridData([...grid]);

      increaseHold(row[location].influence[0],true);
      increaseHold(row[location].influence[1],true);
      increaseHold(row[location].influence[2],true);

      
    }
    else if(row[location].type==="free"&&row[location].currentHold>3)
    {
      row[location] = {
        currentHold : 0,
        currentColor : "black",
        influence : row[location].influence,
        type : row[location].type
      }


      grid.splice(rowIndex,1,row);
      setGridData([...grid]);

      increaseHold(row[location].influence[0],true);
      increaseHold(row[location].influence[1],true);
      increaseHold(row[location].influence[2],true);
      increaseHold(row[location].influence[3],true);

      
    }

    

    //controls to next player
    let nextPlayer = currentPlayer+1;
    if(nextPlayer>playerCount-1){
      setCurrentPlayer(0)
    }else{
      setCurrentPlayer(nextPlayer)
    }

   
  }

  return (
    <div className='container'>
      <div className='control'> 
        Current Player :  {selectedColors[currentPlayer]}
      </div>
      <div className='playArea'>
        {
          gridData.map((row,index) => (
              <div key={index+1} className='row'>
                {Object.keys(row).map(location => (
                  <div key={location} className='box' style={{'color':row[location].currentColor,'borderColor':selectedColors[currentPlayer]}} onClick={(e)=>{increaseHold(location,false)}}>
                    {
                      row[location].currentHold > 0 &&
                      <>{row[location].currentHold}</> 
                    }
                    
                  </div>
                ))}
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Game