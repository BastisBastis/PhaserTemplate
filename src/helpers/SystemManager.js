import { createGameObjectSystem } from "../systems/GameObjectSystem" 
import { createPhysicsBodySystem } from "../systems/PhysicsBodySystem" 
import { createPositionSystem } from "../systems/PositionSystem" 
import { createPlayerInputSystem } from "../systems/PlayerInputSystem" 
import { createMovementSystem } from "../systems/MovementSystem" 


export class SystemManager {
  constructor(world) {
    this.world=world
    
    this.systems=[
      createPlayerInputSystem(world),
      createMovementSystem(world),
      createGameObjectSystem(world),
      createPhysicsBodySystem(world),
      createPositionSystem(world),
    ]
  }
  
  update() {
    this.systems.forEach(system=>{
      system(this.world)
    })
  }
}