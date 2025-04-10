<template>
  <div class="w-600px p-10 mx-auto">
    <BfrForm
      :list="list"
      v-model:model="model"
      layout="vertical"
      :labelCol="{
        style: {
          width: '200px',
        },
      }"
    />
  </div>
</template>

<script setup lang="tsx">
import { Input } from 'ant-design-vue'
import BfrForm from './base/components/BfrForm.vue'
import type { BfrFormItemProps } from './base/components/types'
import { reactive } from 'vue'

const model = reactive({})

const list: BfrFormItemProps[] = [
  {
    label: '用户名',
    labelAlign: 'left',
    type: 'input',
    modelKey: 'value',
    name: 'username',
    class: {
      demo: true,
    },
  },
  {
    type: 'select',
    name: 'test',
    label: '测试下拉框',
    rules: [
      {
        required: true,
        validator(_, v) {
          if (v == '1') {
            return Promise.reject('asdasd')
          }
          return Promise.resolve()
        },
      },
    ],
    componentProps: {
      options: [
        { label: '选项21', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
    dynamicComponentProps: () => {
      return {
        placeholder: '请选择下拉选择',
      }
    },
  },
  {
    type: 'custom',
    label: '自定义渲染',
    componentRender() {
      return (
        <div class="text-red-400">
          <button
            onClick={() => {
              console.log('打印', model)
            }}
          >
            打印
          </button>
        </div>
      )
    },
  },
  {
    type: 'custom',
    render() {
      return <div class="text-red-400 border p-10  mb-2">自定义渲染</div>
    },
  },
  {
    type: 'custom',
    label: <span>测试表头</span>,
    colon: false,
    componentRender() {
      return <div class="text-red-400 border p-10  my-2">自定义渲染</div>
    },
  },
  {
    label: <span>用户名</span>,
    labelAlign: 'left',
    type: 'input',
  },
]
</script>
