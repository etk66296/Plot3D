class Plot3DKeyboard extends Plot3DUserIO{
  constructor() {
    super()

 
  }

  imposeKeyDownWasdCtrlTo(renderable3DObj) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'w') {
        renderable3DObj.translateZIncremental(0.1)
      } else if (event.key === 'a') {
        renderable3DObj.translateXIncremental(0.1)
      } else if (event.key === 's') {
        renderable3DObj.translateZIncremental(-0.1)
      } else if (event.key === 'd') {
        renderable3DObj.translateXIncremental(-0.1)
      }
    })
  }
   

}
