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

  it("should have a list with all key states", function() {
    expect(myPlot3DKeyboard.keysDown.constructor.name).toEqual('Array')
  })

  it("should have a method for imposing Renderable3D objects keyboard 'wasd' control", function() {
    expect(typeof myPlot3DKeyboard.imposeKeyDownWasdCtrlTo).toBe('function')
  })

  it("should add a document keydown event to the window", function() {
    spyOn(document, 'addEventListener')
    new Plot3DKeyboard()
    expect(document.addEventListener).toHaveBeenCalledTimes(2)
  })

  it("should add keydown event listener", function() {
    
  })

  describe("imposeKeyDownWasdCtrlTo", function() {
    it ("push the renderable3d object to the wasd keydown list", function() {
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects, 'push')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.push).toHaveBeenCalled()
    })
  })

  it("which can be called by a cycle object", function() {
    expect(typeof myPlot3DKeyboard.update).toBe('function')
  })

  describe("update", function() {
    it ("should iteerate trough the kbwasd object list and translate the particular object", function() {
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects, 'forEach')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      myPlot3DKeyboard.update()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.forEach).toHaveBeenCalled()
    })

    it ("should call translateZIncremental when the 'w' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'translateZIncremental')
      myPlot3DKeyboard.keysDown[87] = true
      myPlot3DKeyboard.update()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].translateZIncremental).toHaveBeenCalledWith(0.1)
    })

    it ("should call translateZIncremental when the 'a' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'translateXIncremental')
      myPlot3DKeyboard.keysDown[65] = true
      myPlot3DKeyboard.update()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].translateXIncremental).toHaveBeenCalledWith(0.1)
    })

    it ("should call translateZIncremental when the 's' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'translateZIncremental')
      myPlot3DKeyboard.keysDown[83] = true
      myPlot3DKeyboard.update()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].translateZIncremental).toHaveBeenCalledWith(-0.1)
    })

    it ("should call translateZIncremental when the 'd' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'translateXIncremental')
      myPlot3DKeyboard.keysDown[68] = true
      myPlot3DKeyboard.update()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].translateXIncremental).toHaveBeenCalledWith(-0.1)
    })
  })

})