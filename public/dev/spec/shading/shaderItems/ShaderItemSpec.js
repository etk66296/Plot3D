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
    let tmpShaderItem = new ShaderItem('mat4', 'myMat4')
    expect(tmpShaderItem.type).toEqual('mat4')
  })

  it("should have a string attribute which identifies the item in the shader code", function() {
    let tmpShaderItem = new ShaderItem('mat4', 'myMat4')
    expect(tmpShaderItem.identifier).toEqual('myMat4')
  })

  it("should have an attribute,which assign the shader as fragment of vertex shader", function() {
    expect(myShaderItem.targetShaderType).toEqual('')
  })

  it("should have a function for concatenate the code line", function() {
    expect(typeof   myShaderItem.concat).toBe('function')
  })

  describe("concat", function() {
    it("should return the object appropriate glsl code line", function() {
      let tmpShaderItem = new ShaderItem('mat4', 'myMat4')
      expect(tmpShaderItem.concat()).toEqual('mat4 myMat4;')
    })
  })

})