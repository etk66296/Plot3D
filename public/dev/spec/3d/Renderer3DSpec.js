describe("Renderer3D", function() {
  var myRenderer3D
  
  beforeAll(function() {
  })

  beforeEach(function() {    
    myRenderer3D = new Renderer3D()

  })

  it("should have the parent class Renderable3D", function() {
    expect(myRenderer3D.__proto__.__proto__.constructor.name).toEqual('Renderer')
  })

  it("should have a method for adding renderable3d objects to the renderables array", function() {
    expect(typeof myRenderer3D.addRenderable3D).toEqual('function')
  })

})