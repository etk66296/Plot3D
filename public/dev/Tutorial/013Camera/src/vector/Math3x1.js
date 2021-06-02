class VectorMath3x1 extends MatrixBase{
  constructor() {
    super()
  }
  cross(out, a, b) {

    let ax = a[0],
  
      ay = a[1],
  
      az = a[2];
  
    let bx = b[0],
  
      by = b[1],
  
      bz = b[2];
  
    out[0] = ay * bz - az * by;
  
    out[1] = az * bx - ax * bz;
  
    out[2] = ax * by - ay * bx;
  
    return out;
  
  }

  subtract(out, a, b) {

    out[0] = a[0] - b[0];
  
    out[1] = a[1] - b[1];
  
    out[2] = a[2] - b[2];
  
    return out;
  
  }

  normalize(out, a) {

    let x = a[0];
  
    let y = a[1];
  
    let z = a[2];
  
    let len = x * x + y * y + z * z;
  
    if (len > 0) {
  
      //TODO: evaluate use of glm_invsqrt here?
  
      len = 1 / Math.sqrt(len);
  
    }
  
    out[0] = a[0] * len;
  
    out[1] = a[1] * len;
  
    out[2] = a[2] * len;
  
    return out;
  
  }
}
