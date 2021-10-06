class Plot3DShader extends Plot3DObject {
  constructor() {
    super()

    this.name = ''

    this.program = null
    this.attributeList = []
    this.vertexUniformList = []
    this.fragmentUniformList = []

    this.glAttrLocation = {}
    this.glVertexUniformLocation = {}
    this.glFragmentUniformLocation = {}
    
    this.vertexShaderCode = ''
    this.fragmentShaderCode = ''

    this.glVertexShader = null
    this.glFragmentShader = null
  }

  /*
  Welche Vorteile bringt eine Shader Generierung?

  - Ein TriangleMesh möchte die Model Matrix und die
    Verschiebung in der Welt für seine Vertices
    beeinflussen

  - Die Camera möchte die ganze Welt rotieren und verschieben.
    Nachdem die TriangleMeshes ihre Vertices platziert haben
    verschiebt die aktive Camera die Welt entsprechend ihrer
    "Cameralinse". Zum Ende einer Berechnung von 'gl_Position'
    bildet die Projektionsmatrix die Umgbung auf die
    "Projektionsfläche" ab. Eine Camera kann auch ein Triangle
    Mesh sein. Damit sollen Modelle von einer Camera symbolisch
    im Raum dargestellt werden.
    ==> - Initial und später wenn erforderlich setzt die
          Camera die Projektionsmatrix. Dies ist nach der
          Initialisierung nur noch nach Nutzereingaben, oder
          einer sonstig gewünschten Projektionänderung
          erforderlich.
        - die Camera setzt für einen Programmzyklus die
          das WorldToView Matrix Uniform.
        - Wenn erforderlich setzt die Camera die model Matrix,
          die ModeltoWorld Matrix und die Vertices und Face
          Buffer fest. Alle enthaltenen primitives werden
          an WebGl zum rendern übergeben.
    ==> - Nachdem die Camera die Zustände der Projektions-
          und Worldtoviewmatrix gesetzt hat kommen all die anderen
          Renderobjekte an die Reihe.
        - Jedes Render Objekt darf das Model Matrix Uniform
          und ModeltoWorld Matrix für sich beeinflussen.
        - Wegen möglicher besserer Performance könnte es,
          stand jetzt, später noch sinnvoll sein die Projektions-
          und Viewmatrix zusammenzuführen.
          --> Das wäre dann eine Moel- und eine Cameramatrix.
    ::: Der Shader Builder muss wissen, welche Uniform Informationen,
        für welche Art Triangle Mesh erforderlich sind.
        Bisher gibt es die Unterscheidung:
          - Textured .. Die Primitives werden mit Bild, oder einfarbigen
                        Texturen belegt
          - Colored ..  Die Farbinformation der Primitives werden
                        mit einem Attribute Buffer an WebGl übergeben

  Wie können weitere Shader Effekte organisiert werden?
    - Spot Light, Point Ligts sollen mit Farbinformationen vor einer
      Neucompilierung in den Shader übernommen werden.
      Jedes Mesh muss deshalb Normalen Informationen bereitstellen.
    - Techniken wie zum Beispiel das Glühen eines Triangle Meshes
      sind mir noch unbekannt. Wird schon irgendwie hinhaun.

  */

  addMat4Uniform(name) {

  }

  

}