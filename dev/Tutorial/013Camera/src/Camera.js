class Camera extends Plot3dBase {
  constructor(
    glCntxt,
    matrixMath4x4,
    vectorMath3x1
    ) {
    super()

    this.matrixMath4x4 = matrixMath4x4
    this.vectorMath3x1 = vectorMath3x1

    this.xAxis = [1.0, 0.0, 0.0]
    this.yAxis = [0.0, 1.0, 0.0]
    this.zAxis = [0.0, 0.0, 1.0]


    this.position = { x: 0.0, y: 800.0, z: 400.0 }
    this.target = { x: 0.0, y: 0.0, z: 0.0 }
    this.translation = { x: 0.0, y: 0.0, z: 0.0 }
    this.angle = { x: 0.0, y: 0.0, z: 0.0 }

    this.translationScaleMatrix = [
      1.0,                0.0,                0.0,                0.0,
      0.0,                1.0,                0.0,                0.0,
      0.0,                0.0,                1.0,                0.0,
      this.translation.x, this.translation.y, this.translation.z, 1.0
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

    this.matrix = this.lookAt(
      [ this.position.x, this.position.y, this.position.z],
      [ this.target.x, this.target.y, this.target.z],
      [ 0.0, 1.0, 0.0 ]
    )

    this.matrixMath4x4.multiply(this.matrix, this.matrix, this.translationScaleMatrix)
    this.matrixMath4x4.multiply(this.matrix, this.matrix, this.yRotationMatrix)
    this.matrix = this.matrixMath4x4.invert(this.matrix, this.matrix)

  }

  update() {
  }

  draw() {

  }

  lookAt(cameraPosition, target, up) {
    this.zAxis = this.vectorMath3x1.normalize([], this.vectorMath3x1.subtract([], cameraPosition, target))
    this.xAxis = this.vectorMath3x1.normalize([], this.vectorMath3x1.cross([], up, this.zAxis))
    this.yAxis = this.vectorMath3x1.normalize([], this.vectorMath3x1.cross([], this.zAxis, this.xAxis))
 
    return [
      this.xAxis[0], this.xAxis[1], this.xAxis[2], 0.0,
      this.yAxis[0], this.yAxis[1], this.yAxis[2], 0.0,
      this.zAxis[0], this.zAxis[1], this.zAxis[2], 0.0,
      this.position.x, this.position.y, this.position.z, 1.0
    ]
  }
}