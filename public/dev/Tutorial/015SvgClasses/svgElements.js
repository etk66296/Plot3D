class Svg {
  constructor(name = 'svg', attributes = {}) {

    this.name = name
    this.node = document.createElementNS("http://www.w3.org/2000/svg", this.name)

    this.attributes = attributes
  }

  appendChild(element) {
    this.node.appendChild(element.node)
  }

  rotate(deg, rotCenterX = this.node.attributes.x.value, rotCenterY = this.node.attributes.y.value) {
    let rot = 'rotate(' + String(deg) + ',' + rotCenterX + ',' + rotCenterY + ')'
    this.node.setAttribute('transform', rot)
  }

  translate(x, y) {
    let translate = 'translate(' + String(x) + ',' + String(y) + ')'
    this.node.setAttribute('transform', translate)
  }

  rotateAndTranslate(deg, x, y, rotCenterX = this.node.attributes.x.value, rotCenterY = this.node.attributes.y.value) {
    let transformation = 'rotate(' + String(deg) + ',' + rotCenterX + ',' + rotCenterY + ')'
    transformation += ' translate(' + String(x) + ',' + String(y) + ')'
    this.node.setAttribute('transform', transformation)
  }

}

class Rect extends Svg {
  constructor(attributes) {
    super('rect', attributes)
    for (let key in attributes) {
      this.node.setAttributeNS(null, key, attributes[key])
    }
  }
}


class Circle extends Svg {
  constructor(attributes) {
    super('circle', attributes)
    // cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"
    for (let key in attributes) {
      this.node.setAttributeNS(null, key, attributes[key])
    }
  }
}
