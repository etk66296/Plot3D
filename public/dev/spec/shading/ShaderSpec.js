describe("Plot3DShader", function() {
  var myPlot3DShader

  beforeEach(function() {
    myPlot3DShader = new Plot3DShader()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myPlot3DShader.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("should have an attribute vertexShaderCode of type string", function() {
    expect(typeof myPlot3DShader.vertexShaderCode).toEqual('string')
  })
  it("should have an attribute fragmentShaderCode of type string", function() {
    expect(typeof myPlot3DShader.fragmentShaderCode).toEqual('string')
  })

  it("should have an object inputs which holds all shader input nodes", function() {
    expect(typeof myPlot3DShader.inputs).toBe('object')
  })

  describe("inputs", function() {
    it("should have an attribute vertexUniformList of type array", function() {
      expect(myPlot3DShader.inputs.vertexUniformList.constructor.name).toEqual('Array')
    })
  
    it("should have an attribute fragmentUniformList of type array", function() {
      expect(myPlot3DShader.inputs.fragmentUniformList.constructor.name).toEqual('Array')
    })
  
    it("should have an attribute attributeList of type array", function() {
      expect(myPlot3DShader.inputs.attributeList.constructor.name).toEqual('Array')
    })
  })

  it("should have an attribute program which is null", function() {
    expect(myPlot3DShader.program).toEqual(null)
  })

  it("should have an attribute name of type string", function() {
    expect(typeof myPlot3DShader.name).toEqual('string')
  })

  it("should have an attribute glVertexShader object of type WebGLShader", function() {
    expect(myPlot3DShader.glVertexShader).toEqual(null)
  })

  it("should have an attribute glFragmentShader object of type WebGLShader", function() {
    expect(myPlot3DShader.glFragmentShader).toEqual(null)
  })

  it("should have an object shaderAttrLocation", function() {
    expect(typeof myPlot3DShader.glAttrLocation).toEqual('object')
  })

  it("should have an object shaderVertexUniformLocation", function() {
    expect(typeof myPlot3DShader.glVertexUniformLocation).toEqual('object')
  })

  it("should have an object shaderFragmentUniformLocation", function() {
    expect(typeof myPlot3DShader.glFragmentUniformLocation).toEqual('object')
  })

  it("should have a function for adding a uniform to the vertex shader", function() {
    expect(typeof myPlot3DShader.addMat4Uniform).toEqual('function')
  })

})