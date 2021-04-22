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

class Vector4 extends Vector {
  constructor(cells = [
    0, 0, 0, 0
  ]) {
    super(cells)
  }
}