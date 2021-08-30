describe("Plot3DKeyboard", function() {

  var canvas
  var glCntxt

  var myPlot3DKeyboard

  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
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
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo({})
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.push).toHaveBeenCalled()
    })
  })

  it("which can be called by a cycle object", function() {
    expect(typeof myPlot3DKeyboard.updateWasdCtrl).toBe('function')
  })

  describe("updateWasdCtrl", function() {
    it ("should iterate trough the kbwasd object list and translate the particular object", function() {
      spyOn(myPlot3DKeyboard.kbWasdCtrlObjects, 'forEach')
      myPlot3DKeyboard.imposeKeyDownWasdCtrlTo({})
      myPlot3DKeyboard.updateWasdCtrl()
      expect(myPlot3DKeyboard.kbWasdCtrlObjects.forEach).toHaveBeenCalled()
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
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo({})
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects.push).toHaveBeenCalled()
    })
  })

  it("which can be called by a cycle object", function() {
    expect(typeof myPlot3DKeyboard.updateArrowFlyCtrl).toBe('function')
  })

  describe("updateArrowFlyCtrl", function() {
    it ("should iterate trough the arrow fly object list and rotate the particular object", function() {
      spyOn(myPlot3DKeyboard.kbArrowFlyCtrlObjects, 'forEach')
      myPlot3DKeyboard.imposeKeyDownArrowFlyCtrlTo({})
      myPlot3DKeyboard.updateArrowFlyCtrl()
      expect(myPlot3DKeyboard.kbArrowFlyCtrlObjects.forEach).toHaveBeenCalled()
    })


  })

})