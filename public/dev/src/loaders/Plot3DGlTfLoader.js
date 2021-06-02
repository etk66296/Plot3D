class Plot3DGlTfLoader extends Plot3DLoader{
  constructor() {
    super()

    this.gltfRequester = new XMLHttpRequest()
  }

  requestGlTf(url) {
    this.gltfRequester.open('GET', url, false)
    this.gltfRequester.send(null)
    if (this.gltfRequester.status === 200) {
      console.log(this.gltfRequester)
    }
  }
}