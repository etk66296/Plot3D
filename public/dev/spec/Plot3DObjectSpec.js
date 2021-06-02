describe("Plot3DObject", function() {
  var myPlot3DObject

  beforeEach(function() {
    myPlot3DObject = new Plot3DObject()
    spyOn(console, 'error')
    spyOn(console, 'log')
  })

  it("has an attribute isInDebugMode", function() {
    expect(myPlot3DObject.isInDebugMode).toBeFalsy()
  })

  

  it("should provide a method debuglog", function() {
    expect(typeof myPlot3DObject.debuglog).toBe("function")
  })

  describe("the method debuglog", function() {
    it ("should not log message if the attribute isInDebugMode is falsy", function() {
      myPlot3DObject.debuglog("message")
      expect(console.log).not.toHaveBeenCalled()
    })
    it ("should log message if the attribute isInDebugMode is truthy", function() {
      myPlot3DObject.isInDebugMode = true
      myPlot3DObject.debuglog("message")
      expect(console.log).toHaveBeenCalled()
    })
  })

  it("should provide a method to convert degree to radian", function() {
    expect(typeof myPlot3DObject.convertDegToRad).toBe("function")
  })

  describe("the method convertDegToRad", function() {
    it("should return 'undefined' with values not between 0 and 360", function() {
      expect(myPlot3DObject.convertDegToRad(-0.1)).toBe(undefined)
      expect(myPlot3DObject.convertDegToRad(360.1)).toBe(undefined)
    })
    it("should call console.error with values not between 0 and 360", function() {
      expect(myPlot3DObject.convertDegToRad(-1)).toBe(undefined)
      expect(console.error).toHaveBeenCalled()
    })
    it("should return the correct converted radian", function() {
      expect(myPlot3DObject.convertDegToRad(0.0)).toBe(0.0)
      expect(myPlot3DObject.convertDegToRad(0)).toBe(0)
      expect(myPlot3DObject.convertDegToRad(123.123)).toBe(2.1489017349329784)
      expect(myPlot3DObject.convertDegToRad(359.9999999)).toBe(6.283185305434257)
    })
  })
})