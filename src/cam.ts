import { config } from './config'

type MovePosition = 'left' | 'right' | 'up' | 'down'

type ZoomType = 'in' | 'out'

export class CameraController {
  public videoElement: HTMLVideoElement

  private wrapperElement: HTMLDivElement
  private isFlipped: boolean
  private isRounded: boolean
  private isClipped: boolean
  private position: Record<'x' | 'y' | 'z', number>
  private root: HTMLElement

  constructor() {
    this.wrapperElement = document.getElementById('wrapper') as HTMLDivElement
    this.videoElement = document.getElementById('video') as HTMLVideoElement
    this.root = document.querySelector(':root') as HTMLElement

    this.isFlipped = config.flipHorizontal
    this.isRounded = config.rounded
    this.isClipped = !!config.clipPath

    this.position = {
      x: config.horizontal,
      y: config.vertical,
      z: config.scale,
    }

    this.render()
  }

  public flipHorizontal() {
    this.isFlipped = !this.isFlipped

    this.render()
  }

  public adjustOffset(position: MovePosition) {
    switch (position) {
      case 'up':
        this.position.y -= 1
        break
      case 'down':
        this.position.y += 1
        break
      case 'left':
        this.position.x -= 1
        break
      case 'right':
        this.position.x += 1
        break
    }
    this.render()
  }

  public zoom(type: ZoomType) {
    if (type === 'in') {
      this.position.z += 0.1
    } else {
      this.position.z -= 0.1
    }

    this.render()
  }

  public reset() {
    this.position.z = 1
    this.render()
  }

  public round() {
    this.isRounded = !this.isRounded

    this.render()
  }

  public clip() {
    this.isClipped = !this.isClipped

    this.render()
  }

  private applyPositioning() {
    this.videoElement.style.transform = `translate(${this.position.x}%, ${this.position.y}%) scale(${this.position.z})`

    if (this.isFlipped) {
      this.videoElement.style.transform += 'rotateY(180deg)'
    }
  }

  private applyBorder() {
    if (config.borderColorCss) {
      this.root.style.setProperty('--border-color', config.borderColorCss)
    }

    if (config.showBorder) {
      this.wrapperElement.classList.add('has-border')
    }
  }

  private applyShape() {
    if (this.isRounded) {
      this.wrapperElement.classList.add('rounded')
    } else {
      this.wrapperElement.classList.remove('rounded')
    }

    if (this.isClipped && config.clipPath) {
      this.wrapperElement.classList.add('has-clip-path')
      this.root.style.setProperty('--clip-path', config.clipPath)
    } else {
      this.wrapperElement.classList.remove('has-clip-path')
    }
  }

  private render() {
    this.applyPositioning()
    this.applyBorder()
    this.applyShape()
  }
}
