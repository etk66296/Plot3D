class MeshFactory3D extends Plot3DFactory{
  constructor() {
    super()
    this.math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }
  }

  createAStandardCamera3D(glCntxt, shader) {
    return new Camera3D(glCntxt, shader, this.math)
  }

  createACube3D(glCntxt, shader) {
    return new TriangleMesh3D(glCntxt, shader, this.math, [
      1.0,-1.0,-1.0,
     -1.0,-1.0, 1.0,
     -1.0, 1.0, 1.0,
      1.0, 1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0,-1.0,
      1.0,-1.0, 1.0,
     -1.0,-1.0,-1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0,-1.0,
      1.0,-1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0, 1.0,
     -1.0, 1.0,-1.0,
      1.0,-1.0, 1.0,
     -1.0,-1.0, 1.0,
     -1.0,-1.0,-1.0,
     -1.0, 1.0, 1.0,
     -1.0,-1.0, 1.0,
      1.0,-1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0,-1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0, 1.0,
      1.0,-1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0,-1.0,
     -1.0, 1.0,-1.0,
      1.0, 1.0, 1.0,
     -1.0, 1.0,-1.0,
     -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
     -1.0, 1.0, 1.0,
      1.0,-1.0, 1.0
    ])
  }
}