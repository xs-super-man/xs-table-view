<script>
import TableView from './table/index'
import Search from './search/index'
import './popup/index.js'
import { deepClone } from '../utils/index.js'
export default {
  name: 'XsTableView',
  components: {
    TableView,
    Search
  },
  provide () {
    return {
      propDefault: this.propDefault,
      requestData: () => this.requestData,
      setRequestData: (params) => {
        this.requestData = { ...this.requestData, ...params }
      },
      tableRefresh: this.tableRefresh,
      tableOptions: this.tableOptions
    }
  },
  props: {
    tableList: {
      type: Array,
      default: () => {}
    },
    propDefault: {
      type: [String, Number],
      default: '-'
    },
    request: {
      type: Object,
      default: () => {}
    },
    tableOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      requestData: {
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      searchList: [],
      total: 0
    }
  },
  async created() {
    const arr = this.tableList.filter(item => item.search).map(item => {
      item.search.value = item.search.value || ''
      return item
    })
    this.searchList = deepClone(arr)
    for (const key in this.request) {
      if (key === 'getTableList') {
        await this.getTableList()
      } else {
        this.request[key]()
      }
    }
  },
  methods: {
    async getTableList() {
      this.tableData = await this.request.getTableList({ ...this.requestData, ...this.searchData() })
    },
    searchData() {
      return this.searchList.reduce((pre, cur) => {
        if (cur.search.type === 'date') {
          if (cur.searchKey && Object.prototype.toString.call(cur.searchKey) === '[object Object]') {
            Object.keys(cur.searchKey).forEach((item, index) => {
              pre[item] = cur.search.value[index]
            })
          } else {
            pre[cur.searchKey ?? cur.key] = cur.search.value.join(',') || ''
          }
          return pre
        }
        pre[cur.searchKey ?? cur.key] = cur.search.value || ''
        return pre
      }, {})
    },
    tableRefresh(callback) {
      this.getTableList().then(() => {
        typeof callback === 'function' && callback('success')
      }).catch(() => {
        typeof callback === 'function' && callback('error')
      })
    }
  },
  render(h) {
    return (
      <div>
        {!this.tableOptions?.searchShow
          ? <Search
            searchList={this.searchList}
            getTableList={this.getTableList}
          >
            {Object.keys(this.$slots).map(name => (
              <template slot={name}>
                {this.$slots[name]}
              </template>
            ))}
          </Search>
          : ''
        }
        <div slot='search'>
          {this.$slots.search}
        </div>

        <TableView
          table-data={this.tableData}
          table-list={this.tableList}
        ></TableView>
      </div>
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding:0
}
</style>
