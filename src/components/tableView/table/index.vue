<script>
import TableColumn from './components/TableColumn.vue'
import TablePagination from './components/TablePagination.vue'
export default {
  name: 'TableIndex',
  components: {
    TableColumn,
    TablePagination
  },
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultOptions: {
        border: true,
        size: 'medium',
        fit: true,
        style: { width: '100%' }
      }
    }
  },
  render() {
    return (
      <div class='table'>
        <el-table
          data={this.tableData}
          {...{ attrs: { ...this.defaultOptions, ...this.$parent.tableOptions }}}
          {...{ on: { ...this.$parent.tableOptions?.events || {}}}}
        >
          {this.tableList.map(item => (
            <TableColumn
              column={item}
            />
          ))}
        </el-table>
        <TablePagination

        />
      </div>
    )
  }
}
</script>

<style scoped >

</style>
