describe("Plot3DFactory", function() {
  var myPlot3DFactory

  beforeEach(function() {
    myPlot3DFactory = new Plot3DFactory()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DFactory.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

})