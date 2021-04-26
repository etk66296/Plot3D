describe("Plot3DBuilder", function() {
  var myPlot3DBuilder

  beforeEach(function() {
    myPlot3DBuilder = new Plot3DBuilder()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DBuilder.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

})