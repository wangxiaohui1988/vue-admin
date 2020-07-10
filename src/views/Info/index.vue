<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select v-model="value" clearable placeholder='请选择' style="width: 100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%;"
              v-model="dateValue"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap key-work">
          <label for="">关键字：</label>
          <div class="warp-content">
            <el-select v-model="searchKey" clearable placeholder='请选择' style="width: 100%;">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchKeyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" class="pull-left" style="width: 100%;">搜索</el-button>
      </el-col>
      <!-- <el-col :span="3"><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></el-col> -->
      <el-col :span="2">
        <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialogFormVisible = true">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div class="black-space-30"></div>
    <el-table :data="tableData.item"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="80" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="300" :formatter="fromatterDate"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteItem(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <button size="medium" @click="batchDelete">批量删除</button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag="dialogFormVisible" @formVisible="changeDialogFormVisible" :category="options.category"></DialogInfo>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import DialogInfo from './dialog/info'
import { global } from '@/utils/global-vue3.0'
import { timestampToTime } from '@/utils/common'
import { GetList, DeletInfo } from '@/api/news'
export default {
  name: 'infoIndex',
  components: { DialogInfo },
  setup (props, { root }) {
    const { confirm } = global()
    const value = ref('')
    const dateValue = ref('')
    const searchKey = ref('')
    const searchKeyWork = ref('')
    const dialogFormVisible = ref(false)
    const total = ref(0)
    const deletInfoId = ref('')

    const options = reactive({
      category: []
    })

    const options2 = reactive([
      {
        value: 'id',
        label: 'ID'
      },
      {
        value: 'title',
        label: '标题'
      }
    ])

    const tableData = reactive({
      item: []
    })

    const page = reactive({
      pageSize: 10,
      pageNumber: 1
    })

    const handleEdit = (index, row) => {
      // console.log(index, row)
    }
    const deleteItem = (index, row) => {
      deletInfoId.value = [row.id]
      // root.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   root.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   root.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })

      // 调用全局方法
      // root.confirm({
      //   content: '确认删除当前信息，确认后将无法恢复！！',
      //   tip: '警告',
      //   type: 'warning',
      //   fn: confirmDelete
      // })

      // Vue3.0方法封装调用
      confirm({
        content: '确认删除当前信息，确认后将无法恢复！！',
        tip: '警告',
        type: 'warning',
        fn: confirmDelete
      })
    }

    const batchDelete = (index, row) => {
      // Vue3.0方法封装调用
      confirm({
        content: '确认删除选中的全部记录?',
        tip: '提示',
        type: 'warning',
        fn: confirmDelete
      })
    }

    // 删除数据
    const confirmDelete = (value) => {
      DeletInfo({ id: deletInfoId.value }).then(response => {
        let data = response.data
        if (data.resCode === 0) {
          root.$message.success(data.message)
          deletInfoId.value = []
        }
        getList()
      }).catch(error => {
        console.log(error)
        deletInfoId.value = []
      })
    }

    // 调用Vuex的公用方法，获取分类信息
    const getInfoCategory = () => {
      root.$store.dispatch('common/getInfoCategory').then(response => {
        options.category = response
      }).catch(error => {
        console.log(error)
      })
    }

    // 获取信息列表
    const getList = () => {
      let requestData = {
        categoryId: '',
        startTiem: '',
        endTime: '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      }
      GetList(requestData).then(response => {
        let resData = response.data
        tableData.item = resData.data.data
        total.value = resData.data.total
      }).catch(error => {
        console.log(error)
      })
    }

    const handleSizeChange = (val) => {
      page.pageSize = val
    }

    const handleCurrentChange = (val) => {
      page.pageNumber = val
      getList()
    }
    const changeDialogFormVisible = (formVisible) => {
      dialogFormVisible.value = formVisible
    }

    //
    const handleSelectionChange = (val) => {
      let id = val.map(item => item.id)
      deletInfoId.value = id
    }

    // 转化分类ID
    const toCategory = (row) => {
      let categoryId = row.categoryId
      let categoryData = options.category.filter(item => item.id === categoryId)[0]
      return categoryData.category_name
    }

    // 日期格式化
    const fromatterDate = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate)
    }

    /** 生命周期 */
    onMounted(() => {
      // 获取分类信息
      getInfoCategory()
      // 获取列表信息
      getList()
    })

    return {
      dialogFormVisible,
      options,
      total,
      options2,
      value,
      dateValue,
      searchKey,
      searchKeyWork,
      tableData,
      handleEdit,
      deleteItem,
      batchDelete,
      handleSizeChange,
      handleCurrentChange,
      toCategory,
      fromatterDate,
      handleSelectionChange,
      changeDialogFormVisible
    }
  }
}
</script>
<style lang="scss" scope>
@import "../../styles/config.scss";
.label-wrap {
    &.category { @include labelDom(left, 60, 40); }
    &.date { @include labelDom(right, 93, 40); }
    &.key-work { @include labelDom(right, 99, 40); }
}
</style>
