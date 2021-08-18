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

  it("should have an attribute name", function() {
    expect(myPlot3DObject.name.constructor.name).toEqual("String")
  })

  it("should provide a method to convert degree to radian", function() {
    expect(typeof myPlot3DObject.convertDegToRad).toBe("function")
  })

  describe("the method convertDegToRad", function() {

    it("should throw an error when degree is not in range between 0 and 360", function() {
      expect(function() { myPlot3DObject.convertDegToRad(-1.0) }).toThrow(new myPlot3DObject.exceptions.OutOfRange('degree value must be in range of 0 and 360'))
    })

    it("should return the correct converted radian", function() {
      expect(myPlot3DObject.convertDegToRad(0.0)).toBe(0.0)
      expect(myPlot3DObject.convertDegToRad(0)).toBe(0)
      expect(myPlot3DObject.convertDegToRad(123.123)).toBe(2.1489017349329784)
      expect(myPlot3DObject.convertDegToRad(359.9999999)).toBe(6.283185305434257)
    })
  })

  it("should have an object attribute for saving exceptions", function() {
    expect(myPlot3DObject.exceptions.constructor.name).toEqual('Object')
  })

  describe('exceptions', function() {
    it('should have an exception OutOfRange', function() {
      expect(typeof myPlot3DObject.exceptions.OutOfRange).toEqual('function')
    })
    it('should save the attributes message and name', function() {
      let myOutOfRangeException = new myPlot3DObject.exceptions.OutOfRange('hello')
      expect(myOutOfRangeException.message).toEqual('hello')
      expect(myOutOfRangeException.name).toEqual('OutOfRangeException')
    })
  })
})