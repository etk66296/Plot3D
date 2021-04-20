class Plot3dBase {
  constructor() {
    this.debugModeEnabled = true
  }

  degToRad(deg) {
    return Math.PI / 180 * deg
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