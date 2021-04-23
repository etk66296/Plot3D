class Cycle extends Plot3DObject {
  constructor(clycleInstantly = true) {
    super()

    this.isCycling = clycleInstantly
    this.tickCount = 0

    // this.renderObjectList = renderObjectList
    this.fps = 60

    // this.ticks = 0

    this.tickRunner = null
    if (this.isCycling) {
      this.tickRunner = this.tick(this.update, 1000 / this.fps)
    }
  }

  // add(renderObject) {
  //   this.renderObjectList.push(renderObject)
  // }

  // stop() {
  //   this.ticks = 0
  //   this.isStopped = true
  //   this.intervalFunction = null
  // }

  // pause() {
  //   this.isStopped = true
  // }

  // play() {
  //   this.isStopped = true
  //   this.intervalFunction = this.interval(this.update, 1000 / this.fps)
  //   this.isStopped = false
  // }

  // setFrameRate(framesPerSecond) {
  //   this.fps = framesPerSecond
  // }

  tick(func, wait, times) {
    var cycle = ((w, t) => {
      return () => {
        if (typeof t === 'undefined' || t-- > 0) {
          if (this.isCycling) {
            setTimeout(cycle, w)
            try {
              this.tickCount++
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
    setTimeout(cycle, wait)
  }

  update() {
    console.log('cycle')
  }
}