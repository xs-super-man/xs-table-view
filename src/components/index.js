import table from './tableView/index'
const plugins = [table]
export default function install(Vue) {
  plugins.forEach(component => {
    Vue.component(component.name, component)
  })
}
