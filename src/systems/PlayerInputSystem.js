import Phaser from "phaser"
import {
  defineQuery,
  hasComponent
} from "bitecs"

//Components
import { Player } from "../components/Player" 
import { Movement } from "../components/Movement" 

//Helpers
import { EventCenter } from "../helpers/EventCenter"



export const createPlayerInputSystem=(
  world
)=>{
  
  const cursorVector=new Phaser.Math.Vector2(0,0)
  
  const movementCursors={
    up:false,
    down:false,
    left:false,
    right:false
  }
  
  const movementAxis={
    x:0,
    y:0
  }
  
  EventCenter.on("setMovementCursor",({cursor,value})=>{
    movementCursors[cursor]=value
  })
  
  EventCenter.on("setMovementAxis",data=>{
    movementAxis.x=data.x
    movementAxis.y=data.y
  })
  
  
  
  const playerQuery=defineQuery([Player,Movement])
  
  
  return world=>{
    
    if (movementCursors.up || movementCursors.down) {
      movementAxis.y=0
        - (movementCursors.up?1:0)
        + (movementCursors.down?1:0)
    }
    if (movementCursors.left || movementCursors.right) {
      movementAxis.x=0
        - (movementCursors.left?1:0)
        + (movementCursors.right?1:0)
    }
    
    playerQuery(world).forEach(id=>{
      Movement.x[id]=movementAxis.x
      Movement.y[id]=movementAxis.y
    })
    
    return world;
  }
}
