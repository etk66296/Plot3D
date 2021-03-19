class ShaderFactory extends PlotterObject {
  constructor(glCntxt) {
    super()

    this.glCntxt = glCntxt
    this.program = null
    this.fragmentSource = null
    this.vertexSource = null
    this.attributes = null
    this.uniforms = null
    
    this.vertexShaderCode = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
      attribute vec3 aVertexNormal;

      uniform mat4 uNormalMatrix;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying lowp vec4 vColor;
      varying highp vec3 vLighting;
    
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = directionalLightColor * directional;
        vColor = aVertexColor;
      }
    `
    this.fragmentShaderCode = `
      varying lowp vec4 vColor;
      varying highp vec3 vLighting;
      void main(void) {
        gl_FragColor =  vec4(vColor.rgb * vLighting, vColor.a);
        // gl_FragColor = vColor;
      }
    `

    this.debugLog('..compile vertex shader')
    this.vertexSource = this.glCntxt.createShader(this.glCntxt.VERTEX_SHADER)
    this.glCntxt.shaderSource(this.vertexSource, this.vertexShaderCode)
    this.glCntxt.compileShader(this.vertexSource)

    this.debugLog('..compile fragment shader')
    this.fragmentSource = this.glCntxt.createShader(this.glCntxt.FRAGMENT_SHADER)
    this.glCntxt.shaderSource(this.fragmentSource, this.fragmentShaderCode)
    this.glCntxt.compileShader(this.fragmentSource)

    if (!this.glCntxt.getShaderParameter(this.vertexSource, this.glCntxt.COMPILE_STATUS) ||
        !this.glCntxt.getShaderParameter(this.fragmentSource, this.glCntxt.COMPILE_STATUS)) {
      this.errorLog([
        'An error occurred compiling the shaders: ',
        'vertex log: ' + this.glCntxt.getShaderInfoLog(this.vertexSource),
        'fragment log: ' + this.glCntxt.getShaderInfoLog(this.fragmentSource)
      ])
      this.glCntxt.deleteShader(this.vertexSource)
      this.glCntxt.deleteShader(this.fragmentSource)
    } else {
      this.debugLog('..link shader program')
      this.program = this.glCntxt.createProgram()
      this.glCntxt.attachShader(this.program, this.vertexSource)
      this.glCntxt.attachShader(this.program, this.fragmentSource)
      this.glCntxt.linkProgram(this.program)
    }

    this.attributes = {
      vertexPosition: this.glCntxt.getAttribLocation(this.program, 'aVertexPosition'),
      vertexNormal: this.glCntxt.getAttribLocation(this.program, 'aVertexNormal'),
      vertexColor: this.glCntxt.getAttribLocation(this.program, 'aVertexColor')
    }
    this.uniforms = {
      projectionMatrix: this.glCntxt.getUniformLocation(this.program, 'uProjectionMatrix'),
      normalMatrix: this.glCntxt.getUniformLocation(this.program, 'uNormalMatrix'),
      modelViewMatrix: this.glCntxt.getUniformLocation(this.program, 'uModelViewMatrix')
    }

  }
}