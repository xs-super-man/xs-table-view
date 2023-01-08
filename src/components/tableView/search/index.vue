<script>
import searchMap from './utils/searchMap'
export default {
  name: 'TableSearch',
  props: {
    searchList: {
      type: [Array],
      default: () => {}
    }
  },
  render(h) {
    return (
      <div class='search'
        style={this.$parent.tableOptions?.searchStyle || {}}
      >
        {this.$slots.searchHeader}
        {this.searchList.map((item) => searchMap.call(this, h, item))}
        {this.$slots.searchMiddle}
        {
          this.$slots.searchButton ? this.$slots.searchButton
            : this.searchList.length > 0 ? <el-button
              type={this.$parent.tableOptions?.searchType || 'primary'}
              on-click={this.$parent.getTableList}>
              {this.$parent.tableOptions?.searchButtonName ?? '搜索'}
            </el-button> : ''
        }
        {this.$slots.searchFooter}
      </div>

    )
  }
}
</script>

<style scoped>
.search{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 30px;
}
.block{
  margin-right: 14px;
  margin-bottom: 10px;
}
.demonstration{
  margin-right: 4px;
}
.el-button{
  margin-bottom: 10px;
}
</style>
