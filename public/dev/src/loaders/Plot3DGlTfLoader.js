class Plot3DGlTfLoader extends Plot3DLoader{
  constructor() {
    super()

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
    let raw = window.atob(data)
    // let len = raw.length
    // let bytes = new Uint8Array(len)
    // for (var i = 0; i < len; i++) {
    //   bytes[i] = raw.charCodeAt(i)
    // }
    // console.log(bytes)
  }
}