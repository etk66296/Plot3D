class Plot3DGlTfLoader extends Plot3DLoader{
  constructor(glCntxt) {
    super()

    this.glCntxt = glCntxt

    // component Type 	            Size in bytes
    // 5120      (BYTE) 	          1
    // 5121      (UNSIGNED_BYTE)    1
    // 5122      (SHORT)   	        2
    // 5123      (UNSIGNED_SHORT)   2
    // 5126      (FLOAT) 	          4

    this.loaded = []

    this.rawBufDataRegExMatcher = /(?<=data:application\/octet-stream;base64,).*/

    this.gltfRequester = new XMLHttpRequest()
    this.gltfRequester.onreadystatechange = (event) => {
      if (this.gltfRequester.readyState === 4) {
        if (this.gltfRequester.status === 200) {
          this.extractDataFromGltfJson(JSON.parse(this.gltfRequester.responseText))
        } else {
           console.error(this.gltfRequester.statusText)
        }
    }
    }
  }

  requestGlTf(url) {
    this.gltfRequester.open('GET', url, true)
    this.gltfRequester.send(null)
  }

  extractDataFromGltfJson(gltfObject) {
    if (gltfObject.asset.version !== '2.0') {
      console.error('check your gltf file, version must be 2.0')
    }
    let data = this.rawBufDataRegExMatcher.exec(gltfObject.buffers[0].uri)[0]
    gltfObject.bufferViews.forEach((view) => {
      view.uri = data.substring(view.byteOffset, view.byteOffset + view.byteLength)
    })
    
    gltfObject.accessors.forEach((accessor) => {
      let  rawBinaryData = window.atob(gltfObject.bufferViews[accessor.bufferView].uri)
      if (this.glCntxt.FLOAT === accessor.componentType) {
        gltfObject.bufferViews[accessor.bufferView].cells = this.binToFloat(rawBinaryData)
      }

      if (this.glCntxt.UNSIGNED_SHORT === accessor.componentType) {
        gltfObject.bufferViews[accessor.bufferView].cells = this.binToUShort(rawBinaryData)
      }
    })
    console.log(gltfObject)
  }

  binToFloat(rawBinaryData) {
    let numOfCells =  rawBinaryData.length / Float32Array.BYTES_PER_ELEMENT
    let dataView	= new DataView( new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT) )
    let cells	= new Float32Array(numOfCells)
    let cellPointer = 0
    for(let i = 0; i < numOfCells; i++) {
      cellPointer = i * Float32Array.BYTES_PER_ELEMENT
      dataView.setUint8(0, rawBinaryData.charCodeAt(cellPointer))
      dataView.setUint8(1, rawBinaryData.charCodeAt(cellPointer + 1))
      dataView.setUint8(2, rawBinaryData.charCodeAt(cellPointer + 2))
      dataView.setUint8(3, rawBinaryData.charCodeAt(cellPointer + 3))
      cells[i] = dataView.getFloat32(0, true)
    }
    return cells
  }

  binToUShort(rawBinaryData) {
    let numOfCells =  rawBinaryData.length / Uint16Array.BYTES_PER_ELEMENT
    let dataView	= new DataView( new ArrayBuffer(Uint16Array.BYTES_PER_ELEMENT) )
    let cells	= new Uint16Array(numOfCells)
    let cellPointer = 0
    for(let i = 0; i < numOfCells; i++) {
      cellPointer = i * Uint16Array.BYTES_PER_ELEMENT
      dataView.setUint8(0, rawBinaryData.charCodeAt(cellPointer))
      dataView.setUint8(1, rawBinaryData.charCodeAt(cellPointer + 1))
      cells[i] = dataView.getUint16(0, true)
    }
    return cells
  }
}