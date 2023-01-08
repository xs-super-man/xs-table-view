const render = function(arr) {
  return (
    arr.map(item => (
      <el-radio v-model={item.radioList.value} label={item.radioList.label}>{item.radioList.name}</el-radio>
    ))
  )
}
export default render
