class Plot3DObject {
  constructor() {
    this.isInDebugMode = false
    this.EPSILON = 0.0000001
    this.exceptions = {
      OutOfRange: function(message) {
        this.message = message
        this.name = 'OutOfRangeException'
      }
    }
  }

  convertDegToRad(deg) {
    if (deg >= 0.0 && deg <= 360.0) {
      return 0.017453292519943295 * deg
    } else {
      throw new this.exceptions.OutOfRange('degree value must be in range of 0 and 360')
    }
  }

  debuglog(message) {
    if (this.isInDebugMode) {
      console.log(message)
    }
  }

}