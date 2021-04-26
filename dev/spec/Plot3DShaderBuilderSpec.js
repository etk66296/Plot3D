describe("Plot3DShaderBuilder", function() {
  var myPlot3DShaderBuilder

  beforeEach(function() {
    myPlot3DShaderBuilder = new Plot3DShaderBuilder()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DShaderBuilder.__proto__.__proto__.constructor.name).toEqual('Plot3DBuilder')
  })

  it("should has an counter for giving each shader an unique id", function() {
    expect(myPlot3DShaderBuilder.numberOfCompiledShaders).toEqual(0)
  })

})