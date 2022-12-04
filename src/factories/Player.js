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

//Data
import { ShapeTypes } from "../data/ShapeTypes"
import { CollisionGroupKeys } from "../factories/CollisionGroups" 


export const createPlayer=(world)=>{
  
  
  const id= addEntity(world)
  addComponent(world,Position2d,id)
  addComponent(world,Size2d,id)
  addComponent(world,Color,id)
  addComponent(world,Shape,id)
  addComponent(world,PhysicsBody,id)
  
  Position2d.x[id]=100
  Position2d.y[id]=540
  
  Size2d.width[id]=64
  Size2d.height[id]=128
  
  Color.hex[id]=0x993333
  
  Shape.type[id]=ShapeTypes.rectangle
  
  PhysicsBody.collisionGroup[id]=CollisionGroupKeys.player
  
}