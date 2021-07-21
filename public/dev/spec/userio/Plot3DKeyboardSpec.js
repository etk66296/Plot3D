describe("Plot3DKeyboard", function() {


  var myPlot3DKeyboard

  beforeAll(function() {
    
  })

  beforeEach(function() {
    myPlot3DKeyboard = new Plot3DKeyboard()
  })

  it("has the parent class Plot3DUserIO", function() {
    expect(myPlot3DKeyboard.__proto__.__proto__.constructor.name).toEqual('Plot3DUserIO')
  })

})