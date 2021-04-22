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
  
    out[0] = ay * bz - az * by;
  
    out[1] = az * bx - ax * bz;
  
    out[2] = ax * by - ay * bx;
  
    return out;
  }

}

class Vector4 extends Vector {
  constructor(cells = [
    0, 0, 0, 0
  ]) {
    super(cells)
  }
}