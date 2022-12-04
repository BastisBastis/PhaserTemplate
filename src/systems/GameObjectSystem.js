import {
  defineQuery,
  enterQuery,
  exitQuery,
  hasComponent
} from "bitecs"

//Components
import { Shape } from "../components/Shape" 
import { Position2d } from "../components/Position2d" 
import { Size2d } from "../components/Size2d" 
import { PhysicsBody } from "../components/PhysicsBody" 
import { Color } from "../components/Color" 
import { Sprite } from "../components/Sprite" 

//Data
import { ShapeTypes } from "../data/ShapeTypes" 


export const createGameObjectSystem =(world)=>{
  
  world.gameObjects={}
  
  const shapeQuery=defineQuery([Shape,Position2d,Size2d,Color])
  const shapeEnterQuery=enterQuery(shapeQuery)
  
  return world=>{
    
    shapeEnterQuery(world).forEach(id=>{
      let object
      switch (Shape.type[id]) {
        case ShapeTypes.rectangle:
          object=world.scene.add.rectangle(
            Position2d.x[id],
            Position2d.y[id],
            Size2d.width[id],
            Size2d.height[id],
            Color.hex[id]
          )
          break
        case ShapeTypes.circle:
          object=world.scene.add.circle(
            Position2d.x[id],
            Position2d.y[id],
            Size2d.radius[id],
            Color.hex[id]
          )
          break
      }
      
      world.gameObjects[id]=object
    })
    
    
    
    return world
  }
  
}