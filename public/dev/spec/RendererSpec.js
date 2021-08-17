describe("Renderer", function() {
  var myRenderer
  
  beforeAll(function() {
  })

  beforeEach(function() {
    myRenderer = new Renderer()
  })
  
  it("has the parent class Plot3DObject", function() {
    expect(myRenderer.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should have an object for renderables", function() {
    expect(myRenderer.renderables.constructor.name).toEqual('Object')
  })

  describe('renderables', function() {
    it('should have an array for camera renderables', function() {
      expect(myRenderer.renderables.cameras.constructor.name).toEqual('Array')
    })
    it('should have an array for drawing renderables', function() {
      expect(myRenderer.renderables.drawings.constructor.name).toEqual('Array')
    })
  })

})