describe("ShaderInput", function() {
  
  var myShaderInput

  beforeEach(function() {
    myShaderInput = new ShaderInput()
  })

  it("should have the parent class ShaderItem", function() {
    expect(myShaderInput.__proto__.__proto__.constructor.name).toEqual('ShaderItem')
  })

})