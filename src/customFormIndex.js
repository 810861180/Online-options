import 'normalize.css/normalize.css'

import MakingForm from '@/components/custom-form/Container'
import GenerateForm from '@/components/custom-form/GenerateForm'

import '@/assets/styles/iconfont.css'
import '@/assets/scss/cover.scss'
import '@/assets/scss/customForm.scss'

MakingForm.install = function (Vue) {
  Vue.component(MakingForm.name, MakingForm)
}

GenerateForm.install = function (Vue) {
  Vue.component(GenerateForm.name, GenerateForm)
}

const components = [
  MakingForm,
  GenerateForm
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  MakingForm,
  GenerateForm
}

export default {
  install,
  MakingForm,
  GenerateForm
}
