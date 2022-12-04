import Phaser from "phaser"


//Helpers
import { EventCenter } from "../helpers/EventCenter" 
import { GlobalStuff } from "../helpers/GlobalStuff" 
import { Controls } from "../helpers/Controls" 

//Data
import { Palette } from "../data/Palette" 

//UI Elements
import { Joystick } from "../ui/Joystick" 

export default class UI extends Phaser.Scene {
  
  constructor() {
    super("ui")
  }
  
  preload() {
    
  }
  
  create({}) {
    
    this.setupJoystick()
    this.controls=new Controls(this)
  }
  
  setupJoystick() {
    this.joystick = new Joystick({
      scene:this,
      onChange:(data)=>{
        EventCenter.emit("joystickUpdate", data)
      }
    })
  }
  
  update(time,dt) {
    
    
    
  }
}