class Cycle extends Plot3DObject {
  constructor(clycleInstantly = true) {
    super()

    this.isCycling = clycleInstantly
    this.tickCount = 0

    this.renderObjectList = []
    this.fps = 1

    this.tickRunner = null
    if (this.isCycling) {
      this.tickRunner = this.tick(this.update, 1000 / this.fps)
    }
  }

  addRenderable(object) {
    this.renderObjectList.push(object)
  }

  stop() {
    this.tickCount = 0
    this.isCycling = false
    this.tickRunner = null
  }

  pause() {
    this.isCycling = false
  }

  play() {
    this.isCycling = false
    this.tickRunner = this.tick(this.update, 1000 / this.fps)
    this.isCycling = true
  }

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
    this.renderObjectList.forEach(renderable => {
      renderable.update()
      renderable.draw()
    })
  }
}