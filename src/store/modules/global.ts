import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import store from '@/store'

@Module({
  namespaced: true,
  name: 'global-config',
  store,
  dynamic: true
})
class GlobalModule extends VuexModule {
  globalConfig = {
    pageLoading: false,
    loading: false,
    needHeader: true,
    needFooter: false,
    title: ''
  }

  get loading() {
    return (this.globalConfig && this.globalConfig.loading)
  }

  get title() {
    return (this.globalConfig && this.globalConfig.title)
  }

  get pageLoading() {
    return (this.globalConfig && this.globalConfig.pageLoading)
  }

  get needHeader() {
    return (this.globalConfig && this.globalConfig.needHeader) 
  }

  get needFooter() {
    return (this.globalConfig && this.globalConfig.needFooter)
  }

  @Mutation
  updateLoading() {
    this.globalConfig.loading = !this.globalConfig.loading
  }

  @Mutation
  updateTitle(title: string) {
    this.globalConfig.title = title
  }

  @Mutation
  updatePageLoading() {
    this.globalConfig.pageLoading = !this.globalConfig.pageLoading
  }
}

export default getModule(GlobalModule)
