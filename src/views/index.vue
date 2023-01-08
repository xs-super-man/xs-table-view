<template>
  <div class="content">
    <xs-table-view ref="xsTableView" :table-list="tableList" :request="requset" :table-options="tableOptions">
      <!-- <template #searchHeader>
        <div>
          <span style="color:red;margin-right: 10px;">头部插槽</span>
        </div>
      </template>
      <template #searchMiddle>
        <div>
          <span style="color:red;margin-right: 10px;">中间插槽</span>
        </div>
      </template>
      <template #searchButton>
        <div @click="userAdd">
          <span style="color:red;margin-right: 10px;">新增-按钮插槽</span>
        </div>
      </template>
      <template #searchFooter>
        <div>
          <span style="color:red;margin-right: 10px;">尾部插槽</span>
        </div>
      </template>
      <template #search>
        <div style="display:flex;justify-content:start">
          <el-button type="primary">自定义搜索</el-button>
        </div>
      </template> -->
    </xs-table-view>
  </div>
</template>

<script>
import { testApi } from '../utils/request'
import { ref } from 'vue'
export default {
  name: 'AppIndex',
  data() {
    return {
      tableOptions: {
        searchShow: false,
        showHeader: true,
        pagination: {
          currentPage: 2,
          pageSize: 30,
          total: 100,
          pageSizes: [10, 20, 30, 40, 50]
        },
        events: {
          'row-click': (params) => {
            console.log(params, 111)
          }
        }
      },
      requset: {
        getTableList: params => {
          console.log(params, '搜索参数回调')
          return testApi({ ...params }).then(res => {
            this.tableOptions.pagination.total = res.total
            return res.data
          })
        }
      },
      tableList: [
        {
          key: 'userSearch',
          name: '用户',
          options: {
            label: '有点厉害'
          },
          search: {
            type: 'select',
            value: '',
            showSearchName: true,
            options: {

            },
            events: {
              change: (val) => {console.log(val, '-------click')}
            },
            list: [
              {
                label: '今天',
                value: '1'
              },
              {
                label: '明天',
                value: '2'
              }
            ]
          },
          children: [
            {
              key: 'id',
              name: '用户id'
            },
            {
              key: 'name',
              name: '昵称'
            },
            {
              key: 'sex',
              name: '性别',
              render(h, { row }) {
                return h('span', row['sex'])
              }
            }
          ]
        },
        {
          name: '信息',
          children: [
            {
              name: '手机',
              children: [
                {
                  key: 'phone',
                  name: 'uid'
                },
                {
                  key: 'downLoadWay',
                  name: '下载'
                },
                {
                  key: 'source',
                  name: '来源',
                  render(h, { row, column }) {
                    return h('span', {
                      style: { color: 'red' }
                    }, row['source'])
                  }
                }
              ]
            },
            {
              key: 'text',
              name: '文本描述',
              headerRender: (h, { column }) => {
                return h('div', [
                  h('span', '自定义表头'),
                  h('el-tooltip', {
                    props: { content: '哎呦不错哦，自定义表头' }
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
            }
          ]
        },
        {
          key: 'avatar',
          name: '头像',
          type: 'image'
        },
        {
          key: 'vip',
          name: '会员用户',
          search: {
            type: 'select',
            value: 1,
            options: {

            },
            events: {
              change: (val) => {console.log(val, '-------click')}
            },
            list: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ]
          },
          render(h, { row }) {
            const str = row['vip'] === 1 ? '男' : '女'
            return h('span', str)
          }
        },
        {
          key: 'createTime',
          name: '开始修改时间'
        },
        {
          key: 'endTime',
          name: '最后修改时间'
        },

        {
          key: 'hidden',
          name: '爱好',
          children: [
            {
              key: 'name',
              name: '零食',
              radioList: [
                {
                  name: '当日',
                  label: '1',
                  value: ''
                },
                {
                  name: '次日',
                  label: '2',
                  value: ''
                }
              ]
            }
          ]
        },
        {
          key: 'today',
          name: '当日',
          search: {
            type: 'input',
            value: 'xs-table-view'
          },
          children: [
            {
              key: 'dffs',
              name: '从v',
              render(h, { row }) {
                return h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }, [
                  h('img', {
                    style: {
                      width: '40px',
                      height: '40px'
                    },
                    attrs: {
                      src: require('../assets/logo.png')
                    }
                  }),
                  h('span', row['dffs'])
                ])
              }
            },
            {
              key: 'name',
              name: '网名',
              popup: {
                type: 'input',
                options: {
                  style: {
                    margin: '10px',
                    color: 'red'
                  }
                }
              }
            }
          ]
        },
        {
          key: 'createTime',
          name: '次日',
          searchKey: {
            startDate: '',
            endDate: ''
          },
          search: {
            type: 'date',
            value: ['2022-12-24', '2022-12-30'],
            options: {
              // type: 'datetime'
            }
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
                    title: '测试title',
                    width: '50%',
                    cancelText: '禁止',
                    confirmText: '启用',
                    callback: (params, type) => {
                      console.log(params, type + '弹窗回调----------')
                      this.$Dialog.close()
                      this.$refs.xsTableView.tableRefresh(() => {
                        console.log('表格刷新回调')
                      })
                    }
                  })
                  // console.log(params, '点击按钮数据回调')
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
                      console.log(params, type + '弹窗回调----------')
                      this.$Dialog.close()
                      this.$refs.xsTableView.tableRefresh(() => {
                        console.log('表格刷新回调')
                      })
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
  methods: {
    userAdd() {
      this.$Dialog({
        tableList: this.tableList,
        type: 'add',
        title: '测试title',
        width: '50%',
        cancelText: '禁止',
        confirmText: '启用',
        callback: (params, type) => {
          console.log(params, type + '弹窗回调----------')
          this.$Dialog.close()
          this.$refs.xsTableView.tableRefresh(() => {
            console.log('表格刷新回调')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
