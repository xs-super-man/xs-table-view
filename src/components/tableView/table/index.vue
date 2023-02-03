<script>
import TableColumn from './components/TableColumn.vue'
import TablePagination from './components/TablePagination.vue'
import renderBtn from '../button'
import Image from '../..//utils/type/image'
let column = {}
export default {
  name: 'TableIndex',
  components: {
    TableColumn,
    TablePagination
  },
  inject: {
    propDefault: {
      from: 'propDefault'
    }
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
      },
      scopedSlot: {
        transfer: (params) => {
          return (row) => {
            if (params.type === 'image') {
              return Image.call(this, row.row[params.key])
            }
            return renderBtn.call(this, params.button, row)
          }
        },
        header: (row) => {
          if (typeof column.headerRender === 'function') {
            const h = this.$createElement
            return column.headerRender(h, row)
          }
          return row.column.label
        },
        headerTransfer: (params) => {
          return (row) => {
            if (typeof params.headerRender === 'function') {
              const h = this.$createElement
              return params.headerRender(h, row)
            }
            return row.column.label
          }
        }
      }
    }
  },
  methods: {
    columnRender(h, data) {
      column = data
      return !data.tableShow ? (
        <el-table-column
          label={data.name}
          prop={data.key}
          key={data.name}
          width={data.width}
          fixed={data.fixed ?? false}
          {...{ attrs: { ...data.options }} }
          formatter ={ data.render
            ? (...agr) => this.formatterRender(h, ...agr, data) : this.formatter}
          {...{ scopedSlots: { header: this.scopedSlot.headerTransfer(data) }}}
        >
          {/* {data.headerRender ? this.scopedSlot.header : null} */}
          { this.componentRender(data) ? this.scopedSlot.transfer(data) : data.children?.length ? data.children.map(item => {
            return this.columnRender(h, item)
          }) : null }
        </el-table-column>
      ) : null
    },
    formatter(row, column, cellValue, index) {
      return row[column.property] ? row[column.property] : this.propDefault
    },
    formatterRender(h, row, column, cellValue, index, data) {
      return data.render(h, { row, column, cellValue, index })
    },
    componentRender(data) {
      return data.button?.length > 0 || data.type === 'image'
    }
  },
  render(h) {
    return (
      <div class='table'>
        <el-table
          data={this.tableData}
          {...{ attrs: { ...this.defaultOptions, ...this.$parent.tableOptions }}}
          {...{ on: { ...this.$parent.tableOptions?.events || {}}}}
        >
          {this.$parent.tableOptions?.type ? <el-table-column
            type={this.$parent.tableOptions?.type}
            width={this.$parent.tableOptions?.typeWith || '55'}>
          </el-table-column> : '' }

          {this.tableList.map(item => (
            this.columnRender(h, item)
          ))}

          {/* {this.tableList.map(item => (
            <TableColumn
              column={item}
            />
          ))} */}
        </el-table>
        {this.$parent.tableOptions?.pagination?.show ? null : < TablePagination/> }
      </div>
    )
  }
}
</script>

<style scoped >

</style>
