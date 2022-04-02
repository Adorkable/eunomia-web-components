import { sleep } from '../Utility'

export class AnimatedField extends HTMLElement {
  updateId: number | null
  field: HTMLDivElement

  constructor() {
    super()

    this.updateId = null
    this.field = document.createElement('div')
  }

  connectedCallback() {
    if (!this.getAttribute('words')) {
      this.setAttribute('words', '[]')
    }

    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.field.setAttribute(
      'class',
      [this.getAttribute('class'), 'field'].join(' ')
    )

    shadowRoot.appendChild(this.field)

    if (this.autostart) {
      this.startAnimating()
    }
  }

  get autostart() {
    const value = this.getAttribute('autostart')
    if (typeof value === 'string') {
      // for empty string attribute shorthand
      return true
    }
    return value || false
  }

  get words() {
    let resultString = this.getAttribute('words')
    if (!resultString) {
      return []
    }
    return JSON.parse(resultString)
  }

  set words(newValue: string[]) {
    if (!Array.isArray(newValue)) {
      throw new Error('words must be an array')
    }
    this.setAttribute('words', JSON.stringify(newValue))
  }

  get random() {
    const value = this.getAttribute('random')
    if (typeof value === 'string') {
      // for empty string attribute shorthand
      return true
    }
    return value || false
  }

  set random(newValue: boolean) {
    if (typeof newValue !== 'boolean') {
      throw new Error('random must be a boolean')
    }
    this.setAttribute('random', JSON.stringify(newValue))
  }

  async startAnimating(
    updateFrequencyMilliseconds = 500,
    updater = AnimatedField.typeUpdater
  ) {
    this.updateId = await this.startUpdater(
      updateFrequencyMilliseconds,
      updater
    )
    // $('#applicationsOfWorkTitle').addClass('show')
    return this.updateId
  }

  async stopAnimating() {
    if (this.updateId) {
      clearInterval(this.updateId)
      this.updateId = null
    }
  }

  // static async fadeUpdater(element, values, index) {
  // element.addClass('hide')
  // await sleep(somethingOfWorkTransitionMs)
  // element.innerHTML = values[index]
  // element.removeClass('hide')
  // }

  static async typeUpdater(
    element: HTMLElement,
    values: Array<any>,
    index: number
  ) {
    const typeDelay = 50 // TODO: custom type speed
    while (element.innerHTML.length > 0) {
      element.innerHTML = element.innerHTML.slice(0, -1)
      await sleep(typeDelay)
    }

    // TODO: custom delay in between

    const nextValue = values[index]
    while (element.innerHTML.length < nextValue.length) {
      element.innerHTML =
        element.innerHTML + nextValue[element.innerHTML.length]
      await sleep(typeDelay)
    }
  }

  static wrappingIncrement(index: number, arrayForLength: Array<any>) {
    return (index + 1) % arrayForLength.length
  }

  // calculateMaxWidth() {
  //   const fontProperty = getCanvasFontProperty(this.field)

  //   return this.words.reduce((previousValue, test) => {
  //     const width = getTextWidth(test, fontProperty)
  //     if (width > previousValue) {
  //       return width;
  //     }
  //     return previousValue;
  //   }, 0);
  // }

  async startUpdater(
    updateFrequencyMilliseconds: number,
    updater = AnimatedField.typeUpdater
  ): Promise<number> {
    let index = 0

    const perform = async () => {
      // TODO: random order
      await updater(this.field, this.words, index)
      index = AnimatedField.wrappingIncrement(index, this.words)
    }
    await perform()

    let finished = true

    // TODO: option for delay to start when previous finished
    return window.setInterval(async () => {
      if (!finished) {
        return
      }
      finished = false
      await perform()
      finished = true
    }, updateFrequencyMilliseconds)
  }
}

customElements.define('animated-field', AnimatedField)
