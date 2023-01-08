<template>
  <xs-table-view ref="xsTableView" :table-list="tableList" :request="requset"></xs-table-view>
</template>

<script>
// import xsTableView from '@/components/tableView/index'
// 这里引入你的接口
import { testApi } from '../utils/request'
export default {
  name: 'AppIndex',
  // components: { xsTableView },
  data() {
    return {
      requset: {
        getTableList: params => {
          // params是搜索的参数
          return testApi({ ...params }).then(res => {
            // 返回一个数组
            return res.data
          })
        }
      },
      // 填入接口返回的key,name是表格表头名称
      tableList: [
        {
          key: 'id',
          name: '用户id',
          search: {
            // 类型，可以定义 select,input,date
            type: 'select',
            value: '',
            options: {
              // options里面可以配置任何select组件内的属性
              multiple: true,
              style: {}
            },
            events: {
              change: (val) => {console.log(val, '-------click')}
            },
            // select 会需要定义一个list key值不能修改，可以动态传入一个数组变量
            // disabled 是否禁止选择
            list: [
              {
                label: '今天',
                value: 1,
                disabled: true
              },
              {
                label: '明天',
                value: 2
              }
            ]
          }
        },
        {
          key: 'name',
          name: '用户昵称',
          search: {
            type: 'input',
            // options里可以配置任何input组件的属性
            options: {}
          },
          popup: {
            popupShow: true
          }
        },
        {
          key: 'phone',
          name: '文本',
          headerRender: (h, { column }) => {
            return h('div', [
              h('span', '哎呦不错哦'),
              h('el-tooltip', {
                props: { content: '这是一段文本描述' }
              }, [
                [
                  h('i', {
                    class: 'el-icon-question',
                    style: 'color:#409eff;margin-left:5px;font-size: 16px;line-height:23px'
                  })
                ]
              ])
            ])
          },
          popup: {
            value: '',
            arr: [{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }],
            popupRender: function(h) {
              return h('div', { class: 'block' }, [
                h('span', { class: 'demonstration' }, '自定义弹窗：'),
                h('el-radio-group', {
                  props: { value: this.value },
                  on: {
                    input: (val) => {
                      this.value = val
                    }
                  }
                }, [
                  this.arr.map(item => h('el-radio', { props: { label: item.label }}))
                ])
              ])
            }
          }
        },
        {
          key: 'createTime',
          name: '日期',
          search: {
            type: 'date',
            value: ['2022-12-24', '2022-12-30'],
            // options里可以配置任何dateTimePicker组件的属性
            options: {
              // type: 'datetime'
            }
          },
          // 多配置了popup
          popup: {
            type: 'date',
            value: ['2022-12-24', '2022-12-30']
          }
        },
        {
          name: '操作',
          width: 200,
          button: [
            {
              name: '新增',
              type: 'success',
              events: {
                click: (params) => {
                  this.$Dialog({
                    tableList: this.tableList,
                    type: 'add',
                    callback: (params, type) => {
                      console.log(params, type + '--' + '弹窗回调----------')
                      this.$Dialog.close()
                      if (type === 'close') {
                        console.log('取消弹窗')
                      }
                    }
                  })
                },
                hidden: (params) => {
                  return false
                }
              }

            },
            {
              name: '编辑',
              type: 'primary',
              events: {
                click: (params) => {
                  this.$Dialog({
                    tableList: this.tableList,
                    data: params,
                    type: 'edit',
                    title: '测试title',
                    width: '50%',
                    cancelText: '禁止',
                    confirmText: '启用',
                    callback: (params, type) => {
                      console.log(params, type + '--' + '弹窗回调----------')
                      this.$Dialog.close()
                      if (type === 'confirm') {
                        this.$refs.xsTableView.tableRefresh(() => {
                          console.log('表格刷新回调')
                        })
                      }
                    }
                  })
                },
                hidden: (params) => {
                  return false
                }
              }

            }
          ]
        }
      ]
    }
  },
  created() {

    // count = count.forEach((item, index) => {
    //   console.log(111)
    //   console.log(dataArr[index])
    //   return dataArr[index]
    // })
    // console.log(count)
  }
}
</script>

