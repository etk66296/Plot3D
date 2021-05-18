describe("Background", function() {
  var canvas
  var glCntxt
 
  var myBackground
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
  })

  beforeEach(function() {
    myBackground = new Background(glCntxt)
  })

  it("should has a parent class Renderable", function() {
    expect(myBackground.__proto__.__proto__.constructor.name).toEqual('Renderable')
  })

  it("should has a attribute of type vector4, which holds the clear color", function() {
    expect(myBackground.clearColor.constructor.name).toEqual('Vector4')
  })

  it("should has a method draw", function() {
    expect(typeof myBackground.draw).toEqual('function')
  })

  describe("draw", function() {
    it("should clear the screen with the defined color", function() {
      spyOn(myBackground.glCntxt, 'clear').and.callThrough()
      myBackground.draw()
      expect(myBackground.glCntxt.clear).toHaveBeenCalledTimes(2)
    })
    it("should set the viewport", function() {
      spyOn(myBackground.glCntxt, 'viewport')
      myBackground.draw()
      expect(myBackground.glCntxt.viewport).toHaveBeenCalled()
    })
    it("should set the clear color", function() {
      spyOn(myBackground.glCntxt, 'clearColor')
      myBackground.draw()
      expect(myBackground.glCntxt.clearColor).toHaveBeenCalled()
    })
  })

  it("should has a method update", function() {
    expect(typeof myBackground.update).toEqual('function')
  })

  describe("update", function() {

  })
  

})