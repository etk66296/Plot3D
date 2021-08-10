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
    
  }

  requestGlTf(url) {
    return new Promise((resolve, reject) => {
      this.gltfRequester.open('GET', url, true)
      this.gltfRequester.onload = () => {
        if (this.gltfRequester.readyState === 4) {
          if (this.gltfRequester.status === 200) {
            let gltfObject = JSON.parse(this.gltfRequester.responseText)
            if (gltfObject.asset.version !== '2.0') {
              console.error('check your gltf file, version must be 2.0')
            }
            this.loaded.push(this.extractDataFromGltfJson(gltfObject))
            resolve(this.gltfRequester.response)
          } else {
            reject({
              status: this.gltfRequester.status,
              statusText: this.gltfRequester.statusText
            })
          }
        }
        this.gltfRequester.onerror = function () {
          reject({
            status: this.gltfRequester.status,
            statusText: this.gltfRequester.statusText
          })
        }
      }
      this.gltfRequester.send(null)
    })
  }

  extractDataFromGltfJson(gltfObject) {
    let binaryData = window.atob(this.rawBufDataRegExMatcher.exec(gltfObject.buffers[0].uri)[0])
    let bytes = new Uint8Array(binaryData.length)
    for (var i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i)
    }
    gltfObject.bufferViews.forEach((view) => {
      view.data = bytes.slice(view.byteOffset, view.byteOffset + view.byteLength)
    })
    
    
    gltfObject.accessors.forEach((accessor) => {
      let selectedByteData = gltfObject.bufferViews[accessor.bufferView].data
      if (this.glCntxt.FLOAT === accessor.componentType) {
        gltfObject.bufferViews[accessor.bufferView].cells = this.bytesToFloats(selectedByteData)
        delete gltfObject.bufferViews[accessor.bufferView].data
      }

      if (this.glCntxt.UNSIGNED_SHORT === accessor.componentType) {
        gltfObject.bufferViews[accessor.bufferView].cells = this.bytesToUShorts(selectedByteData)
        delete gltfObject.bufferViews[accessor.bufferView].data
      }
    })

    return gltfObject
  }

  bytesToFloats(bytes) {
    let numOfCells =  bytes.length / Float32Array.BYTES_PER_ELEMENT
    let dataView	= new DataView( new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT) )
    let cells	= new Float32Array(numOfCells)
    let cellPointer = 0
    for(let i = 0; i < numOfCells; i++) {
      cellPointer = i * Float32Array.BYTES_PER_ELEMENT
      dataView.setUint8(0, bytes[cellPointer])
      dataView.setUint8(1, bytes[cellPointer + 1])
      dataView.setUint8(2, bytes[cellPointer + 2])
      dataView.setUint8(3, bytes[cellPointer + 3])
      cells[i] = dataView.getFloat32(0, true)
    }
    return cells
  }

  bytesToUShorts(bytes) {
    let numOfCells =  bytes.length / Uint16Array.BYTES_PER_ELEMENT
    let dataView	= new DataView( new ArrayBuffer(Uint16Array.BYTES_PER_ELEMENT) )
    let cells	= new Uint16Array(numOfCells)
    let cellPointer = 0
    for(let i = 0; i < numOfCells; i++) {
      cellPointer = i * Uint16Array.BYTES_PER_ELEMENT
      dataView.setUint8(0, bytes[cellPointer])
      dataView.setUint8(1, bytes[cellPointer + 1])
      cells[i] = dataView.getUint16(0, true)
    }
    return cells
  }
}