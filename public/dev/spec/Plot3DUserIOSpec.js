describe("Plot3DUserIO", function() {
  var myPlot3DUserIO

  beforeEach(function() {
    myPlot3DUserIO = new Plot3DUserIO()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DUserIO.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("has a function update", function() {
    expect(typeof myPlot3DUserIO.update).toBe('function')
  })

})