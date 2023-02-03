<script>

export default {
  name: 'TablePagination',
  inject: {
    requestData: {
      from: 'requestData'
    },
    tableRefresh: {
      from: 'tableRefresh'
    },
    tableOptions: {
      from: 'tableOptions'
    },
    setRequestData: {
      from: 'setRequestData'
    }
  },
  data() {
    return {
      defaultOptions: {
        pageSizes: [10, 20, 50, 100, 400],
        layout: 'sizes, prev, pager, next, jumper',
        total: 10
      },
      defaultOnchange: {
        'size-change': this.handleSizeChange,
        'current-change': this.handleCurrentChange
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.setRequestData({ currentPage: 1 })
      this.setRequestData({ pageSize: val })
      this.tableRefresh()
    },
    handleCurrentChange(val) {
      this.setRequestData({ currentPage: val })
      this.tableRefresh()
    }
  },
  render(h) {
    return (
      <div class='block pagination'>
        <el-pagination
          currentPage={ this.requestData().currentPage}
          pageSize={this.requestData().pageSize}
          {...{ attrs: { ...this.defaultOptions, ...this.tableOptions?.pagination || {}}}}
          {...{ on: { ...this.defaultOnchange, ...this.tableOptions?.pagination?.events }}}
        >
        </el-pagination>
      </div>
    )
  }
}
</script>

<style>
.pagination{
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
</style>
