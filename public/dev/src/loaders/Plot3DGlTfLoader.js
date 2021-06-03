class Plot3DGlTfLoader extends Plot3DLoader{
  constructor() {
    super()

    this.gltfRequester = new XMLHttpRequest()
    this.gltfRequester.onreadystatechange = (event) => {
      if (this.gltfRequester.readyState === 4) {
        if (this.gltfRequester.status === 200) {
          console.log(this.gltfRequester.responseText)
        } else {
           console.error(this.gltfRequester.statusText)
        }
    }
    }
  }

  requestGlTf(url) {
    this.gltfRequester.open('GET', url, true)
    this.gltfRequester.send(null)
    console.log("send request")
  }
}