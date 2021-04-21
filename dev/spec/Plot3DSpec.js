describe("Plot3D", function() {
  var myPlot3D

  beforeEach(function() {
    myPlot3D = new Plot3D()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3D.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })
})