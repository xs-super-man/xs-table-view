const optionDefault = {
  type: 'primary',
  size: 'small'
}
function handlerShow(params, scope) {
  return typeof params.events?.hidden === 'function' && params.events.hidden(scope) || false
}
function eventHandler(events, scope) {
  return events ? Object.entries(events).reduce((pre, [key, value]) => {
    return { ...pre, [key]: () => value(scope) }
  }, {}) : {}
}
export default function(data, scope) {
  const h = this.$createElement
  return (
    data.map(item => (
      !handlerShow(item, scope)
        ? <el-button
          {...{ attrs: { ...optionDefault, ...item.options }}}
          {...{ on: { ...eventHandler(item.events, scope) }}}
        >
          {item.render && item.render(h, item) || item.name}
        </el-button> : ''
    ))
  )
}
