class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.color = new Vector4([ 0.3, 0.0, 1.0, 1.0 ])
    
    this.modelTransformationMatrix = new Matrix4x4()
    this.modelSpaceRotationInRad = { x: 0.0, y: 0.0, z: 0.0 }
    this.modelScale = {x: 0.0, y: 0.0, z: 0.0 }

    this.worldTranslationMatrix = new Matrix4x4()
    this.worldPosition = new Vector3([ 0.0, 0.0, 0.0 ])

    this.math = math

    this.controls = []
  }

  rotateXIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.x += angleInRadian
    let tyy = Math.cos(angleInRadian)
    let tzy = (-1) * Math.sin(angleInRadian)
    let tyz = Math.sin(angleInRadian)
    let tzz = Math.cos(angleInRadian)
    let xAxisRotation = new Matrix()
    xAxisRotation.cells = [
      1.0, 0.0, 0.0, 0.0,
      0.0, tyy, tzy, 0.0,
      0.0, tyz, tzz, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(xAxisRotation)
  }

  rotateYIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.y += angleInRadian
    let txx = Math.cos(angleInRadian)
    let tzx = Math.sin(angleInRadian)
    let txz = (-1) * Math.sin(angleInRadian)
    let tzz = Math.cos(angleInRadian)
    let yAxisRotation = new Matrix()
    yAxisRotation.cells = [
      txx, 0.0, tzx, 0.0,
      0.0, 1.0, 0.0, 0.0,
      txz, 0.0, tzz, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(yAxisRotation)
  }

  rotateZIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.z += angleInRadian
    let txx = Math.cos(angleInRadian)
    let tyx = (-1) * Math.sin(angleInRadian)
    let txy = Math.sin(angleInRadian)
    let tyy = Math.cos(angleInRadian)
    let zAxisRotation = new Matrix()
    zAxisRotation.cells = [
      txx, tyx, 0.0, 0.0,
      txy, tyy, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelTransformationMatrix.multiplyM4(zAxisRotation)
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
