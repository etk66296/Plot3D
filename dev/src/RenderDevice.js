class RenderDevice extends PlotterObject {
  constructor(glCntxt, buffers) {
    super()
    this.glCntxt = glCntxt
    
    this.buffers = buffers

    this.fps = 1
    this.interval(this.update, 1000 / this.fps)
  }

  interval(func, wait, times) {
    var interv = ((w, t) => {
      return () => {
        if (typeof t === 'undefined' || t-- > 0) {
          setTimeout(interv, w)
          try {
            if (!this.pauseInterval) {
              func.call(this)
            }
          }
          catch (e){
            t = 0
            throw e.toString()
          }
        }
      }
    })(wait, times)
    setTimeout(interv, wait)
  }

  update() {
    this.debugLog('draw scene')
    this.draw()
  }

  draw() {
    
    this.glCntxt.clearColor(0.0, 0.0, 0.0, 1.0)
    this.glCntxt.clearDepth(1.0)
    this.glCntxt.enable(this.glCntxt.DEPTH_TEST)
    this.glCntxt.depthFunc(this.glCntxt.LEQUAL)
    this.glCntxt.clear(this.glCntxt.COLOR_BUFFER_BIT | this.glCntxt.DEPTH_BUFFER_BIT)


    this.buffers.forEach( buffer => {
      buffer.draw()
    })
  }
}