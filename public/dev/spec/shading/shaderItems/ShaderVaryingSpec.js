describe("ShaderVarying", function() {
  var myShaderVarying

  beforeEach(function() {
    myShaderVarying = new ShaderVarying()
  })

  it("should have the parent class ShaderOutput", function() {
    expect(myShaderVarying.__proto__.__proto__.constructor.name).toEqual('ShaderOutput')
  })
})