import {
  addEntity,
  addComponent
} from "bitecs"

//Components
import { Shape } from "../components/Shape" 
import { Position2d } from "../components/Position2d" 
import { Size2d } from "../components/Size2d" 
import { PhysicsBody } from "../components/PhysicsBody" 
import { Color } from "../components/Color" 
import { Movement } from "../components/Movement"
import { Player } from "../components/Player" 
import { Jump } from "../components/Jump" 

//Data
import { ShapeTypes } from "../data/ShapeTypes"
import { CollisionGroupKeys } from "../factories/CollisionGroups" 


export const createPlayer=(world)=>{
  
  
  const id= addEntity(world)
  addComponent(world, Position2d, id)
  addComponent(world, Size2d, id)
  addComponent(world, Color, id)
  addComponent(world, Shape, id)
  addComponent(world, PhysicsBody, id)
  addComponent(world, Player, id)
  addComponent(world, Movement, id)
  addComponent(world, Jump, id)
  
  Position2d.x[id]=100
  Position2d.y[id]=540
  
  Size2d.width[id]=64
  Size2d.height[id]=128
  
  Color.hex[id]=0x993333
  
  Shape.type[id]=ShapeTypes.rectangle
  
  PhysicsBody.collisionGroup[id]=CollisionGroupKeys.player
  
  Movement.x[id]=0
  Movement.y[id]=0
  Movement.speed[id]=5
  
  Jump.bufferTimer[id]=-1
  Jump.coyoteTimer[id]=-1
  Jump.jumpVelocity[id]=-1000
  Jump.maxJumpTime[id]=300
  Jump.currentJumpTimer[id]=-1
  Jump.fallingGravityMod[id]=2
  Jump.holdingJump[id]=0
  
}