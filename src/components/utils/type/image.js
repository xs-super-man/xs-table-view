const render = function image(url) {
  const h = this.$createElement
  return (
    <el-image
      src={url || ''}
      fit='fit'
      style={{ width: '100%', height: '100%' }}
      lazy
    >
    </el-image>
  )
}

export default render
