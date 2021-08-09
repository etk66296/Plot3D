class Plot3DKeyboard extends Plot3DUserIO{
  constructor() {
    super()

    this.keysDown = new Array(250).fill(false)
    
    document.addEventListener('keydown', (event) => {
      this.setKeyDown((event || window.event).keyCode)
    })

    document.addEventListener('keyup', (event) => {
      this.releaseKey((event || window.event).keyCode)
    })


    this.kbWasdCtrlObjects = []
    this.kbArrowFlyCtrlObjects = []
 
  }

  imposeKeyDownWasdCtrlTo(renderable3dObj) {
    this.kbWasdCtrlObjects.push(renderable3dObj)
  }

  imposeKeyDownArrowFlyCtrlTo(renderable3dObj) {
    this.kbArrowFlyCtrlObjects.push(renderable3dObj)
  }

  setKeyDown(keyCode) {
    this.keysDown[keyCode] = true
  }

  releaseKey(keyCode) {
    this.keysDown[keyCode] = false
  }

  updateWasdCtrl() {
    this.kbWasdCtrlObjects.forEach(renderable3d => {
      if (this.keysDown[87] /*w*/) {
       
      }
      if (this.keysDown[65] /*a*/) {
        
      }
      if (this.keysDown[83] /*s*/) {
      
      }
      if(this.keysDown[68] /*d*/) {
      
      }
    })
  }

  updateArrowFlyCtrl() {
    this.kbArrowFlyCtrlObjects.forEach(() => {
      if(this.keysDown[33] /*bild up*/) {
       
      }
      if(this.keysDown[34] /*bild down*/) {
       
      }
      if(this.keysDown[37] /*left arrow*/) {
       
      }
      if(this.keysDown[38] /*up arrow*/) {
        
      }
      if(this.keysDown[39] /*right arrow*/) {
        
      }
      if(this.keysDown[40] /*down arrow*/) {
       
      }
    })
  }

  update() { /*NOT TESTED YET*/
    this.updateWasdCtrl()
    this.updateArrowFlyCtrl()
  }
   
}
