describe("ShaderItem", function() {

  var myShaderItem

  beforeEach(function() {
    myShaderItem = new ShaderItem()
  })

  it("should have the parent class Plot3DObject", function() {
    expect(myShaderItem.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  // void; bool; int; float;
  // vec2; vec3; vec4; bvec2; bvec3; bvec4; ivec2; ivec3; ivec4;
  // mat2; mat3; mat4;
  // sampler2D; samplerCube

  it("should have a string attribute which defines the data type of the item", function() {
    let tmpShaderItem = new ShaderItem('mat4')
    expect(tmpShaderItem.type).toEqual('mat4')
  })

})