describe("ShaderObject", function() {

  var myShaderObject

  beforeEach(function() {
    myShaderObject = new ShaderObject()
  })

  it("should have the parent class Plot3DObject", function() {
    expect(myShaderObject.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should take the name as the first constructor arguments", function() {
    let myTmpShaderObject = new ShaderObject('aShaderObjectName')
    expect(myTmpShaderObject.name).toEqual('aShaderObjectName')
  })

  it("should have an attribute name, which represents the variable or function name in the shader code", function() {
    expect(typeof myShaderObject.name).toBe('string')
  })

  it("should have an attribute,which assign the shader as fragment or vertex shader", function() {
    expect(myShaderObject.targetShaderType).toEqual(myShaderObject.shaderType.NONE)
  })


})