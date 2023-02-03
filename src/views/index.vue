<template>
  <div class="content">
    <xs-table-view ref="xsTableView" :table-list="tableList" :request="requset" :table-options="tableOptions">
      <!-- 插槽扩展 -->
      <!-- <template #searchHeader>
        <el-button style="margin-right: 10px;">头部插槽</el-button>
      </template> -->
      <template #searchMiddle>
        <el-button style="margin-right: 10px;" @click="userAdd">中部插槽-按钮插槽-新增弹窗</el-button>
      </template>
      <!-- <template #searchButton>
        <el-button style="margin-right: 10px;">搜索插槽</el-button>
      </template>
      <template #searchFooter>
        <el-button style="margin-right: 10px;">尾部插槽</el-button>
      </template>
      <template #search>
        <div style="margin-bottom:20px;display:flex;justify-content:start;">
          <el-button type="primary">换行-自定义搜索</el-button>
        </div>
      </template> -->
    </xs-table-view>
  </div>
</template>

<script>
import { testApi } from '../utils/request'
export default {
  name: 'AppIndex',
  data() {
    return {
      tableOptions: {
        searchShow: false, // 是否隐藏搜索组件
        showHeader: true, // 是否显示表头
        pagination: {
          currentPage: 1, // 组件内默认1，起始页码
          pageSize: 10, // 组件内默认10 请求条数
          total: 10, // 总条数
          show: true // 是否展示分页
          // pageSizes: [10, 20, 30, 40, 50]
        },
        tree: {
          name: '列表筛选',
          show: true, // 是否显示按钮
          options: {
            type: 'primary'
          }
        }
      },
      requset: {
        // 函数名固定为getTableList
        getTableList: params => {
          console.log(params, '搜索参数回调')
          // 接口函数需要时一个promise对象
          return testApi({ ...params }).then(res => {
            // 需要手动赋值一下total总页数，不然默认是10条
            this.tableOptions.pagination.total = res.total
            // 返回一个数组
            return res.data
          })
        }
      },
      // table列表定义 {user：'小帅'} key就是user
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
              key: 'nickName',
              name: '昵称',
              tableShow: true
            },
            {
              key: 'sex',
              name: '性别',
              render(h, row) {
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
                  name: 'uid',
                  // 隐藏当前列
                  tableShow: true
                },
                {
                  key: 'downLoadWay',
                  name: '下载'
                },
                {
                  key: 'source',
                  name: '来源',
                  width: '200px'
                }
              ]
            },
            {
              key: 'text',
              name: '文本描述',
              // 表头自定义函数
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
                /*
                 popupRender 自定义弹窗渲染
                 h渲染函数
                 params 当前行数据
                **/
                popupRender: function(h, params) {
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
          // type设置image可以展示图片
          type: 'image'
        },
        {
          key: 'today',
          name: '展示',
          search: {
            type: 'input',
            value: 'xs-table-view'
          },
          children: [
            {
              name: '图片',
              // 需求不满足的时候，可以自定义render函数
              render(h, { column }) {
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
                  h('span', column.label)
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
            // 下拉需要定义一个数组，key固定为label，value是选择的值
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
          key: 'date',
          name: '开始修改时间',
          tableShow: true
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
              key: 'transfer',
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
          key: 'createTime',
          name: '次日',
          // 日期可以分割为两个参数
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
          key: 'button',
          width: 200,
          // 渲染按钮
          button: [
            {
              name: '新增',
              type: 'success',
              events: {
                click: (data) => {
                  // 全局弹窗
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
                      if (type === 'confirm') {
                        // 刷新table
                        this.$refs.xsTableView.tableRefresh(() => {
                          console.log('表格刷新回调')
                        })
                      }
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
                    title: '测试修改title',
                    width: '50%',
                    callback: (params, type) => {
                      console.log(params, type + '弹窗回调----------')
                      this.$Dialog.close()
                      if (type === 'confirm') {
                        this.$refs.xsTableView.tableRefresh(() => {
                          console.log('表格刷新回调')
                        })
                      }
                    }
                  })
                },
                // 按钮是否展示 params当前行数据
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
    // 全局事件弹窗，可以加在其他按钮或事件上
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
          if (type === 'confirm') {
            this.$refs.xsTableView.tableRefresh(() => {
              console.log('表格刷新回调')
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
/* 可以修改组件样式 */
.xs-table-view{
  /* margin-top: 20px; */
}
</style>
