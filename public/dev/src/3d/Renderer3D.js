class Renderer3D extends Renderer {
  constructor() {
    super()

    this.exceptions.NoRenderable3DObject = function(message) {
      this.message = message
      this.name = 'NoRenderable3D'
    }

    this.activeCamera = null

  }

  process() {
    this.activeCamera.draw()
  }

  addRenderable3D(renderable3dObj) {
    let objectIsInstanceOf = renderable3dObj.constructor.name
    if (objectIsInstanceOf === 'Camera3D') {
      this.activeCamera = renderable3dObj
      this.renderables.cameras.push(this.activeCamera)
    } else if (objectIsInstanceOf === 'TriangleMesh3D') {
      this.renderables.drawings.push(renderable3dObj)
    } else {
      throw new this.exceptions.NoRenderable3DObject(
        `Renderer3D does noch accept the object. Just instances
        of the classes Camera3D and TriangleMesh3D are allowed.`
      )
    }
  }
}
