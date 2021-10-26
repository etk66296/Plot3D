describe("ShaderOutput", function() {
  
  var myShaderOutput

  beforeEach(function() {
    myShaderOutput = new ShaderOutput()
  })

  it("should have the parent class ShaderItem", function() {
    expect(myShaderOutput.__proto__.__proto__.constructor.name).toEqual('ShaderItem')
  })

})