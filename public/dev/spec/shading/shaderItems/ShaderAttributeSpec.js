describe("ShaderAttribute", function() {
  var myShaderAttribute

  beforeEach(function() {
    myShaderAttribute = new ShaderAttribute()
  })

  it("should have the parent class ShaderInput", function() {
    expect(myShaderAttribute.__proto__.__proto__.constructor.name).toEqual('ShaderInput')
  })

})