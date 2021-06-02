describe("Plot3DLoader", function() {
  var myPlot3DLoader

  beforeEach(function() {
    myPlot3DLoader = new Plot3DLoader()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DLoader.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should have a list for saving the loaded data", function() {
    expect(myPlot3DLoader.data.constructor.name).toBe("Array")
  })

})