import {
  defineQuery
} from "bitecs"

//components
import { PhysicsBody } from "../components/PhysicsBody" 
import { Movement } from "../components/Movement" 

export const createMovementSystem=(world)=>{
  const movementQuery=defineQuery([Movement, PhysicsBody])
  
  return (world)=>{
    
    movementQuery(world).forEach(id=>{
      
      const body=world.bodies[id]
      if (!body)
        return
        
      body.body.setVelocityX(Movement.x[id]*Movement.speed[id])
      
    })
    
    
    
    return world
  }
}