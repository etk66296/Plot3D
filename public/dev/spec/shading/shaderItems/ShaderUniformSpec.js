describe("ShaderUnifrom", function() {
  var myShaderUnifrom

  beforeEach(function() {
    myShaderUnifrom = new ShaderUnifrom()
  })

  it("should have the parent class ShaderInput", function() {
    expect(myShaderUnifrom.__proto__.__proto__.constructor.name).toEqual('ShaderInput')
  })
})