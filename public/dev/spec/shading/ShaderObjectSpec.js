describe("ShaderObject", function() {

  var myShaderObject

  beforeEach(function() {
    myShaderObject = new ShaderObject()
  })

  it("should have the parent class Plot3DObject", function() {
    expect(myShaderObject.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

})