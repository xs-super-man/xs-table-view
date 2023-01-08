import Vue from 'vue'
import Component from './components'
const vm = new (Vue.extend(Component))()
function isInDocument(element) {
  return document.body.contains(element)
}
function Dialog(options) {
  Object.assign(vm.$props, Dialog.defaultOptions, options)
  if (!isInDocument(vm.$el)) {
    vm.$mount()
    document.body.appendChild(vm.$el)
    return vm
  }
}
Dialog.defaultOptions = {
  value: true
}
Dialog.close = function (params) {
  vm.value = params
}
Vue.prototype.$Dialog = Dialog

