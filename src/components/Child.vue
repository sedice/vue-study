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
