import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// jsx 支持组件属性
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any
    ref?: string
  }
}

declare module 'vue/types/vue' {
  export interface Vue {}
}