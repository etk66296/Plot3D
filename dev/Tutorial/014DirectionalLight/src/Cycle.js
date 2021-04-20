class Cylce extends Plot3dBase {
  constructor(renderObjectList = [], runInstantly = true) {
    super()

    this.isStopped = !runInstantly

    this.renderObjectList = renderObjectList
    this.fps = 60

    this.ticks = 0

    this.intervalFunction = null
    if (!this.isStopped) {
      this.intervalFunction = this.interval(this.update, 1000 / this.fps)
    }
  }

  add(renderObject) {
    this.renderObjectList.push(renderObject)
  }

  stop() {
    this.ticks = 0
    this.isStopped = true
    this.intervalFunction = null
  }

  pause() {
    this.isStopped = true
  }

  play() {
    this.isStopped = true
    this.intervalFunction = this.interval(this.update, 1000 / this.fps)
    this.isStopped = false
  }

  setFrameRate(framesPerSecond) {
    this.fps = framesPerSecond
  }

  interval(func, wait, times) {
    var interv = ((w, t) => {
      return () => {
        if (typeof t === 'undefined' || t-- > 0) {
          if (!this.isStopped) {
            setTimeout(interv, w)
            try {
              this.ticks++
              func.call(this)
            }
            catch (e){
              t = 0
              throw e.toString()
            }
          }
        }
      }
    })(wait, times)
    setTimeout(interv, wait)
  }

  update() {
    // this.debugLog(this.ticks)
    if (this.renderObjectList.length > 0) {
      this.renderObjectList.forEach((renderObject) => {
        renderObject.update()
        renderObject.draw()
      })
    }
  }
}