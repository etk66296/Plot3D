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

 
}