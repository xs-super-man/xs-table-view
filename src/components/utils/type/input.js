const optionDefault = {
  clearable: true,
  placeholder: '请输入'
}
const render = function (h, params, type) {
  const data = (type === 'search' ? params.search : params.popup) || {}
  data.value = typeof data.value === 'boolean' ? String(data.value) : data.value
  return (
    <div class='block'>
      <span class='demonstration'>{ !data.showSearchName ? data.searchName || params.name + ':' : '' }</span>
      <el-input
        {...{ attrs: { ...optionDefault, ...data.options }}}
        v-model={data.value}
        style={ data.style || { width: '240px' }}
      >
      </el-input>
    </div>
  )
}

export default render
