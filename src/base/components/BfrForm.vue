<template>
  <Form :model="modelRef">
    <template v-for="item in list" :key="item.field">
      <template v-if="item.type === 'custom'">
        <template v-if="typeof item.render === 'function'">
          <component :is="item.render?.()" />
        </template>
        <template v-else>
          <FormItem v-bind="item">
            <template v-if="typeof item.componentRender === 'function'">
              <component :is="item.componentRender?.()" />
            </template>
          </FormItem>
        </template>
      </template>
      <template v-else>
        <FormItem v-if="!item.hide?.()" v-bind="genFinnalItemProps(item)">
          <component
            :is="(componentMap as any)[item.type]"
            v-bind="genFinnalComponentProps(item)"
          />
        </FormItem>
      </template>
    </template>
  </Form>
</template>

<script setup lang="tsx">
import { Form, FormItem } from 'ant-design-vue'
import { toValue } from 'vue'
import { type BfrFormItemProps, componentMap } from './types'

defineOptions({
  name: 'BfrForm',
})

const props = withDefaults(
  defineProps<{
    list: BfrFormItemProps[]
  }>(),
  {}
)

const modelRef = defineModel<Record<string, any>>('model', {
  type: Object,
  default: () => [],
})

const genFinnalItemProps = (item: BfrFormItemProps) => {
  const result = {
    ...item,
    componentProps: undefined,
    ...(item as any)?.dynamicProps?.(),
  }
  result.hidden = toValue(item.hidden)
  return result
}

const genFinnalComponentProps = (item: BfrFormItemProps) => {
  const anyItem = item as any

  let result: any = {
    placeholder:
      typeof anyItem.label === 'string' ? '请输入' + anyItem.label : undefined,
  }

  result = {
    ...result,
    ...anyItem.componentProps,
    ...anyItem?.dynamicComponentProps?.(),
  }

  const modelKey = anyItem.modelKey || 'value'

  result[modelKey] = toValue(modelRef.value[anyItem.name])
  result[`onUpdate:${modelKey}`] = (value: any) => {
    modelRef.value[anyItem.name] = value
  }

  return result
}
</script>
