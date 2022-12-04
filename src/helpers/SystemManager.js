import { createGameObjectSystem } from "../systems/GameObjectSystem" 
import { createPhysicsBodySystem } from "../systems/PhysicsBodySystem" 
import { createPositionSystem } from "../systems/PositionSystem" 

export class SystemManager {
  constructor(world) {
    this.world=world
    
    this.systems=[
      createGameObjectSystem(world),
      createPhysicsBodySystem(world),
      createPositionSystem(world)
    ]
  }
  
  update() {
    this.systems.forEach(system=>{
      system(this.world)
    })
  }
}