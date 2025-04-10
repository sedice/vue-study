import { shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { type ECharts, type EChartsInitOpts } from 'echarts'
import { echarts } from '@/plugins/echarts'

export type UseEchartsOptions = {
  container: MaybeRefOrGetter<HTMLElement | null | undefined>
  initOptions?: Partial<EChartsInitOpts>
}

export const useEcharts = (options: UseEchartsOptions) => {
  const echartsInstance = shallowRef<ECharts | null>(null)

  watch(
    () => toValue(options.container),
    container => {
      if (container) {
        echartsInstance.value = echarts.init(
          container,
          undefined,
          options.initOptions,
        ) as any
      } else {
        echartsInstance.value?.dispose()
      }
    },
    {
      immediate: true,
    },
  )

  return {
    echartsInstance,
  }
}
