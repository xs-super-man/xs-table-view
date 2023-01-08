<script>
import popupMap from '../utils/popupMap'
import { deepClone } from '../../../utils/index'
export default {
  name: 'TablePopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tableList: {
      type: [Array],
      default: () => []
    },
    callback: {
      type: Function,
      default: () => {}
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: ' 确定'
    },
    width: {
      type: [String, Number],
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: [Object, Array],
      default: () => {}
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      dialogVisible: false,
      popupList: []
    }
  },
  watch: {
    tableList(newVal) {
      const arr = deepClone(this.arrFlat(this.tableList))
      arr.forEach(item => {
        if (!item.popup) {
          item['popup'] = {}
          item['popup']['value'] = this.data?.row[item.key] || ''
          item.popup['type'] = item.search?.type || 'input'
        }
      })
      this.popupList = arr
    },
    type(newVal) {
      if (newVal === 'add') {
        this.popupList.forEach(item => {
          item['popup']['value'] = ''
        })
      } else {
        this.popupList.forEach(item => {
          item['popup']['value'] = item.popup.value || this.data?.row[item.key] || ''
        })
      }
    },
    data(newVal) {
      this.popupList.forEach(item => {
        item['popup']['value'] = item.popup.value || newVal?.row[item.key] || ''
      })
    }

  },
  created() {
  },
  methods: {
    cancel() {
      const obj = this.popupReslut()
      this.callback && this.callback(obj, 'close')
    },
    confirm() {
      const obj = this.popupReslut()
      this.callback && this.callback(obj, 'confirm')
    },
    popupReslut() {
      return this.popupList.reduce((pre, cur) =>
        ((pre[cur.key] = cur.popup.value), pre), {})
    },
    arrFlat(arr) {
      return arr.reduce((pre, cur) => {
        if (!cur.popup?.popupShow && !cur.children?.length && !cur.button && !cur.tableShow) {
          return pre.concat([cur])
        } else if (cur.children?.length) {
          return pre.concat(this.arrFlat(cur.children))
        }
        return pre
      }, [])
    }
  },
  render(h) {
    return (
      <el-dialog
        title={this.title}
        width={this.width}
        visible={this.value}
        before-close={this.cancel}>
        {this.popupList.map((item) => item.popup.popupRender ? item.popup.popupRender(h)
          : popupMap.call(this, h, item))}
        <span slot='footer' class='dialog-footer'>
          <el-button on-click={this.cancel}>{this.cancelText}</el-button>
          <el-button type='primary' on-click={this.confirm}>{this.confirmText}</el-button>
        </span>
      </el-dialog>
    )
  }
}
</script>

<style scoped>
 .demonstration{
  margin: 0px 10px;
}
.block{
  margin: 10px 0px;
}
</style>
