class Plot3DObject {
  constructor() {
    this.debugModeEnabled = true
  }

  convertDegToRad(deg) {
    if (deg >= 0.0 && deg <= 360.0) {
      return 0.017453292519943295 * deg
    }
    console.error("parameter deg is not between 0 and 360")
    return undefined
  }

  debugLog(message) {
    if (this.debugModeEnabled) {
      if (message instanceof Array) {
        message.forEach( (messageItem) => {
          if (String(messageItem) !== '') {
            console.log(messageItem)
          }
        })
      } else {
        if (String(message) !== '') {
          console.log(String(message))
        }
      }
    }
  }

  errorLog(message) {
    if (message instanceof Array) {
      message.forEach( (messageItem) => {
        if (String(messageItem) !== '') {
          console.error(messageItem)
        }
      })
    } else {
      if (String(message) !== '') {
        console.error(String(message))
      }
    }
  }
}