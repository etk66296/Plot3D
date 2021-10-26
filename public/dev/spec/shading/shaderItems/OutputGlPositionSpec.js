describe("GlPosition", function() {

  var myGlOutput

  beforeEach(function() {
    myGlOutput = new GlPosition()
  })

  it("should have the parent class ShaderOutput", function() {
    expect(myGlOutput.__proto__.__proto__.constructor.name).toEqual('ShaderOutput')
  })

})