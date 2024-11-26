import Konva from 'konva'
import { reactive, ref, shallowRef, watch, type ShallowRef } from 'vue'

type PenConfig = Partial<Pick<Konva.LineConfig, 'stroke' | 'strokeWidth'>>

type ToolType = 'brush' | 'eraser'

export const useEditor = () => {
  const containerRef = shallowRef<HTMLDivElement | null>(null)
  const stageRef: ShallowRef<Konva.Stage | null> =
    shallowRef<Konva.Stage | null>(null)
  const layerRef: ShallowRef<Konva.Layer | null> =
    shallowRef<Konva.Layer | null>(null)

  const currentToolType = ref<ToolType>('brush')

  const penConfig: PenConfig = reactive({
    stroke: '#000',
    strokeWidth: 5,
  })

  watch(containerRef, container => {
    if (container) {
      init()
    }
  })

  const init = () => {
    const container = containerRef.value!
    const { clientWidth, clientHeight } = containerRef.value!

    const stage = (stageRef.value = new Konva.Stage({
      container: container,
      width: clientWidth,
      height: clientHeight,
    }))

    const layer = (layerRef.value = new Konva.Layer({}))
    stage.add(layer)

    let isPaint = false
    /** 上一条正在绘制的线 */
    let lastLine: Konva.Line | null = null

    stage.on('mousedown touchstart', () => {
      isPaint = true
      const pos = stage.getPointerPosition()!
      lastLine = new Konva.Line({
        ...penConfig,
        points: [pos.x, pos.y],
        globalCompositeOperation:
          currentToolType.value === 'brush' ? 'source-over' : 'destination-out',
      })
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

  const clear = () => {
    layerRef.value?.destroyChildren()
  }

  return {
    containerRef,
    stageRef,
    layerRef,
    currentToolType,
    penConfig,
    clear,
    init,
  }
}
