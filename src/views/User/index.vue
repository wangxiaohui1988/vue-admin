<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="label-wrap">
          <label for="">关键字：</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <SelectC :config="data.configOption"></SelectC>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入关键字"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <TableC :config="data.tableConfig"></TableC>
  </div>
</template>
<script>
import SelectC from '@/components/select/index'
import TableC from '@/components/table/index'
import { reactive } from '@vue/composition-api'
export default {
  name: 'UserList',
  components: { SelectC, TableC },
  setup (props, { root }) {
    const data = reactive({
      configOption: {
        init: ['name', 'title', 'email']
      },
      tableConfig: {
        selection: false,
        tHead: [
          { lable: '邮箱/用户名', field: 'email' },
          { lable: '真实姓名', field: 'name' },
          { lable: '手机号', field: 'phone' },
          { lable: '地区', field: 'address' },
          { lable: '角色', field: 'role' }
        ]
      },
      tableData: [
        {
          email: 'jiunayang@sina.cn',
          name: '王小虎',
          phone: '18515388187',
          address: '上海市普陀区金沙江路 1518 弄',
          role: '超管'
        },
        {
          email: 'jiunayang@sina.cn',
          name: '王小虎',
          phone: '18515388187',
          address: '上海市普陀区金沙江路 1518 弄',
          role: '超管'
        }]
    })

    return { data }
  }
}
</script>
<style lang="scss" scope>
@import "../../styles/config.scss";
.label-wrap {
    @include labelDom(left, 60, 40)
}
</style>
