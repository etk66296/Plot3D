class MeshFactory3D extends Plot3DFactory{
  constructor(glCntxt, shader) {
    super()
    this.glCntxt = glCntxt
    this.shader = shader
    this.math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }

    this.loaders = {
      gltf: new Plot3DGlTfLoader(glCntxt)
    }
  }

  createAStandardCamera3D() {
    return new Camera3D(this.glCntxt, this.shader, this.math)
  }

  createFromGltfFile(url) {
    this.loaders.gltf.requestGlTf(url)
    /* TODO 18.06.2021 */
  }

  // createACube3D() {
  //   return new TriangleMesh3D(this.glCntxt, this.shader, this.math, new Float32Array([
  //     1.0,-1.0,-1.0,
  //    -1.0,-1.0, 1.0,
  //    -1.0, 1.0, 1.0,
  //     1.0, 1.0,-1.0,
  //    -1.0,-1.0,-1.0,
  //    -1.0, 1.0,-1.0,
  //     1.0,-1.0, 1.0,
  //    -1.0,-1.0,-1.0,
  //     1.0,-1.0,-1.0,
  //     1.0, 1.0,-1.0,
  //     1.0,-1.0,-1.0,
  //    -1.0,-1.0,-1.0,
  //    -1.0,-1.0,-1.0,
  //    -1.0, 1.0, 1.0,
  //    -1.0, 1.0,-1.0,
  //     1.0,-1.0, 1.0,
  //    -1.0,-1.0, 1.0,
  //    -1.0,-1.0,-1.0,
  //    -1.0, 1.0, 1.0,
  //    -1.0,-1.0, 1.0,
  //     1.0,-1.0, 1.0,
  //     1.0, 1.0, 1.0,
  //     1.0,-1.0,-1.0,
  //     1.0, 1.0,-1.0,
  //     1.0,-1.0,-1.0,
  //     1.0, 1.0, 1.0,
  //     1.0,-1.0, 1.0,
  //     1.0, 1.0, 1.0,
  //     1.0, 1.0,-1.0,
  //    -1.0, 1.0,-1.0,
  //     1.0, 1.0, 1.0,
  //    -1.0, 1.0,-1.0,
  //    -1.0, 1.0, 1.0,
  //     1.0, 1.0, 1.0,
  //    -1.0, 1.0, 1.0,
  //     1.0,-1.0, 1.0
  //   ]))
  // }
}