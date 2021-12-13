class Svg {
  constructor(name = 'svg') {
    this.name = name
    this.node = document.createElementNS("http://www.w3.org/2000/svg", this.name)  
  }

  appendChild(element) {
    this.node.appendChild(element.node)
  }

  rotate(deg, rotCenterX = this.node.attributes.x.value, rotCenterY = this.node.attributes.y.value) {
    let rot = 'rotate(' + String(deg) + ',' + rotCenterX + ',' + rotCenterY + ')'
    this.node.setAttribute('transform', rot)
  }

}

class Rect extends Svg {
  constructor(attributes) {
    super('rect')
    for (let key in attributes) {
      this.node.setAttributeNS(null, key, attributes[key])
    }
  }
}
