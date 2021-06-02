class Vector extends Plot3DObject {
  constructor(cells = []) {
    super()
    this.cells = cells
  }
}

class Vector3 extends Vector {
  constructor(cells = [
    0, 0, 0
  ]) {
    super(cells)
  }

  cross(multiplier) {
    let ax = this.cells[0]
    let ay = this.cells[1]
    let az = this.cells[2]
  
    let bx = multiplier.cells[0]
    let by = multiplier.cells[1]
    let bz = multiplier.cells[2]
  
    this.cells[0] = ay * bz - az * by
    this.cells[1] = az * bx - ax * bz
    this.cells[2] = ax * by - ay * bx
  
    return this
  }

  subtract(subtrahend) {
    this.cells[0] = this.cells[0] - subtrahend.cells[0]
    this.cells[1] = this.cells[1] - subtrahend.cells[1]
    this.cells[2] = this.cells[2] - subtrahend.cells[2]
    return this
  }

  normalize() {
    let len = this.cells[0] * this.cells[0] + this.cells[1] * this.cells[1] + this.cells[2] * this.cells[2]
    len = 1 / Math.sqrt(len)
    this.cells[0] = this.cells[0] * len
    this.cells[1] = this.cells[1] * len
    this.cells[2] = this.cells[2] * len
    return this
  }
}

class Vector3Math {
  constructor(){}
  cross(v1, v2) {
    let result = new Vector3()
    result.cells[0] = v1.cells[1] * v2.cells[2] - v1.cells[2] * v2.cells[1]
    result.cells[1] = v1.cells[2] * v2.cells[0] - v1.cells[0] * v2.cells[2]
    result.cells[2] = v1.cells[0] * v2.cells[1] - v1.cells[1] * v2.cells[0]
  
    return result
  }

  subtract(minuend, subtrahend) {
    let result = new Vector3()
    result.cells[0] = minuend.cells[0] - subtrahend.cells[0]
    result.cells[1] = minuend.cells[1] - subtrahend.cells[1]
    result.cells[2] = minuend.cells[2] - subtrahend.cells[2]
    return result
  }

  normalize(v) {
    let result = new Vector3([ v.cells[0], v.cells[1], v.cells[2] ])
    let len = result.cells[0] * result.cells[0] + result.cells[1] * result.cells[1] + result.cells[2] * result.cells[2]
    len = 1 / Math.sqrt(len)
    result.cells[0] = result.cells[0] * len
    result.cells[1] = result.cells[1] * len
    result.cells[2] = result.cells[2] * len
    return result
  }

}

class Vector4 extends Vector {
  constructor(cells = [
    0, 0, 0, 0
  ]) {
    super(cells)
  }
}