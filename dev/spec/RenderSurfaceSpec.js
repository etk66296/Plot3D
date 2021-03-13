describe("RenderSurface", function() {
  var myRenderSurface = null

  beforeEach(function() {
    myRenderSurface = new RenderSurface(document.querySelector('#idRenderSurface'))
  })

  it("must have a canvas instance", () => {
    expect(myRenderSurface.canvas).toBeInstanceOf(HTMLCanvasElement)
  })

  it("must have a web gl context instance", () => {
    expect(myRenderSurface.glContext).toBeInstanceOf(WebGLRenderingContext)
  })
  
})
