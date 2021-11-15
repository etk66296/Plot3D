describe("Plot3DScene", function() {
  var myPlot3DScene

  beforeEach(function() {
    myPlot3DScene = new Plot3DScene()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DScene.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

})