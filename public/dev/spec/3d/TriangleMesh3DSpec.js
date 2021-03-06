describe("TriangleMesh3D", function() {
  var canvas
  var glCntxt
  var myPlot3DShaderBuilder
  var math
  
  var myTriangleMesh
  var shader
  
  beforeAll(function() {
    canvas = document.getElementById("renderCanvas")
    glCntxt = canvas.getContext("webgl2")
    math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }
    myPlot3DShaderBuilder = new Plot3DShaderBuilder(glCntxt)
  })

  beforeEach(function() {
    let vertexShaderCode = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec4 a_color;

      uniform mat4 u_modelMatrix;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_cameraModelMatrix;
      uniform mat4 u_cameraTranslationMatrix;
      uniform mat4 u_WorldToViewMatrix;
      uniform mat4 u_ViewToProjectionMatrix;

      varying lowp vec4 v_color;

      void main(void) {
        gl_Position = u_ViewToProjectionMatrix * u_cameraTranslationMatrix * u_cameraModelMatrix * u_WorldToViewMatrix * u_modelToWorldMatrix * u_modelMatrix * vec4(a_position, 1.0);
        v_color = a_color;
      }
    `
    let fragmentShaderCode = `
      precision mediump float;

      varying lowp vec4 v_color;

      void main(void) {
        gl_FragColor = v_color;
      }
    `
    shader = myPlot3DShaderBuilder.buildShader(vertexShaderCode, fragmentShaderCode)
    myTriangleMesh = new TriangleMesh3D(glCntxt, shader, math)
  })
  
  it("has the parent class Renderable", function() {
    expect(myTriangleMesh.__proto__.__proto__.constructor.name).toEqual('Renderable3D')
  })

  it("should append the exception message ShaderAttributeNotFound", function() {
    expect(typeof myTriangleMesh.exceptions.ShaderAttributeNotFound).toEqual('function')
  })

  describe('exceptions.ShaderAttributeNotFound', function() {
    var  myShaderAttributeNotFound

    beforeEach(function() {
      myShaderAttributeNotFound = new myTriangleMesh.exceptions.ShaderAttributeNotFound('blablba')
    })

    it("should have an attribute message, which is passed by the function parameter", function() {
      expect(myShaderAttributeNotFound.message).toEqual('blablba')
    })

    it("should have an attribute name", function() {
      expect(myShaderAttributeNotFound.name).toEqual('ShaderAttributeNotFound')
    })

  })

  it("should have a list of web gl buffer objects for the vertices buffers", function() {
    myTriangleMesh.glVerticesBuffers.forEach((buffer) => {
      expect(buffer.constructor.name).toEqual('WebGLBuffer')
    })
  })

  it("should have a list of arrays for the vertices position data", function() {
    myTriangleMesh.primitivesVertices.forEach((vertices) => {
      expect(vertices.constructor.name).toEqual('Float32Array')
    })
  })

  it("should have a list of web gl buffer objects for the normals buffers", function() {
    myTriangleMesh.glNormalsBuffers.forEach((buffer) => {
      expect(buffer.constructor.name).toEqual('WebGLBuffer')
    })
  })

  it("should have a list of arrays for the normals direction data", function() {
    myTriangleMesh.primitivesNormals.forEach((normals) => {
      expect(normals.constructor.name).toEqual('Float32Array')
    })
  })

  it("should have a list of web gl buffer objects for the indices buffers", function() {
    myTriangleMesh.glIndicesBuffers.forEach((buffer) => {
      expect(buffer.constructor.name).toEqual('WebGLBuffer')
    })
  })

  it("should have a list of arrays for the indices data", function() {
    myTriangleMesh.primitivesIndices.forEach((indices) => {
      expect(indices.constructor.name).toEqual('Uint16Array')
    })
  })


  it("should throw an error when the shader does not provide the vertex position attribute", function() {
    let tmpVertexShaderCode = `
      attribute vec3 a_normal;
      attribute vec4 a_color;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_modelMatrix;
      void main(void) {
      }
    `
    let tmpFragmentShaderCode = `
      void main(void) {
      }
    `
    let tmpShader = myPlot3DShaderBuilder.buildShader(tmpVertexShaderCode, tmpFragmentShaderCode)
    expect(function() { new TriangleMesh3D(glCntxt, tmpShader, math) }).toThrow()
  })

  it("should throw an error when the shader does not provide the normals attribute", function() {
    let tmpVertexShaderCode = `
      attribute vec4 a_color;
      attribute vec3 a_position;
      uniform mat4 u_modelToWorldMatrix;
      uniform mat4 u_modelMatrix;
      void main(void) {
      }
    `
    let tmpFragmentShaderCode = `
      void main(void) {
      }
    `
    let tmpShader = myPlot3DShaderBuilder.buildShader(tmpVertexShaderCode, tmpFragmentShaderCode)
    expect(function() { new TriangleMesh3D(glCntxt, tmpShader, math) }).toThrow()
  })

  it("should have a method update", function() {
    expect(typeof myTriangleMesh.update).toEqual('function')
  })

  it("should have a 4x4 model 'modelMatrix', which is initialy the identity matrix", function() {
    expect(myTriangleMesh.modelMatrix.constructor.name).toEqual('Matrix4x4')
    expect(myTriangleMesh.modelMatrix.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

  describe("update", function() {
    
    it("should set the model matrix uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myTriangleMesh.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(shader.glVertexUniformLocation['u_modelMatrix'], false, myTriangleMesh.modelMatrix.cells)
    })

    it("should set the model to world matrix uniform", function() {
      spyOn(glCntxt, 'uniformMatrix4fv')
      myTriangleMesh.modelToWorldMatrix.cells[10] = 12
      myTriangleMesh.update()
      expect(glCntxt.uniformMatrix4fv).toHaveBeenCalledWith(shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, myTriangleMesh.modelToWorldMatrix.cells)
    })

  })

  it("should have a method draw", function() {
    expect(typeof myTriangleMesh.draw).toEqual('function')
  })

  describe("draw", function() {

    it("should loop trough all primitives", function() {
      spyOn(myTriangleMesh.meshData, 'forEach')
      myTriangleMesh.draw()
      expect(myTriangleMesh.meshData.forEach).toHaveBeenCalled()
    })


    it("should enable vertex attribute array for the a_position shader attribute", function() {
      spyOn(glCntxt, 'enableVertexAttribArray')
      myTriangleMesh.draw()
      expect(glCntxt.enableVertexAttribArray).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_position'])
    })

    it("should bind buffer for the vertex data array", function() {
      spyOn(glCntxt, 'bindBuffer')
      myTriangleMesh.draw()
      expect(glCntxt.bindBuffer).toHaveBeenCalledWith(glCntxt.ARRAY_BUFFER, myTriangleMesh.glVerticesBuffers[0])
    })

    it("should configure the vertex attribute pointer", function() {
      spyOn(glCntxt, 'vertexAttribPointer')
      myTriangleMesh.draw()
      expect(glCntxt.vertexAttribPointer).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_position'],
        3,
        glCntxt.FLOAT,
        false,
        0,
        0)
    })


    it("should enable normals attribute array for the a_normal shader attribute", function() {
      spyOn(glCntxt, 'enableVertexAttribArray')
      myTriangleMesh.draw()
      expect(glCntxt.enableVertexAttribArray).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_normal'])
    })

    it("should bind buffer for the normal data array", function() {
      spyOn(glCntxt, 'bindBuffer')
      myTriangleMesh.draw()
      expect(glCntxt.bindBuffer).toHaveBeenCalledWith(glCntxt.ARRAY_BUFFER, myTriangleMesh.glNormalsBuffers[0])
    })

    it("should configure the normal attribute pointer", function() {
      spyOn(glCntxt, 'vertexAttribPointer')
      myTriangleMesh.draw()
      expect(glCntxt.vertexAttribPointer).toHaveBeenCalledWith(myTriangleMesh.shader.glAttrLocation['a_normal'],
        3,
        glCntxt.FLOAT,
        false,
        0,
        0)
    })

    it("should bind the element array buffer with the indices", function() {
      spyOn(glCntxt, 'bindBuffer')
      myTriangleMesh.draw()
      expect(glCntxt.bindBuffer).toHaveBeenCalledWith(glCntxt.ELEMENT_ARRAY_BUFFER, myTriangleMesh.glIndicesBuffers[0])
    })

    it("should draw the defined elements", function() {
      spyOn(glCntxt, 'drawElements')
      myTriangleMesh.draw()
      expect(glCntxt.drawElements).toHaveBeenCalledWith(glCntxt.TRIANGLES, myTriangleMesh.primitivesIndices[0].length, glCntxt.UNSIGNED_SHORT, 0)
    })
  })

})