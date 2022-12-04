import {
  defineQuery,
  enterQuery,
  hasComponent 
} from "bitecs"

import Phaser from "phaser"

//components

import { Player } from "../components/Player" 

//helpers
import { EventCenter } from "../helpers/EventCenter" 


export const createControlsSystem=(world)=>{
  
  
  const playerQuery=defineQuery([Player])
  
  let controls={
    up:false,
    down:false,
    left:false,
    right:false
  }
  
  let gamepad={
    up:false,
    down:false,
    left:false,
    right:false
  }

  EventCenter.on("setMovementCursors",joystickCursors=>{
    Object.keys(joystickCursors).forEach(cursorKey=>{
      controls[cursorKey]=joystickCursors[cursorKey]
    })
  })

  EventCenter.on("setMovementCursor",({cursor,value})=>{
    controls[cursor]=value
  })
  
  EventCenter.on("setMovementSpeed",val=>{
    speed=val
  })

  
  EventCenter.on("updateGamepad",(pad)=>{
    gamepad=pad
    
  })
  
  return (world)=>{
    if (world.store.rotating)
      return world
      
    const cursors={
      up:controls.up||gamepad.up,
      down:controls.down||gamepad.down,
      left:controls.left||gamepad.left,
      right:controls.right||gamepad.right,
    }
    shellQuery(world).forEach(id=>{
      if (cursors.up) {
        if (Shell.state[id]<1)
          EventCenter.emit("startShellRotation",world.sprites[id])
        if (Shell.state[id]!==1)
          EventCenter.emit("playAudio",{key:"spin"})
        Shell.state[id]=1
      }
        
      else if (cursors.down) {
        if (Shell.state[id]<1)
          EventCenter.emit("startShellRotation", world.sprites[id])
        if (Shell.state[id]!==2)
          EventCenter.emit("playAudio",{key:"spin"})
        Shell.state[id]=2
      }
        
      else {
        if (Shell.state[id]>0) {
          EventCenter.emit("playAudio",{key:"stopSpin"})
          EventCenter.emit("stopShellRotation")
        }
          
        Shell.state[id]=0
      }
        
    })
    
    playerQuery(world).forEach(id=>{
      let moveDir=0
      if (cursors.left)
        moveDir--
      if (cursors.right)
        moveDir++
        
      const sprite=world.sprites[id]
      if (!sprite) 
        return
        
      
        
        
      
      if (moveDir!==0)
        sprite.flipX=moveDir<0
      
      if (world.store.rotation>0&&world.store.rotation<3)
        moveDir*=-1
      
      if (world.store.rotation%2>0)
        sprite.setVelocityY(moveDir*speed)
      else 
        sprite.setVelocityX(moveDir*speed)
      
      
      if (moveDir===0) {
        sprite.play("idle",true)
        EventCenter.emit("stopMoving",sprite)
      }
        
      else   {
        sprite.play("walk",true)
        EventCenter.emit("startMoving",sprite)
      }/*
        if (cursors.up||cursors.down)
          sprite.play("gravity-walk",true)
        else */
          
      
      
      
      if (
        cursors.up 
        &&!sprite.flipX
        &&(cursors.right||rotWithoutDir)
        && Trigger.triggered[Player.triggerR[id]]===1
      ) {
        EventCenter.emit("rotateWorld",1)
      } else if (
        cursors.up 
        &&sprite.flipX
        &&(cursors.left||rotWithoutDir)
        && Trigger.triggered[Player.triggerL[id]]===1
      ) {
        EventCenter.emit("rotateWorld",-1)
      } else if (
        cursors.down 
        &&!sprite.flipX
        &&(cursors.right||rotWithoutDir)
        && (
          Trigger.triggered[Player.triggerBR[id]]<1
          &&Trigger.triggered[Player.triggerBL[id]]===1
        )
      ) {
        EventCenter.emit("rotateWorldDown",1)
      }
      else if (
        cursors.up 
        &&sprite.flipX
        &&(cursors.left||rotWithoutDir)
        && Trigger.triggered[Player.triggerL[id]]===1
      ) {
        EventCenter.emit("rotateWorld",-1)
      } else if (
        cursors.down 
        &&sprite.flipX
        &&(cursors.left||rotWithoutDir)
        && (
          Trigger.triggered[Player.triggerBL[id]]<1
          &&Trigger.triggered[Player.triggerBR[id]]===1
        )
      ) {
        EventCenter.emit("rotateWorldDown",-1)
      }
      
    })
    
    return world
  }
  
}