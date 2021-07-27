class Plot3DKeyboard extends Plot3DUserIO{
  constructor() {
    super()

    this.keysDown = new Array(250).fill(false)
    
    document.addEventListener('keydown', (event) => {
      this.keysDown[(event || window.event).keyCode] = true
    })

    document.addEventListener('keyup', (event) => {
      this.keysDown[(event || window.event).keyCode] = false
    })


    this.kbWasdCtrlObjects = []
 
  }

  imposeKeyDownWasdCtrlTo(renderable3dObj) {
    this.kbWasdCtrlObjects.push(renderable3dObj)
  }

  update() {
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
   
}
