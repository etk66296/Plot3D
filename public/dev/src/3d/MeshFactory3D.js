class MeshFactory3D extends Plot3DFactory{
  constructor(glCntxt, shader) {
    super()
    this.glCntxt = glCntxt
    this.shader = shader
    this.math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }
  }

  produceAColoredTriangleMesh3DFrom(loadedData) {
    let meshData = []
    loadedData.meshes.forEach(mesh => {
      mesh.primitives.forEach(primitive => {
        meshData.push({
            vertices: [],
            normals: [],
            indices: [],
            colors: []
          }
        )
        let verticeIndex = primitive.attributes.POSITION
        let normalsIndex = primitive.attributes.NORMAL
        let indicesIndex = primitive.indices
        let colorIndex = primitive.material
        loadedData.bufferViews[verticeIndex].cells.forEach(cell => { meshData[meshData.length - 1].vertices.push(cell) })
        loadedData.bufferViews[normalsIndex].cells.forEach(cell => { meshData[meshData.length - 1].normals.push(cell) })
        loadedData.bufferViews[indicesIndex].cells.forEach(cell => { meshData[meshData.length - 1].indices.push(cell) })
        for (let i = 0; i < loadedData.bufferViews[indicesIndex].cells.length; i++) {
          meshData[meshData.length - 1].colors.push(loadedData.materials[colorIndex].pbrMetallicRoughness.baseColorFactor[0])
          meshData[meshData.length - 1].colors.push(loadedData.materials[colorIndex].pbrMetallicRoughness.baseColorFactor[1])
          meshData[meshData.length - 1].colors.push(loadedData.materials[colorIndex].pbrMetallicRoughness.baseColorFactor[2])
          meshData[meshData.length - 1].colors.push(loadedData.materials[colorIndex].pbrMetallicRoughness.baseColorFactor[3])
        }
      })
    })
    return new ColoredTriangleMesh3D(this.glCntxt, this.shader, this.math, meshData)
  }

  produceATexturedTriangleMesh3DFrom(loadedData) {
    let meshData = []
    loadedData.meshes.forEach(mesh => {
      mesh.primitives.forEach(primitive => {
        meshData.push({
            vertices: [],
            normals: [],
            indices: []
          }
        )
        let verticeIndex = primitive.attributes.POSITION
        let normalsIndex = primitive.attributes.NORMAL
        let indicesIndex = primitive.indices
        
        loadedData.bufferViews[verticeIndex].cells.forEach(cell => { meshData[meshData.length - 1].vertices.push(cell) })
        loadedData.bufferViews[normalsIndex].cells.forEach(cell => { meshData[meshData.length - 1].normals.push(cell) })
        loadedData.bufferViews[indicesIndex].cells.forEach(cell => { meshData[meshData.length - 1].indices.push(cell) })
        
      })
    })
    return new TexturedTriangleMesh3D(this.glCntxt, this.shader, this.math, meshData)
  }

 
}