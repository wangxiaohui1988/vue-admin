<template>
  <div>
    <el-dialog title="新增" :visible.sync="formVisible" @open="openDialog">
      <el-form :model="form" ref="form">
        <el-form-item label="类别" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option v-for="item in categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible(formVisible)">取 消</el-button>
        <el-button type="primary" @click="submit(formVisible)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AddInfo } from '@/api/news'
export default {
  name: 'dialogInfo',
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formVisible: false,
      form: {
        category: '',
        title: '',
        content: ''
      },
      categoryOption: [],
      formLabelWidth: '120px'
    }
  },
  watch: {
    flag: {
      handler (newValue) {
        this.formVisible = newValue
      }
    }
  },
  methods: {
    // 自定义函数，处理子组件向父组件传值
    dialogFormVisible (fvisible) {
      this.formVisible = !fvisible
      // 发射事件，子传父
      this.$emit('formVisible', this.formVisible)
    },
    submit (fvisible) {
      this.formVisible = !fvisible
      // 发射事件，子传父
      this.$emit('formVisible', this.formVisible)
      let requestData = {
        categoryId: this.form.category,
        title: this.form.title,
        content: this.form.content
      }
      AddInfo(requestData).then(response => {
        let resData = response.data
        if (resData.resCode === 0) {
          this.$message.success(resData.message)
          this.$refs.form.resetFields()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹窗一打开获取父组件传入的参数信息
    openDialog () {
      this.categoryOption = this.category
    }
  }
}
</script>
<style lang="scss" scope></style>
