describe("Plot3DKeyboard", function() {

  var canvas
  var glCntxt
  var myRenderable3d

  var myPlot3DKeyboard

  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    myRenderable3d = new Renderable3D(glCntxt, {}, {})
  })

  beforeEach(function() {
    myPlot3DKeyboard = new Plot3DKeyboard()
  })

  it("has the parent class Plot3DUserIO", function() {
    expect(myPlot3DKeyboard.__proto__.__proto__.constructor.name).toEqual('Plot3DUserIO')
  })

  it("should have a method for imposing Renderable3D objects keyboard 'wasd' control", function() {
    expect(typeof myPlot3DKeyboard.imposeKeyDownWasdCtrlTo).toBe('function')
  })

  describe("imposeKeyDownWasdCtrlTo", function() {
    it ("should add four event listeners to the document", function() {
      spyOn(document, 'addEventListener')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      expect(document.addEventListener).toHaveBeenCalled()
    })
  })

})