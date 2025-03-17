# 示例

```vue
<template>
  <div>Child</div>
</template>

<script setup lang="ts">
defineExpose({
  hello() {
    console.log('hello')
  },
  test() {
    console.log('test')
  },
  name: 'Child',
})
</script>
```

```vue
<template>
  <div>
    <div>Parent</div>
    <Child />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const child = ref<InstanceType<typeof Child>>()

defineExpose({})
</script>
```
