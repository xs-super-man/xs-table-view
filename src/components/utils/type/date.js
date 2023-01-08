const optionDefault = {
  clearable: true,
  type: 'datetimerange',
  placeholder: '选择日期',
  rangeSeparator: '至',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  valueFormat: 'yyyy-MM-dd',
  format: 'yyyy-MM-dd'
}
export default function (h, params, type) {
  const data = (type === 'search' ? params.search : params.popup) || {}
  return (
    <div class='block'>
      <span class='demonstration'>{ !data.showSearchName ? data.searchName || params.name + ':' : '' }</span>
      <el-date-picker
        v-model={data.value}
        {...{ attrs: { ...optionDefault, ...data.options }}}
      >
      </el-date-picker>
    </div>
  )
}

