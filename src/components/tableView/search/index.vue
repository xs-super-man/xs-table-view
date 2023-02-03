<script>
import searchMap from './utils/searchMap'
import ColumnFilter from '../tree/index.vue'
export default {
  name: 'TableSearch',
  props: {
    searchList: {
      type: [Array],
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    treeHandler() {
      this.show = !this.show
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
        {this.$parent.tableOptions?.tree?.show ? <div class='columnFilter'>
          <el-button
            type='primary'
            {...{ attrs: { ...this.$parent.tableOptions?.tree?.options }}}
            {...{ on: { click: this.treeHandler }}}
          >{this.$parent.tableOptions?.tree?.name ? this.$parent.tableOptions?.tree?.name : '列表筛选'}</el-button>
          {/* {setTimeout(() => {return })} */}
          <ColumnFilter class='columnFilter_box' v-show={this.show} tableList={this.$parent.tableList}/>
        </div> : null}
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
  position: relative;
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
.columnFilter{
  margin-left: 14px;
  position: relative;
}
.columnFilter_box{
  position: absolute;
  z-index: 99;
  left: 0%;
  top: 40px;
}
</style>
