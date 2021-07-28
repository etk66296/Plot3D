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
        renderable3d.translateZIncremental(0.1)
      }
      if (this.keysDown[65] /*a*/) {
        renderable3d.translateXIncremental(0.1)
      }
      if (this.keysDown[83] /*s*/) {
        renderable3d.translateZIncremental(-0.1)
      }
      if(this.keysDown[68] /*d*/) {
        renderable3d.translateXIncremental(-0.1)
      }
    })
  }

  updateArrowFlyCtrl() {
    this.kbArrowFlyCtrlObjects.forEach(renderable3d => {
      if(this.keysDown[37] /*left arrow*/) {
        renderable3d.rotateZIncremental(0.005)
      }
      if(this.keysDown[38] /*up arrow*/) {
        renderable3d.rotateXIncremental(0.005)
      }
      if(this.keysDown[40] /*down arrow*/) {
        renderable3d.rotateXIncremental(-0.005)
      }
    })
  }

  update() { /*NOT TESTED YET*/
    this.updateWasdCtrl()
  }
   
}
