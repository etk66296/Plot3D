class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.color = new Vector4([ 0.3, 0.0, 1.0, 1.0 ])
    
    this.modelTransformationMatrix = new Matrix4x4()
    this.modelSpaceRotationInRad = { x: 0.0, y: 0.0, z: 0.0 }
    this.modelDirections = {
      x: new Vector3([ 1.0, 0.0, 0.0 ]),
      y: new Vector3([ 0.0, 1.0, 0.0 ]),
      z: new Vector3([ 0.0, 0.0, 1.0 ])
    }
    this.modelScale = {x: 0.0, y: 0.0, z: 0.0 }

    this.worldTranslationMatrix = new Matrix4x4()
    this.worldPosition = new Vector3([ 0.0, 0.0, 0.0 ])

    this.math = math

    this.controls = []
  }

  rotateXIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.x += angleInRadian
    this.modelDirections.y.cells[1] = Math.cos(this.modelSpaceRotationInRad.x)
    this.modelDirections.z.cells[1] = (-1) * Math.sin(this.modelSpaceRotationInRad.x)
    this.modelDirections.y.cells[2] = Math.sin(this.modelSpaceRotationInRad.x)
    this.modelDirections.z.cells[2] = Math.cos(this.modelSpaceRotationInRad.x)
    let xAxisRotation = new Matrix()
    xAxisRotation.cells = [
      1.0, 0.0, 0.0, 0.0,
      0.0, Math.cos(angleInRadian), (-1) * Math.sin(angleInRadian), 0.0,
      0.0, Math.sin(angleInRadian), Math.cos(angleInRadian), 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(xAxisRotation)
  }

  rotateYIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.y += angleInRadian
    this.modelDirections.x.cells[0] = Math.cos(this.modelSpaceRotationInRad.y)
    this.modelDirections.z.cells[0] = Math.sin(this.modelSpaceRotationInRad.y)
    this.modelDirections.x.cells[2] = (-1) * Math.sin(this.modelSpaceRotationInRad.y)
    this.modelDirections.z.cells[2] = Math.cos(this.modelSpaceRotationInRad.y)
    let yAxisRotation = new Matrix()
    yAxisRotation.cells = [
      Math.cos(angleInRadian), 0.0, Math.sin(angleInRadian), 0.0,
      0.0, 1.0, 0.0, 0.0,
      (-1) * Math.sin(angleInRadian), 0.0, Math.cos(angleInRadian), 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(yAxisRotation)
  }

  rotateZIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.z += angleInRadian
    this.modelDirections.x.cells[0] = Math.cos(this.modelSpaceRotationInRad.z)
    this.modelDirections.y.cells[0] = (-1) * Math.sin(this.modelSpaceRotationInRad.z)
    this.modelDirections.x.cells[1] = Math.sin(this.modelSpaceRotationInRad.z)
    this.modelDirections.y.cells[1] = Math.cos(this.modelSpaceRotationInRad.z)
    let zAxisRotation = new Matrix()
    zAxisRotation.cells = [
      Math.cos(angleInRadian), (-1) * Math.sin(angleInRadian), 0.0, 0.0,
      Math.sin(angleInRadian), Math.cos(angleInRadian), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(zAxisRotation)
  }

  strideLeft(distance) {
    this.worldPosition.cells[0] += (distance * this.modelDirections.x.cells[0])
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldPosition.cells[1] += (distance * this.modelDirections.x.cells[1])
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldPosition.cells[2] += (distance * this.modelDirections.x.cells[2])
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  strideRight(distance) {
    distance = distance * (-1)
    this.worldPosition.cells[0] += (distance * this.modelDirections.x.cells[0])
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldPosition.cells[1] += (distance * this.modelDirections.x.cells[1])
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldPosition.cells[2] += (distance * this.modelDirections.x.cells[2])
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  moveForward(distance) {
    this.worldPosition.cells[0] += (distance * this.modelDirections.z.cells[0])
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldPosition.cells[1] += (distance * this.modelDirections.z.cells[1])
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldPosition.cells[2] += (distance * this.modelDirections.z.cells[2])
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  moveBackward(distance) {
    distance = distance * (-1)
    this.worldPosition.cells[0] += (distance * this.modelDirections.z.cells[0])
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldPosition.cells[1] += (distance * this.modelDirections.z.cells[1])
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldPosition.cells[2] += (distance * this.modelDirections.z.cells[2])
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  translateXIncremental(distance) {
    this.worldPosition.cells[0] += distance
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
  }

  translateYIncremental(distance) {
    this.worldPosition.cells[1] += distance
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
  }

  translateZIncremental(distance) {
    this.worldPosition.cells[2] += distance
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }
  
  scaleX(factor) {
    this.modelScale.x = factor
    this.modelTransformationMatrix.cells[0] = this.modelScale.x
  }

  scaleY(factor) {
    this.modelScale.y = factor
    this.modelTransformationMatrix.cells[5] = this.modelScale.y
  }
  
  scaleZ(factor) {
    this.modelScale.z = factor
    this.modelTransformationMatrix.cells[10] = this.modelScale.z
  }

  setWorldPosition(x, y, z) {
    this.worldPosition.cells[0] = x
    this.worldPosition.cells[1] = y
    this.worldPosition.cells[2] = z
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  update() {

  }

  draw() {

  }
}
