describe("ShaderInput", function() {
  
  var myShaderInput

  beforeEach(function() {
    myShaderInput = new ShaderInput()
  })

  it("should have the parent class ShaderItem", function() {
    expect(myShaderInput.__proto__.__proto__.constructor.name).toEqual('ShaderItem')
  })

  it("should have an attribute to safe the requested gl location", function() {
    expect(myShaderInput.glLocation).toEqual(null)
  })

})