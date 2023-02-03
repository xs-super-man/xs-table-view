
<script>
import renderBtn from '../../button'
import Image from '../../..//utils/type/image'
export default {
  name: 'TableColumn',
  inject: {
    propDefault: {
      from: 'propDefault'
    }
  },
  props: {
    column: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      scopedSlot: {
        scoped: (row) => {
          if (this.column.type === 'image') {
            return Image.call(this, row.row[this.column.key])
          }
          return renderBtn.call(this, this.column.button, row)
        },
        header: (row) => {
          if (typeof this.column.headerRender === 'function') {
            const h = this.$createElement
            return this.column.headerRender(h, row)
          }
          return row.column.label
        }
      },
      defaultOptions: {
        label: this.column.name,
        width: this.column.width || '',
        prop: this.column.key,
        fixed: this.column.fixed || false
      }
    }
  },
  created() {

  },
  methods: {
    formatter(row, column, cellValue, index) {
      return row[column.property] ? row[column.property] : this.propDefault
    },
    formatterRender(h, row, column, cellValue, index) {
      return this.column.render(h, { row, column, cellValue, index })
    },
    componentRender() {
      return this.column.button?.length > 0 || this.column.type === 'image'
    }

  },
  render(h) {
    // return !this.column.tableShow ? h('el-table-column', {
    //   attrs: {
    //     formatter: this.column.render
    //       ? (...agr) => this.formatterRender(h, ...agr) : this.formatter,
    //     ...this.defaultOptions,
    //     ...this.column.options

    //   },
    //   scopedSlots: this.scopedSlot,
    //   on: {

    //   },
    //   key: this.column.name
    // }, [
    //   this.componentRender() ? this.scopedSlot.scoped
    //     : this.column.children?.length > 0
    //       ? this.column.children.map(item => (
    //         <TableColumn
    //           column={item}
    //         ></TableColumn>
    //       )) : ''
    // ]) : null
    return (
      !this.column.tableShow
        ? <el-table-column
          key={this.column.name}
          formatter={this.column.render
            ? (...agr) => this.formatterRender(h, ...agr) : this.formatter}
          {...{ attrs: { ...this.defaultOptions, ...this.column.options }} }
          {... { scopedSlots: this.scopedSlot } }
        >
          { this.componentRender() ? this.scopedSlot.scoped
            : this.column.children?.length > 0
              ? this.column.children.map(item => (
                <TableColumn
                  column={item}
                ></TableColumn>
              )) : ''
          }
        </el-table-column>
        : null
    )
  }
}
</script>

<style scoped>

</style>
