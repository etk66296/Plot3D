class VertexGroup3d extends Plot3dBase {
  constructor(
    glCntxt,
    shader,
    matrixMath4x4,
    colorUniformKey,
    posAttributeKey,
    matrixUniformKey,
    color4fv = [ 1.0, 0.0, 1.0, 1.0 ],
    vertices2fv = [
      // 3
        0.0, 0.0, 0.0,
        0.1, 0.0, 0.0,
        0.1, 0.2, 0.0,
        0.0, 0.2, 0.0,
        0.1, 0.1, 0.0,
        0.05, 0.1, 0.0,
      // d
        0.2, 0.0, 0.0,
        0.3, 0.0, 0.0,
        0.3, 0.2, 0.0,
        0.3, 0.1, 0.0,
        0.2, 0.1, 0.0,
        0.2, 0.0, 0.0,
      // p
        0.4, 0.0, 0.0,
        0.5, 0.0, 0.0,
        0.5, 0.1, 0.0,
        0.4, 0.1, 0.0,
        0.4, -0.1, 0.0,
       // 3
       0.0, 0.0, -1.0,
       0.1, 0.0, -1.0,
       0.1, 0.2, -1.0,
       0.0, 0.2, -1.0,
       0.1, 0.1, -1.0,
       0.05, 0.1, -1.0,
     // d
       0.2, 0.0, -1.0,
       0.3, 0.0, -1.0,
       0.3, 0.2, -1.0,
       0.3, 0.1, -1.0,
       0.2, 0.1, -1.0,
       0.2, 0.0, -1.0,
     // p
       0.4, 0.0, -1.0,
       0.5, 0.0, -1.0,
       0.5, 0.1, -1.0,
       0.4, 0.1, -1.0,
       0.4, -0.1, -1.0
    ]
    // [
    //   // 3
    //     0.0 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.1 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.1 * glCntxt.canvas.width, 0.2 * glCntxt.canvas.height, 0.0,
    //     0.0 * glCntxt.canvas.width, 0.2 * glCntxt.canvas.height, 0.0,
    //     0.1 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //     0.05 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //   // d
    //     0.2 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.3 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.3 * glCntxt.canvas.width, 0.2 * glCntxt.canvas.height, 0.0,
    //     0.3 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //     0.2 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //     0.2 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //   // p
    //     0.4 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.5 * glCntxt.canvas.width, 0.0 * glCntxt.canvas.height, 0.0,
    //     0.5 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //     0.4 * glCntxt.canvas.width, 0.1 * glCntxt.canvas.height, 0.0,
    //     0.4 * glCntxt.canvas.width, -0.1 * glCntxt.canvas.height, 0.0
    // ]
    ) {
    super()

    this.glCntxt = glCntxt
    this.shader = shader
    this.matrixMath4x4 = matrixMath4x4
    
    this.colorUniformKey = colorUniformKey
    this.matrixUniformKey = matrixUniformKey

    this.position = { x: 0.0, y: 0.0, z: 0.0 }

    this.depth = 100
    // this.orthoProjectionMatrix = [
    //     2.0 / this.glCntxt.canvas.width, 0.0, 0.0, 0.0,
    //     0.0, -2.0 / this.glCntxt.canvas.height, 0.0, 0.0,
    //     0.0, 0.0, 1.0, 0.0,
    //     0.0, 0.0, 0.0, 1.0
    // ]
    this.orthoProjectionMatrix = [
      1.0, 0.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  ]

    this.translation = { x: 0.0, y: 0.0, z: 0.0 }
    this.angle = { x: 0.0, y: 0.0, z: 0.0 }
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

    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.translationScaleMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.xRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.yRotationMatrix)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.zRotationMatrix)
    this.dir = { x: 1.0, y: 1.0, z: 1.0 }

    this.color4fv = color4fv

    

    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)

    this.posAttributeKey = posAttributeKey
    
    this.vertices2fv = vertices2fv
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.vertices2fv), glCntxt.STATIC_DRAW)

    this.bufferCfg = new BufferConfiguration(this.glCntxt)
    this.bufferCfg.setBlockSize(3)
    this.bufferCfg.setElementCount(vertices2fv.length / this.bufferCfg.blockSize)
  }

  setTranslation(x = 0, y = 0, z = 0) {
    this.translation.x = x
    this.translation.y = y
    this.translation.z = z
    this.translationScaleMatrix[12] = this.translation.x
    this.translationScaleMatrix[13] = this.translation.y
    this.translationScaleMatrix[14] = this.translation.z
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
    this.zRotationMatrix[0] = Math.cos(this.angle.y)
    this.zRotationMatrix[1] = Math.sin(this.angle.y)
    this.zRotationMatrix[4] = (-1.0) * Math.sin(this.angle.y)
    this.zRotationMatrix[5] = Math.cos(this.angle.y)
  }

  update() {
    if (this.position.x < -1.0) {
      this.dir.x = 1.0
    }
    if (this.position.x > 1.0) {
      this.dir.x = -1.0
    }
    if (this.position.y < -1.0) {
      this.dir.y = 1.0
    }
    if (this.position.y > 1.0) {
      this.dir.y = -1.0
    }
    if (this.position.z < -1.0) {
      this.dir.z = 1.0
    }
    if (this.position.z > 1.0) {
      this.dir.z = -1.0
    }
    this.translation.x = 0.01 * this.dir.x
    this.position.x += this.translation.x
    this.translationScaleMatrix[12] = this.translation.x
    this.translation.y = 0.01 * this.dir.y
    this.position.y += this.translation.y
    this.translationScaleMatrix[13] = this.translation.y
    // this.translation.z += (0.0001 * this.dir.z)
    // this.translationScaleMatrix[14] = this.translation.z
    // this.position.z += this.translation.z
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.translationScaleMatrix)

    this.angle.x = 0.01
    this.xRotationMatrix[5] = Math.cos(this.angle.x)
    this.xRotationMatrix[6] = Math.sin(this.angle.x)
    this.xRotationMatrix[9] = (-1.0) * Math.sin(this.angle.x)
    this.xRotationMatrix[10] = Math.cos(this.angle.x)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.xRotationMatrix)

    this.angle.y = 0.01
    this.yRotationMatrix[0] = Math.cos(this.angle.y)
    this.yRotationMatrix[2] = (-1.0) * Math.sin(this.angle.y)
    this.yRotationMatrix[8] = Math.sin(this.angle.y)
    this.yRotationMatrix[10] = Math.cos(this.angle.y)
    this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.yRotationMatrix)

    // this.angle.z = 0.01
    // this.zRotationMatrix[0] = Math.cos(this.angle.y)
    // this.zRotationMatrix[1] = Math.sin(this.angle.y)
    // this.zRotationMatrix[4] = (-1.0) * Math.sin(this.angle.y)
    // this.zRotationMatrix[5] = Math.cos(this.angle.y)
    // this.matrixMath4x4.multiply(this.orthoProjectionMatrix, this.orthoProjectionMatrix, this.zRotationMatrix)

    let posXDisplay = document.getElementById("posX")
    let posYDisplay = document.getElementById("posY")
    let posZDisplay = document.getElementById("posZ")

    posXDisplay.innerHTML = "x: " + String(this.position.x.toFixed(6))
    posYDisplay.innerHTML = "y: " + String(this.position.y.toFixed(6))
    posZDisplay.innerHTML = "z: " + String(this.position.z.toFixed(6))
  }

  setAngle(angle) {
    this.angle = angle
    this.matrixTransRotScale[0] = Math.cos(this.angle) * this.scale.x
    this.matrixTransRotScale[1] = (-1) * Math.sin(this.angle)
    this.matrixTransRotScale[3] = Math.sin(this.angle)
    this.matrixTransRotScale[4] = Math.cos(this.angle) * this.scale.y
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)
    
    this.glCntxt.uniform4fv(this.shader.uniforms[this.colorUniformKey], this.color4fv)
    this.glCntxt.uniformMatrix4fv(this.shader.uniforms[this.matrixUniformKey], false, this.orthoProjectionMatrix)

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