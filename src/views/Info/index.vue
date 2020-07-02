<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select v-model="value" clearable placeholder='请选择' style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
        <el-button type="danger" class="pull-right" style="width: 100%;">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div class="black-space-30"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="80"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="300"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <button size="medium">批量删除</button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'infoIndex',
  setup (props, { root }) {
    const options = reactive([
      {
        value: 1,
        label: '国内信息'
      },
      {
        value: 2,
        label: '国内信息'
      },
      {
        value: 3,
        label: '行业信息'
      }
    ])

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

    const tableData = ([
      {
        title: '师者为师亦为范 习近平这样关心“筑梦人”',
        categoryId: '国内信息',
        createDate: '2016-05-03',
        user: '王小虎'
      },
      {
        title: '师者为师亦为范 习近平这样关心“筑梦人”',
        categoryId: '国内信息',
        createDate: '2016-05-03',
        user: '王小虎'
      },
      {
        title: '师者为师亦为范 习近平这样关心“筑梦人”',
        categoryId: '国内信息',
        createDate: '2016-05-03',
        user: '王小虎'
      },
      {
        title: '师者为师亦为范 习近平这样关心“筑梦人”',
        categoryId: '国内信息',
        createDate: '2016-05-03',
        user: '王小虎'
      }])

    const value = ref('')
    const dateValue = ref('')
    const searchKey = ref('')
    const searchKeyWork = ref('')

    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    return {
      options,
      options2,
      value,
      dateValue,
      searchKey,
      searchKeyWork,
      tableData,
      handleEdit,
      handleDelete
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
