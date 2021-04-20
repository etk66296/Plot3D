describe("Plot3DObject", function() {
  var myPlot3DObject

  beforeEach(function() {
    myPlot3DObject = new Plot3DObject()
    spyOn(console, 'error')
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