class Plot3DObject {
  constructor() {
    this.isInDebugMode = false
  }

  convertDegToRad(deg) {
    if (deg >= 0.0 && deg <= 360.0) {
      return 0.017453292519943295 * deg
    }
    console.error("parameter deg is not between 0 and 360")
    return undefined
  }

  debuglog(message) {
    if (this.isInDebugMode) {
      console.log(message)
    }
  }

}