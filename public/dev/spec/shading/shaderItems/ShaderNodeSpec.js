describe("ShaderNode", function() {
  
  var myShaderNode

  beforeEach(function() {
    myShaderNode = new ShaderNode()
  })

  it("should have the parent class ShaderItem", function() {
    expect(myShaderNode.__proto__.__proto__.constructor.name).toEqual('ShaderItem')
  })

})