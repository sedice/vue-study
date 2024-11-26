import Konva from 'konva'

type PenConfig = Partial<Pick<Konva.LineConfig, 'stroke' | 'strokeWidth'>>

export class KonvaEditor {
  public container: HTMLDivElement
  public stage: Konva.Stage
  public layer: Konva.Layer

  public mode: 'brush' | 'eraser' = 'brush'

  public penConfig: PenConfig = {
    stroke: '#000',
    strokeWidth: 5,
  }

  constructor(container: HTMLDivElement) {
    this.container = container

    const { clientWidth, clientHeight } = container

    const stage = (this.stage = new Konva.Stage({
      container: container,
      width: clientWidth,
      height: clientHeight,
    }))

    const layer = (this.layer = new Konva.Layer({}))
    stage.add(layer)

    this.initDraw()
  }

  private initDraw() {
    const { stage, layer } = this

    let isPaint = false
    /** 上一条正在绘制的线 */
    let lastLine: Konva.Line | null = null

    stage.on('mousedown touchstart', () => {
      isPaint = true
      const pos = stage.getPointerPosition()!
      lastLine = new Konva.Line({
        ...this.penConfig,
        points: [pos.x, pos.y],
        globalCompositeOperation:
          this.mode === 'brush' ? 'source-over' : 'destination-out',
      })
      console.log(lastLine)
      layer.add(lastLine)
    })

    stage.on('mouseup touchend', function () {
      isPaint = false
      lastLine = null
    })

    // and core function - drawing
    stage.on('mousemove touchmove', function () {
      if (!isPaint || !lastLine) {
        return
      }

      const pos = stage.getPointerPosition()!
      const newPoints = lastLine!.points().concat([pos.x, pos.y])
      lastLine!.points(newPoints)
      layer.batchDraw()
    })
  }

  clear() {
    this.layer.destroyChildren()
  }
}
