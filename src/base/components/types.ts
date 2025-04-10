import { Form, FormItem, Input, Select } from 'ant-design-vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { type Component, type CSSProperties, type MaybeRefOrGetter } from 'vue'

export interface BfrFormInputMap {
  input: typeof Input
  select: typeof Select
}

export const componentMap: BfrFormInputMap = {
  input: Input,
  select: Select,
}

type AntdFormItemProps = Omit<ComponentProps<typeof FormItem>, 'style'> & {
  style?: string | CSSProperties
}

type BaseFormItemProps = Omit<AntdFormItemProps, 'hidden'> & {
  modelKey?: string
  hidden?: MaybeRefOrGetter<boolean>
}

type FormProps<T extends Component, Type> = BaseFormItemProps & {
  type: Type
  dynamicProps?: () => BaseFormItemProps
  componentProps?: ComponentProps<T>
  dynamicComponentProps?: () => ComponentProps<T>
  [index: string]: any
}

export type IBaseInputProps = {
  [K in keyof BfrFormInputMap]: FormProps<BfrFormInputMap[K], K>
}[keyof BfrFormInputMap]

type CustomRenderInput = AntdFormItemProps & {
  type: 'custom'
  componentRender?: () => any
  render?: () => any
}

export type BfrFormItemProps = IBaseInputProps | CustomRenderInput
