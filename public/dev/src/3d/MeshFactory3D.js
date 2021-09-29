class MeshFactory3D extends Plot3DFactory{
  constructor(glCntxt, shader) {
    super()
    this.glCntxt = glCntxt
    this.shader = shader
    this.math = {
      vector3: new Vector3Math(),
      matrix4x4: new Matrix4x4Math()
    }

    this.images = []
    /*
    {
      name: ...
      src: ...
    }
    */
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
            indices: [],
            txtrCoord: [],
            material: {
              hasAnImage: false,
              imageSrc: null,
              color: null
            }
          }
        )
        let verticeIndex = primitive.attributes.POSITION
        let normalsIndex = primitive.attributes.NORMAL
        let textureIndex = primitive.attributes.TEXCOORD_0
        let indicesIndex = primitive.indices
        loadedData.bufferViews[verticeIndex].cells.forEach(cell => { meshData[meshData.length - 1].vertices.push(cell) })
        loadedData.bufferViews[normalsIndex].cells.forEach(cell => { meshData[meshData.length - 1].normals.push(cell) })
        loadedData.bufferViews[textureIndex].cells.forEach(cell => { meshData[meshData.length - 1].txtrCoord.push(cell) })
        loadedData.bufferViews[indicesIndex].cells.forEach(cell => { meshData[meshData.length - 1].indices.push(cell) })
        
        if (loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorFactor != undefined) {
            meshData[meshData.length - 1].material.color = []
            meshData[meshData.length - 1].material.color.push(loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorFactor[0])
            meshData[meshData.length - 1].material.color.push(loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorFactor[1])
            meshData[meshData.length - 1].material.color.push(loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorFactor[2])
            meshData[meshData.length - 1].material.color.push(loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorFactor[3])
        } else if (loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorTexture != undefined) {
          meshData[meshData.length - 1].material.hasAnImage = true
          meshData[meshData.length - 1].material.textureData = []
          let textureIndex = loadedData.materials[primitive.material].pbrMetallicRoughness.baseColorTexture.index
          let textureImageIndex = loadedData.textures[textureIndex].source

          let imageWasAlreadyLoaded = false
          this.images.forEach((image) => {
            if (image.name === loadedData.images[textureImageIndex].name) {
              imageWasAlreadyLoaded = true
              meshData[meshData.length - 1].material.imageSrc = image.data.src
            }
          })

          if (!imageWasAlreadyLoaded) {
            this.images.push({
              data: new Image(),
              name: loadedData.images[textureImageIndex].name
            })

            this.images[this.images.length - 1].data.src = loadedData.images[textureImageIndex].uri
            this.images[this.images.length - 1].data.addEventListener('load', () => {
              meshData[meshData.length - 1].material.imageSrc = this.images[this.images.length - 1].data.src
            })
          }

          
        }
        
      })
    })
    return new TexturedTriangleMesh3D(this.glCntxt, this.shader, this.math, meshData)
  }

 
}