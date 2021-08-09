class Renderable3D extends Renderable {
  constructor(glCntxt, shader, math) {
    super(glCntxt, shader)
    this.color = new Vector4([ 0.3, 0.0, 1.0, 1.0 ])
    
    this.modelMatrix = new Matrix4x4()
    this.modelTransformationMatrix = new Matrix4x4()
    this.worldTransformationMatrix = new Matrix4x4()
    this.worldPosition = new Vector3([ 0.0, 0.0, 0.0 ])
    
    this.worldSpaceRotationInRad = { x: 0.0, y: 0.0, z: 0.0 }
    
    this.modelQuaternion = new Quaternion()
    this.modelLeftDirection = new Vector3([ 1.0, 0.0, 0.0 ])
    this.modelUpDirection = new Vector3([ 0.0, 1.0, 0.0 ])
    this.modelFwdDirection = new Vector3([ 0.0, 0.0, 1.0 ])
    
    this.modelScale = {x: 0.0, y: 0.0, z: 0.0 }

    this.modelRotation = {roll: 0.0, yaw: 0.0, pitch: 0.0 }
    this.modelRotationM4 = new Matrix4x4()

    this.math = math

    this.controls = []
  }

  roll(angleInRad) {
    this.modelRotation.roll += angleInRad
    let cosYawSinPitch = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.pitch)
    let sinYawCosRoll = Math.sin(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let sinYawSinPitch = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let sinYawSinRoll = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let cosYawCosRoll = Math.cos(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let cosYawSinRoll = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let cosPitchSinRoll = Math.cos(this.modelRotation.pitch) *
      Math.sin(this.modelRotation.roll)
    let cosPitchCosRoll = Math.cos(this.modelRotation.pitch) *
      Math.cos(this.modelRotation.roll)

    this.modelRotationM4.cells[1] = cosYawSinPitch * Math.sin(this.modelRotation.roll) - sinYawCosRoll
    this.modelRotationM4.cells[2] = cosYawSinPitch * Math.sin(this.modelRotation.roll) + sinYawSinRoll
    this.modelRotationM4.cells[5] = sinYawSinPitch * Math.sin(this.modelRotation.roll) + cosYawCosRoll
    this.modelRotationM4.cells[6] = sinYawSinPitch * Math.cos(this.modelRotation.roll) - cosYawSinRoll
    this.modelRotationM4.cells[9] = cosPitchSinRoll
    this.modelRotationM4.cells[10] = cosPitchCosRoll
  }

  yaw(angleInRad) {
    this.modelRotation.pitch += angleInRad
    let cosYawCosPitch = Math.cos(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.pitch)
    let cosYawSinPitch = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.pitch)
    let sinYawCosPitch = Math.sin(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.pitch)
    let sinYawCosRoll = Math.sin(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let sinYawSinPitch = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let sinYawSinRoll = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let cosYawCosRoll = Math.cos(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let cosYawSinRoll = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let cosPitchSinRoll = Math.cos(this.modelRotation.pitch) *
      Math.sin(this.modelRotation.roll)
    let cosPitchCosRoll = Math.cos(this.modelRotation.pitch) *
      Math.cos(this.modelRotation.roll)

    this.modelRotationM4.cells[0] = cosYawCosPitch
    this.modelRotationM4.cells[1] = cosYawSinPitch * Math.sin(this.modelRotation.roll) - sinYawCosRoll
    this.modelRotationM4.cells[2] = cosYawSinPitch * Math.sin(this.modelRotation.roll) + sinYawSinRoll
    this.modelRotationM4.cells[4] = sinYawCosPitch
    this.modelRotationM4.cells[5] = sinYawSinPitch * Math.sin(this.modelRotation.roll) + cosYawCosRoll
    this.modelRotationM4.cells[6] = sinYawSinPitch * Math.cos(this.modelRotation.roll) - cosYawSinRoll
    this.modelRotationM4.cells[8] = (-1) * Math.sin(this.modelRotation.pitch)
    this.modelRotationM4.cells[9] = cosPitchSinRoll
    this.modelRotationM4.cells[10] = cosPitchCosRoll
  }
  
  pitch(angleInRad) {
    this.modelRotation.yaw += angleInRad
    let cosYawCosPitch = Math.cos(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.pitch)
    let cosYawSinPitch = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.pitch)
    let sinYawCosPitch = Math.sin(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.pitch)
    let sinYawCosRoll = Math.sin(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let sinYawSinPitch = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let sinYawSinRoll = Math.sin(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)
    let cosYawCosRoll = Math.cos(this.modelRotation.yaw) *
      Math.cos(this.modelRotation.roll)
    let cosYawSinRoll = Math.cos(this.modelRotation.yaw) *
      Math.sin(this.modelRotation.roll)

    this.modelRotationM4.cells[0] = cosYawCosPitch
    this.modelRotationM4.cells[1] = cosYawSinPitch * Math.sin(this.modelRotation.roll) - sinYawCosRoll
    this.modelRotationM4.cells[2] = cosYawSinPitch * Math.sin(this.modelRotation.roll) + sinYawSinRoll
    this.modelRotationM4.cells[4] = sinYawCosPitch
    this.modelRotationM4.cells[5] = sinYawSinPitch * Math.sin(this.modelRotation.roll) + cosYawCosRoll
    this.modelRotationM4.cells[6] = sinYawSinPitch * Math.cos(this.modelRotation.roll) - cosYawSinRoll
  }

  rotWorldXIncr(angleInRadian) {
  
  }

  rotWorldYIncr(angleInRadian) {
    
  }

  rotWorldZIncr(angleInRadian) {
  
  }

  strideLeft(distance) {
  
  }

  strideRight(distance) {
   
  }

  moveForward(distance) {
    this.worldPosition.cells[0] += distance * this.modelRotationM4.cells[2]
    this.worldPosition.cells[1] += distance * this.modelRotationM4.cells[6]
    this.worldPosition.cells[2] += distance * this.modelRotationM4.cells[10]
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  moveBackward(distance) {
    this.worldPosition.cells[0] -= distance * this.modelRotationM4.cells[2]
    this.worldPosition.cells[1] -= distance * this.modelRotationM4.cells[6]
    this.worldPosition.cells[2] -= distance * this.modelRotationM4.cells[10]
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  strideLeft(distance) {
    this.worldPosition.cells[0] += distance * this.modelRotationM4.cells[0]
    this.worldPosition.cells[1] += distance * this.modelRotationM4.cells[4]
    this.worldPosition.cells[2] += distance * this.modelRotationM4.cells[8]
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  strideRight(distance) {
    this.worldPosition.cells[0] -= distance * this.modelRotationM4.cells[0]
    this.worldPosition.cells[1] -= distance * this.modelRotationM4.cells[4]
    this.worldPosition.cells[2] -= distance * this.modelRotationM4.cells[8]
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  translateXIncremental(distance) {
    this.worldPosition.cells[0] += distance
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
  }

  translateYIncremental(distance) {
    this.worldPosition.cells[1] += distance
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
  }

  translateZIncremental(distance) {
    this.worldPosition.cells[2] += distance
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
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
    this.worldTransformationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTransformationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTransformationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  update() {
    this.modelTransformationMatrix.multiplyM4(this.modelRotationM4)
  }

  draw() {

  }
}
