<script>
import { deepClone } from '../../utils/index'
export default {
  name: 'ColumnFilter',
  inject: {
    treeRefresh: {
      from: 'treeRefresh'
    }
  },
  props: {
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keyArr: [],
      treeList: []
    }
  },
  created() {
    const localArr = JSON.parse(localStorage.getItem(this.$route?.path || 'testTree')) || ''
    this.initTableShow(this.tableList)
    if (localArr) {
      this.keyArr = this.arrFlat(localArr)
      const flag = this.comparison(localArr, this.tableList)
      if (flag !== 'no') {
        this.treeList = localArr
        this.treeRefresh(this.treeList)
      } else {
        this.keyArr = this.arrFlat(this.tableList)
        this.treeList = deepClone(this.tableList)
      }
    } else {
      this.keyArr = this.arrFlat(this.tableList)
      this.treeList = deepClone(this.tableList)
    }
  },
  methods: {
    handleNodeClick(data, params) {
      data.tableShow = !data.tableShow
      if (data.children?.length) {
        this.deepShow(data)
        return
      }
    },
    deepShow(data) {
      data.children.forEach(item => {
        item.tableShow = data.tableShow
        if (item.children) {
          this.deepShow(item.children)
        }
      })
    },
    treeSave() {
      this.treeRefresh(this.treeList)
      this.$parent.show = false
      localStorage.setItem(this.$route?.path || 'testTree', JSON.stringify(this.tableList))
    },
    // treeClear() {
    //   this.$refs.tree.setCheckedKeys([])
    //   this.clear(this.tableList)
    // },
    // clear(arr) {
    //   arr.forEach(item => {
    //     if (item.children?.length) {
    //       this.clear(item.children)
    //     }
    //     item.tableShow = false
    //   })
    // },
    arrFlat(arr) {
      return arr.reduce((pre, cur) => {
        if (!cur.tableShow && !cur.children?.length) {
          pre.push(cur.key)
        } else if (!cur.tableShow && cur.children?.length) {
          return pre.concat(this.arrFlat(cur.children))
        }
        return pre
      }, [])
    },
    initTableShow(list) {
      list.forEach(item => {
        this.$set(item, 'tableShow', item.tableShow || false)
        if (item.children?.length) {
          this.initTableShow(item.children)
        }
      })
    },
    // 缓存比较 key有新增、删减或顺序调换
    comparison(oldArr, newArr) {
      for (let i = 0; i < newArr.length; i++) {
        if (oldArr[i].key !== newArr[i].key) {
          return 'no'
        } else {
          if (newArr[i].children?.length) {
            if (!oldArr[i].children?.length) {
              return
            }
            return this.comparison(oldArr[i].children, newArr[i].children)
          }
        }
      }
    }
  },
  render(h) {
    return (
      <div>
        <el-tree
          data={this.treeList}
          show-checkbox
          node-key='key'
          ref='tree'
          class='tree'
          default-checked-keys={this.keyArr}
          {...{ on: { 'check': this.handleNodeClick }}}
          {...{ attrs: { props: { children: 'children', label: 'name' }}}}
        >
        </el-tree>
        <div class={'button_box'}>
          {/* <el-button
            class='clear_btn'
            click={this.treeClear}
            {...{ on: { click: this.treeClear }}}
          >清空</el-button> */}
          <el-button
            type='primary'
            {...{ on: { click: this.treeSave }}}
          >保存</el-button>
        </div>

      </div>
    )
  }
}
</script>

<style scoped>
.button_box{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.clear_btn{
  margin-right: 14px;
}
.tree{
  padding: 0px 10px;
}
</style>
