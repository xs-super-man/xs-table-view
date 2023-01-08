const optionDefault = {
  multiple: false,
  clearable: true,
  filterable: true,
  placeholder: '请选择'
}
export default function (h, params, type) {
  const data = (type === 'search' ? params.search : params.popup) || {}
  params.search?.list && !data.list ? data.list = params.search.list : ''
  return (
    <div class='block'>
      <span class='demonstration'>{ !data.showSearchName ? data.searchName || params.name + ':' : '' }</span>
      <el-select
        {...{ attrs: { ...optionDefault, ...data.options }}}
        {...{ on: { ...data.onClick }}}
        v-model={data.value}
      >
        {data.list.map(item => (
          <el-option
            label={item.label}
            value={item.value}
            disabled={item.disabled}
          >
          </el-option>
        ))}
      </el-select>
    </div>
  )
}

