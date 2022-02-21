class RandomShapes extends HTMLElement {
  constructor() {
    super()

    // TODO: move colors and shapesTotal to attributes
    this.colors = ['#70D6FF', '#FF70A6', '#FF9770', '#FFD670', '#E9FF70']
    this.shapesTotal = 50

    this.shapes = []
    this.shapesContainer = undefined
  }

  connectedCallback() {
    const prepareColors = this.getAttribute('colors')
      ? this.getAttribute('colors').replaceAll("'", '"')
      : null
    const colorsAttributes = JSON.parse(prepareColors)
    this.colors = Array.isArray(colorsAttributes)
      ? colorsAttributes
      : this.colors
    this.shapesTotal = this.getAttribute('shapes-total') || this.shapesTotal

    if (this.shapesContainer === undefined) {
      this.shapesContainer = document.createElement('div')
      this.appendChild(this.shapesContainer)
    }
    if (this.shapes.length === 0) {
      for (let count = 0; count < this.shapesTotal; count++) {
        let shape = document.createElement('div')
        const size = Math.random() < 0.2 ? Math.random() * 10 : Math.random()

        shape.classList.add('shape')
        shape.style.position = 'absolute'
        shape.style.opacity = Math.random() * 0.8
        shape.style.borderRadius = `${Math.random() * 100}%`
        shape.style.background =
          this.colors[Math.floor(Math.random() * this.colors.length)]
        shape.style.left = `${Math.floor(Math.random() * 100)}vw`
        shape.style.top = `${Math.floor(Math.random() * 100)}vh`
        shape.style.transform = `scale(${Math.random()})`
        shape.style.width = `${size}em`
        shape.style.height = shape.style.width
        shape.style.zIndex = Math.floor(size * 100)

        this.animateShape(shape, this.shapes.length, size)

        this.shapes.push(shape)
        this.shapesContainer.appendChild(shape)
      }
    }
  }

  animateShape(shape, index, size) {
    let additionFrameChance = 0.5
    const keyFrames = ['translate(0, 0)']
    while (keyFrames.length < 2 || Math.random() < additionFrameChance) {
      keyFrames.push(
        `translate(${Math.random() * (index % 2 === 0 ? -11 : 11)}rem, ${
          Math.random() * 12
        }rem)`
      )
      additionFrameChance *= 0.75
    }
    let anim = shape.animate(
      keyFrames.map((translate) => {
        return {
          transform: translate,
        }
      }),
      {
        duration: (Math.random() + 1) * (2000 * size),
        direction: Math.random() > 0.5 ? 'alternate' : 'alternate-reverse',
        fill: 'both',
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    )
  }
}

customElements.define('random-shapes', RandomShapes)
