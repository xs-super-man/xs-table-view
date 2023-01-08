<script>
export default {
  name: 'TablePopup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      this.dialogVisible = false
    }
  },
  render() {
    return (
      <el-dialog
        title='提示'
        width='30%'
        before-close='handleClose'>
        <span>这是一段信息</span>
        <span slot='footer' class='dialog-footer'>
          <el-button on-click={this.cancel}>取 消</el-button>
          <el-button type='primary' on-click={this.confirm}>确 定</el-button>
        </span>
      </el-dialog>
    )
  }
}
</script>
