<template>
  <div class="wrapper p-2">
    <div class="container" ref="containerRef"></div>
    <footer class="toolbar space-x-2 mt-2">
      <Button @click="handleClear">清屏</Button>
      <Button @click="changeToBrush">笔刷</Button>
      <Button @click="changeToEraser">橡皮擦</Button>
      <Popover>
        <Button>颜色</Button>
        <template #content>
          <div class="flex grid grid-cols-5 gap-1">
            <div
              class="color-item w-20px h-16px rounded-sm cursor-pointer"
              v-for="color in ['#000', '#ff0', '#f00']"
              :key="color"
              :style="{ background: color }"
              @click="handleChangeColor(color)"
            ></div>
          </div>
          <!--  -->
        </template>
      </Popover>
      <Popover>
        <Button>粗细</Button>
        <template #content>
          <div class="flex grid grid-cols-5 gap-1 items-center">
            <div
              class="color-item w-20px h-16px rounded-sm cursor-pointer border"
              v-for="width in [4, 6, 8, 10, 12, 14]"
              :key="width"
              :style="{ background: getStrokeColor(), height: width + 'px' }"
              @click="handleChangeWidth(width)"
            ></div>
          </div>
          <!--  -->
        </template>
      </Popover>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from './useEditor'
import { Button, Popover } from 'ant-design-vue'

defineOptions({
  name: 'App',
})

const { containerRef, currentToolType, penConfig, clear } = useEditor()

const changeToBrush = () => {
  currentToolType.value = 'brush'
}

const changeToEraser = () => {
  currentToolType.value = 'eraser'
}

const handleChangeColor = (color: string) => {
  penConfig.stroke = color
}

const handleChangeWidth = (width: number) => {
  penConfig.strokeWidth = width
}

const getStrokeColor = () => {
  return penConfig.stroke as string
}

const handleClear = () => {
  clear()
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 1280px;
  margin: 50px auto;
  border: 1px solid;

  .container {
    height: 720px;
  }

  .toolbar {
    height: 30px;
  }
}
</style>
