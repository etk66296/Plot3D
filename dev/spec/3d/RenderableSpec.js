describe("Renderable", function() {
  var canvas = null
  var glCntxt = null
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
  })
  var myRenderable
  
  beforeEach(function() {
    myRenderable = new Renderable(glCntxt)
  })

  it("has the parent class Plot3DObject", function() {
    expect(myRenderable.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should take an instance of canvas webgl context webgl2", function() {
    expect(myRenderable.glCntxt.constructor.name).toEqual('WebGL2RenderingContext')
  })
})