<template>
  <div>
    <el-dialog title="新增" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="国内信息" value="1"></el-option>
            <el-option label="国内信息" value="2"></el-option>
            <el-option label="行业信息" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible(formVisible)">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible(formVisible)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialogInfo',
  data () {
    return {
      formVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag: {
      handler (newValue, oleValue) {
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
    }
  }
}
</script>
<style lang="scss" scope></style>
