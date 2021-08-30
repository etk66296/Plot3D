describe("Renderer3D", function() {
  var myRenderer3D
  
  beforeAll(function() {
  })

  beforeEach(function() {    
    myRenderer3D = new Renderer3D()
  })

  it("should have the parent class Renderable3D", function() {
    expect(myRenderer3D.__proto__.__proto__.constructor.name).toEqual('Renderer')
  })

  it("should have a variable with the index to the active camera set", function() {
    expect(myRenderer3D.activeCamera).toEqual(null)
  })

  it("should have a method for adding renderable3d objects to the renderables array", function() {
    expect(typeof myRenderer3D.addRenderable3D).toEqual('function')
  })

  it("should append the exception message NoRenderable3DObject", function() {
    expect(typeof myRenderer3D.exceptions.NoRenderable3DObject).toEqual('function')
  })

  describe('exceptions.NoRenderable3DObject', function() {
    var  myNoRenderableException

    beforeEach(function() {
      myNoRenderableException = new myRenderer3D.exceptions.NoRenderable3DObject('blablba')
    })

    it("should have an attribute message, which is passed by the function parameter", function() {
      expect(myNoRenderableException.message).toEqual('blablba')
    })

    it("should have an attribute name", function() {
      expect(myNoRenderableException.name).toEqual('NoRenderable3D')
    })

  })

  it("should append the exception message NoCamera3DObject", function() {
    expect(typeof myRenderer3D.exceptions.NoCamera3DObject).toEqual('function')
  })

  describe('exceptions.NoCamera3DObject', function() {
    var  myNoCamera3DException

    beforeEach(function() {
      myNoCamera3DException = new myRenderer3D.exceptions.NoCamera3DObject('blablba')
    })

    it("should have an attribute message, which is passed by the function parameter", function() {
      expect(myNoCamera3DException.message).toEqual('blablba')
    })

    it("should have an attribute name", function() {
      expect(myNoCamera3DException.name).toEqual('NoCamera3D')
    })

  })

  describe("addRenderer3D", function() {
    it("should check if the passed object is a instance of a renderable3d.", function() {
      expect(function() { myRenderer3D.addRenderable3D({}) }).toThrow(new myRenderer3D.exceptions.NoRenderable3DObject(
        `Renderer3D does noch accept the object. Just instances
        of the classes Camera3D and TriangleMesh3D are allowed.`
      ))
    })

    it("it sould add a camera to the cameras list", function() {
      class Camera3D { constructor() {} }
      let myCamera = new Camera3D()
      spyOn(myRenderer3D.renderables.cameras, 'push').and.callThrough()
      myRenderer3D.addRenderable3D(myCamera)
      expect(myRenderer3D.renderables.cameras.push).toHaveBeenCalled()
      expect(myRenderer3D.renderables.cameras.length).toEqual(1)
    })

    it("should add triangle meshes 3d to the drawings list", function() {
      class TriangleMesh3D { constructor() {} }
      let myTriangleMesh = new TriangleMesh3D()
      spyOn(myRenderer3D.renderables.drawings, 'push').and.callThrough()
      myRenderer3D.addRenderable3D(myTriangleMesh)
      expect(myRenderer3D.renderables.drawings.push).toHaveBeenCalled()
      expect(myRenderer3D.renderables.drawings.length).toEqual(1)
    })

    it("set the active camera to the passed object when it is type of Camera3D", function() {
      class Camera3D { constructor() {} }
      let myCamera = new Camera3D()
      myRenderer3D.addRenderable3D(myCamera)
      expect(myRenderer3D.activeCamera).toEqual(myCamera)
    })
  })

  it("should have a mehtod execute for render the scene with the present setup", function() {
    expect(typeof myRenderer3D.process).toEqual('function')
  })

  describe('process', function() {
    class Camera3D { constructor(){} update(){} draw(){}}
    class TriangleMesh3D {
      constructor(){
        this.isActive = true
    } update(){} draw(){} }

    it('should call the draw function of the current camera', function() {
      myRenderer3D.activeCamera = new Camera3D()
      spyOn(myRenderer3D.activeCamera, 'draw')
      myRenderer3D.process()
      expect(myRenderer3D.activeCamera.draw).toHaveBeenCalled()
    })

    it('should call the update function of the current camera', function() {
      myRenderer3D.activeCamera = new Camera3D()
      spyOn(myRenderer3D.activeCamera, 'update')
      myRenderer3D.process()
      expect(myRenderer3D.activeCamera.update).toHaveBeenCalled()
    })

    it("should through NoCamera3D when the active camera attriubte is not a instance of Camera3D", function() {
      myRenderer3D.activeCamera = {}
      expect(function() { myRenderer3D.process() }).toThrow(new myRenderer3D.exceptions.NoCamera3DObject(
        `Processing the active camera failed.`
      ))
    })

    it("should update loop through all drawings", function() {
      myRenderer3D.activeCamera = new Camera3D()
      myRenderer3D.renderables.drawings.push(new TriangleMesh3D())
      myRenderer3D.renderables.drawings.push(new TriangleMesh3D())
      spyOn(myRenderer3D.renderables.drawings, 'forEach').and.callThrough()
      myRenderer3D.process()
      expect(myRenderer3D.renderables.drawings.forEach).toHaveBeenCalled()
    })

    it("should throw an error if the drawing is not a rederer 3D", function() {
      myRenderer3D.activeCamera = new Camera3D()
      myRenderer3D.renderables.drawings.push({})
      expect(() => { myRenderer3D.process() }).toThrow(
        new myRenderer3D.exceptions.NoRenderable3DObject('Object is not an instance of Renderable3D')
      )
    })

    it("should call the update method of all active drawings", function() {
      myRenderer3D.activeCamera = new Camera3D()
      triMeshA = new TriangleMesh3D()
      triMeshB = new TriangleMesh3D()
      triMeshB.isActive = false
      myRenderer3D.renderables.drawings.push(triMeshA)
      myRenderer3D.renderables.drawings.push(triMeshB)
      spyOn(triMeshA, 'update')
      spyOn(triMeshB, 'update')
      myRenderer3D.process()
      expect(triMeshA.update).toHaveBeenCalled()
      expect(triMeshB.update).not.toHaveBeenCalled()
    })

    it("should call the draw method of all active drawings", function() {
      myRenderer3D.activeCamera = new Camera3D()
      triMeshA = new TriangleMesh3D()
      triMeshB = new TriangleMesh3D()
      triMeshB.isActive = false
      myRenderer3D.renderables.drawings.push(triMeshA)
      myRenderer3D.renderables.drawings.push(triMeshB)
      spyOn(triMeshA, 'draw')
      spyOn(triMeshB, 'draw')
      myRenderer3D.process()
      expect(triMeshA.draw).toHaveBeenCalled()
      expect(triMeshB.draw).not.toHaveBeenCalled()
    })
  })

})