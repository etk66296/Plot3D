class Renderer3D extends Renderer {
  constructor() {
    super()

    this.exceptions.NoRenderable3DObject = function(message) {
      this.message = message
      this.name = 'NoRenderable3D'
    }
    this.exceptions.NoCamera3DObject = function(message) {
      this.message = message
      this.name = 'NoCamera3D'
    }

    this.activeCamera = null

  }

  process() {
    if (this.activeCamera.constructor.name === 'Camera3D') {
      this.activeCamera.update()
      this.activeCamera.draw()
    } else {
      throw new this.exceptions.NoCamera3DObject('Processing the active camera failed.')
    }

    this.renderables.drawings.forEach((drawing) => {
      if (drawing.constructor.name === 'TriangleMesh3D') {
        if (drawing.isActive) {
          drawing.update()
        }

      } else {
        throw new this.exceptions.NoRenderable3DObject('Object is not an instance of Renderable3D')
      }
      
    })
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
