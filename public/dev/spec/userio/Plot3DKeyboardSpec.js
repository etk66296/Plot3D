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

  it("should have a method which is called by the keydown event listener for setting the keysDown list.", function() {
    expect(typeof myPlot3DKeyboard.setKeyDown).toBe('function')
  })

  describe("setKeyDown", function() {
    it ("should set the keyDown list with the keycode as the index", function() {
      myPlot3DKeyboard.setKeyDown(87)
      expect(myPlot3DKeyboard.keysDown[87]).toBeTruthy()
    })
  })

  it("should have a method which is called by the keyup event listener for setting the keysup list.", function() {
    expect(typeof myPlot3DKeyboard.releaseKey).toBe('function')
  })

  describe("releaseKey", function() {
    it ("should set the keyDown list with the keycode as the index", function() {
      myPlot3DKeyboard.setKeyDown(87)
      expect(myPlot3DKeyboard.keysDown[87]).toBeTruthy()
      myPlot3DKeyboard.releaseKey(87)
      expect(myPlot3DKeyboard.keysDown[87]).toBeFalsy()
    })
  })

  it("should have an attribute for saving the renderable3e objects for wasd control", function() {
    expect(myPlot3DKeyboard.kbWasdCtrlObjects.constructor.name).toBe('Array')
  })

  it("should have a method injecting 'wasd' keyboard controls to Renderables3d objects.", function() {
    expect(typeof myPlot3DKeyboard.imposeKeyDownWasdCtrlTo).toBe('function')
  })

  describe("imposeKeyDownWasdCtrlTo", function() {
    it ("push the renderable3d object to the wasd keydown list", function() {
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects, 'push')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.push).toHaveBeenCalled()
    })
  })

  it("which can be called by a cycle object", function() {
    expect(typeof myPlot3DKeyboard.updateWasdCtrl).toBe('function')
  })

  describe("updateWasdCtrl", function() {
    it ("should iterate trough the kbwasd object list and translate the particular object", function() {
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects, 'forEach')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.forEach).toHaveBeenCalled()
    })

    it ("should call moveForward when the 'w' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'moveForward')
      myPlot3DKeyboard.keysDown[87] = true
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].moveForward).toHaveBeenCalledWith(0.1)
    })

    it ("should call strideLeft when the 'a' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'strideLeft')
      myPlot3DKeyboard.keysDown[65] = true
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].strideLeft).toHaveBeenCalledWith(0.1)
    })

    it ("should call moveBackward when the 's' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'moveBackward')
      myPlot3DKeyboard.keysDown[83] = true
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].moveBackward).toHaveBeenCalledWith(0.1)
    })

    it ("should call strideRight when the 'd' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects[0], 'strideRight')
      myPlot3DKeyboard.keysDown[68] = true
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects[0].strideRight).toHaveBeenCalledWith(0.1)
    })
  })

  it("should have an attribute for saving the renderable3e objects for arrow fly control", function() {
    expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects.constructor.name).toBe('Array')
  })

  it("should have a method injecting 'arrow' keyboard fly controls to Renderables3d objects.", function() {
    expect(typeof myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo).toBe('function')
  })

  describe("imposeKeyDownWasdCtrlTo", function() {
    it ("push the renderable3d object to the arrow fly keydown list", function() {
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects, 'push')
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects.push).toHaveBeenCalled()
    })
  })

  it("which can be called by a cycle object", function() {
    expect(typeof myPlot3DKeyboard.updateArrowFlyCtrl).toBe('function')
  })

  describe("updateArrowFlyCtrl", function() {
    it ("should iterate trough the arrow fly object list and rotate the particular object", function() {
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects, 'forEach')
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects.forEach).toHaveBeenCalled()
    })

    it ("should call rotModelZIncr when the 'bild up arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelZIncr')
      myPlot3DKeyboard.keysDown[33] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelZIncr).toHaveBeenCalledWith(-0.03)
    })

    it ("should call rotModelZIncr when the 'bild down arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelZIncr')
      myPlot3DKeyboard.keysDown[34] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelZIncr).toHaveBeenCalledWith(0.03)
    })

    it ("should call rotModelYIncr when the 'left arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelYIncr')
      myPlot3DKeyboard.keysDown[37] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelYIncr).toHaveBeenCalledWith(-0.03)
    })

    it ("should call rotModelXIncr when the 'up arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelXIncr')
      myPlot3DKeyboard.keysDown[38] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelXIncr).toHaveBeenCalledWith(-0.03)
    })

    it ("should call rotModelYIncr when the 'left arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelYIncr')
      myPlot3DKeyboard.keysDown[39] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelYIncr).toHaveBeenCalledWith(0.03)
    })

    it ("should call rotModelXIncr when the 'down arrow' button is down", function() {
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo(myRenderable3d)
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0], 'rotModelXIncr')
      myPlot3DKeyboard.keysDown[40] = true
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects[0].rotModelXIncr).toHaveBeenCalledWith(0.03)
    })

  })

})