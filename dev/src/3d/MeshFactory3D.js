class MeshFactory3D extends Plot3DFactory{
  constructor() {
    super()
    this.math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }
  }
}