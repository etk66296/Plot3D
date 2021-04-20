class VertexGroup3d extends Plot3dBase {
  constructor(
    glCntxt,
    shader,
    matrixMath4x4,
    camera,
    colorUniformKey,
    posAttributeKey,
    matrixUniformKey,
    color4fv = [],
    vertices3fv = [],
    normals3fv = []
  ) {
    super()
  

    this.posAttributeKey = posAttributeKey
    this.normalsAttributeKey = 'a_normal'

    this.glCntxt = glCntxt
    this.shader = shader
    this.matrixMath4x4 = matrixMath4x4
    this.camera = camera

    this.colorUniformKey = colorUniformKey
    this.reverseLightDirectionUniformKey = 'u_reverseLightDirection'
    this.matrixUniformKey = matrixUniformKey

    this.position = { x: 0.0, y: 0.0, z: 0.0 }

    this.widthFactor = this.glCntxt.canvas.clientWidth
    this.heightFactor = this.glCntxt.canvas.clientHeight
    this.aspect = this.widthFactor / this.heightFactor
    this.near = 1
    this.far = 2000

    this.fieldOfViewInRadians = this.degToRad(120)

    this.fieldOfViewFactor = Math.tan(Math.PI * 0.5 - 0.5 * this.fieldOfViewInRadians)
    this.rangeInverted = 1.0 / (this.near - this.far)

    this.orthoProjectionMatrix = [
      this.fieldOfViewFactor / this.aspect, 0.0, 0.0, 0.0,
      0.0, this.fieldOfViewFactor, 0.0, 0.0,
      0.0, 0.0, (this.near + this.far) * this.rangeInverted, -1.0,
      0.0, 0.0, this.near * this.far * this.rangeInverted * 2, 0.0
    ]

    this.position = { x: 0.0, y: 0.0, z: 0.0 }
    this.translation = { x: 0.0, y: 0.0, z: 0.0 }
    this.angle = { x: 0.3, y: 0.4, z: 0.1 }
    this.scale = { x: 1.0, y: 1.0, z: 1.0 }
    
    this.translationScaleMatrix = [
      this.scale.x,                        0.0,                  0.0, 0.0,
      0.0,                        this.scale.y,                  0.0, 0.0,
      0.0,                                 0.0,         this.scale.z, 0.0,
      this.translation.x,   this.translation.y,   this.translation.z, 1.0
    ]

    this.xRotationMatrix = [
      1.0,                             0.0,                    0.0, 0.0,
      0.0,          Math.cos(this.angle.x), Math.sin(this.angle.x), 0.0,
      0.0, (-1.0) * Math.sin(this.angle.x), Math.cos(this.angle.x), 0.0,
      0.0,                             0.0,                    0.0, 1.0
    ]
    this.yRotationMatrix = [
      Math.cos(this.angle.y), 0.0, (-1.0) * Math.sin(this.angle.y), 0.0,
      0.0,                    1.0,                             0.0, 0.0,
      Math.sin(this.angle.y), 0.0,          Math.cos(this.angle.y), 0.0,
      0.0,                    0.0,                             0.0, 1.0
    ]
    this.zRotationMatrix =  [
      Math.cos(this.angle.y), Math.sin(this.angle.y), 0.0, 0.0,
      (-1.0) * Math.sin(this.angle.y), Math.cos(this.angle.y), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]

    this.worldMatrix = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.yRotationMatrix)
    this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.orthoProjectionMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.translationScaleMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.xRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.yRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.zRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.camera.matrix)
    this.dir = { x: 1.0, y: 1.0, z: 1.0 }

    this.color4fv = color4fv

    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)

    this.posAttributeKey = posAttributeKey
    
    this.vertices3fv = vertices3fv
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.vertices3fv), glCntxt.STATIC_DRAW)


    this.glNormalsBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glNormalsBuffer)
    this.normals3fv = normals3fv
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.normals3fv), glCntxt.STATIC_DRAW)

    this.bufferCfg = new BufferConfiguration(this.glCntxt)
    this.bufferCfg.setBlockSize(3)
    this.bufferCfg.setElementCount(vertices3fv.length / this.bufferCfg.blockSize)

    this.vectorMath = new VectorMath3x1()
    this.directionalLightVector = [ 0.5, 0.7, 1.0 ]
    this.directionalLightVector = this.vectorMath.normalize(this.directionalLightVector, this.directionalLightVector)
  }

  setTranslation(x = 0, y = 0, z = 0) {
    this.translation.x = x
    this.translation.y = y
    this.translation.z = z
    this.translationScaleMatrix[12] = this.translation.x
    this.translationScaleMatrix[13] = this.translation.y
    this.translationScaleMatrix[14] = this.translation.z

    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.translationScaleMatrix)  
  }

  setRotation(x = 0, y = 0, z = 0) {
    this.angle.x = x
    this.xRotationMatrix[5] = Math.cos(this.angle.x)
    this.xRotationMatrix[6] = Math.sin(this.angle.x)
    this.xRotationMatrix[9] = (-1.0) * Math.sin(this.angle.x)
    this.xRotationMatrix[10] = Math.cos(this.angle.x)
    
    this.angle.y = y
    this.yRotationMatrix[0] = Math.cos(this.angle.y)
    this.yRotationMatrix[2] = (-1.0) * Math.sin(this.angle.y)
    this.yRotationMatrix[8] = Math.sin(this.angle.y)
    this.yRotationMatrix[10] = Math.cos(this.angle.y)
    
    this.angle.z = z
    this.zRotationMatrix[0] = Math.cos(this.angle.z)
    this.zRotationMatrix[1] = Math.sin(this.angle.z)
    this.zRotationMatrix[4] = (-1.0) * Math.sin(this.angle.z)
    this.zRotationMatrix[5] = Math.cos(this.angle.z)

    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.xRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.yRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.zRotationMatrix)
  }

  update() {
    this.orthoProjectionMatrix = [
      this.fieldOfViewFactor / this.aspect, 0.0, 0.0, 0.0,
      0.0, this.fieldOfViewFactor, 0.0, 0.0,
      0.0, 0.0, (this.near + this.far) * this.rangeInverted, -1.0,
      0.0, 0.0, this.near * this.far * this.rangeInverted * 2, 0.0
    ]
    this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.orthoProjectionMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.camera.matrix)
    this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.yRotationMatrix)

    

    this.angle.x += 0.01
    this.xRotationMatrix[5] = Math.cos(this.angle.x)
    this.xRotationMatrix[6] = Math.sin(this.angle.x)
    this.xRotationMatrix[9] = (-1.0) * Math.sin(this.angle.x)
    this.xRotationMatrix[10] = Math.cos(this.angle.x)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.xRotationMatrix)
    // this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.xRotationMatrix)

    this.angle.y += 0.01
    this.yRotationMatrix[0] = Math.cos(this.angle.y)
    this.yRotationMatrix[2] = (-1.0) * Math.sin(this.angle.y)
    this.yRotationMatrix[8] = Math.sin(this.angle.y)
    this.yRotationMatrix[10] = Math.cos(this.angle.y)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.yRotationMatrix)
    // this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.yRotationMatrix)
    
    this.angle.z += 0.01
    this.zRotationMatrix[0] = Math.cos(this.angle.z)
    this.zRotationMatrix[1] = Math.sin(this.angle.z)
    this.zRotationMatrix[4] = (-1.0) * Math.sin(this.angle.z)
    this.zRotationMatrix[5] = Math.cos(this.angle.z)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.zRotationMatrix)
    // this.matrixMath4x4.multiply(this.worldMatrix, this.worldMatrix, this.zRotationMatrix)

    
   
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
    
    this.glCntxt.uniform4fv(this.shader.uniforms[this.colorUniformKey], this.color4fv)
    this.glCntxt.uniform3fv(this.shader.uniforms[this.reverseLightDirectionUniformKey], this.directionalLightVector)
    this.glCntxt.uniformMatrix4fv(this.shader.uniforms[this.matrixUniformKey], false, this.orthoProjectionMatrix)
    this.glCntxt.uniformMatrix4fv(this.shader.uniforms['u_normalMatrix'], false, this.worldMatrix)
    
    
    this.glCntxt.enableVertexAttribArray(this.shader.attributes[this.normalsAttributeKey])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glNormalsBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.attributes[this.normalsAttributeKey],
      this.bufferCfg.blockSize,
      this.bufferCfg.type,
      this.bufferCfg.normalize,
      this.bufferCfg.stride,
      this.bufferCfg.offset
    )

    this.glCntxt.enableVertexAttribArray(this.shader.attributes[this.posAttributeKey])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.attributes[this.posAttributeKey],
      this.bufferCfg.blockSize,
      this.bufferCfg.type,
      this.bufferCfg.normalize,
      this.bufferCfg.stride,
      this.bufferCfg.offset
    )

    this.glCntxt.drawArrays(
      this.bufferCfg.primitiveType,
      this.bufferCfg.offset,
      this.bufferCfg.count
    )
  }
}