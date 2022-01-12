class NeedleClock {
  constructor(scale = 1.0, position = { x: 0, y: 0 }) {
    this.position = position
    this.scale = scale
    this.edgeLenInPixel = 100 * scale
    this.clockFrame = new Svg()
    this.clockFrame.node.setAttribute('width', this.edgeLenInPixel)
    this.clockFrame.node.setAttribute('height', this.edgeLenInPixel)

    this.clockCenter = Math.floor(this.edgeLenInPixel * 0.5)

    this.secondsNeedle = new Rect({ x: this.clockCenter - 1, y: this.clockCenter, width: 2 * this.scale, height: 49 * this.scale, fill:'#ff00ff' })
    this.clockFrame.appendChild(this.secondsNeedle)
    this.minutesNeedle = new Rect({ x: this.clockCenter - 2, y: this.clockCenter, width: 4 * this.scale, height: 40 * this.scale, fill:'#ff0033' })
    this.clockFrame.appendChild(this.minutesNeedle)
    this.hoursNeedle = new Rect({ x: this.clockCenter - 3, y: this.clockCenter, width: 6 * this.scale, height: 30 * this.scale, fill:'#3300ff' })
    this.clockFrame.appendChild(this.hoursNeedle)


    this.clockFace = []
    for(let i = 0; i <= 2 * Math.PI; i += (2 * Math.PI) / 60) {
      this.clockFace.push(
        new Rect({ x: this.clockCenter - 1 * this.scale, y: this.clockCenter - 1 * this.scale, width: 2 * this.scale, height: 2 * this.scale, fill:'#888888' })
      )
      let x = Math.sin(i) * this.edgeLenInPixel * 0.48
      let y = Math.cos(i) * this.edgeLenInPixel * 0.48
      this.clockFace[this.clockFace.length - 1].translate(x, y)
      
      this.clockFrame.appendChild(this.clockFace[this.clockFace.length - 1])

      // this.clockFace[this.clockFace.length - 1].rotateAndTranslate(i, x, y)
      // this.clockFace[this.clockFace.length - 1].rotate(i)
      // this.clockFace[this.clockFace.length - 1].translate(x, y)
    }

    setInterval(() => {
      this.update()
    }, 500)

  }

  rotateSecondsNeedle(angle) {
    this.secondsNeedle.rotate(angle, this.clockCenter, this.clockCenter)
  }

  rotateMinutesNeedle(angle) {
    this.minutesNeedle.rotate(angle, this.clockCenter, this.clockCenter)
  }

  rotateHoursNeedle(angle) {
    this.hoursNeedle.rotate(angle, this.clockCenter, this.clockCenter)
  }

  update() {
    let time = new Date()
    this.rotateSecondsNeedle(360 * 0.0167 * time.getSeconds() + 180)
    this.rotateMinutesNeedle(360 * 0.0167 * time.getMinutes() + 180)
    this.rotateHoursNeedle(15 * 0.0167 * time.getMinutes() + 180 * 0.0417 * time.getHours())
  }

  appendTo(htmlElement) {
    document.getElementById(htmlElement).appendChild(this.clockFrame.node)
  }
}
