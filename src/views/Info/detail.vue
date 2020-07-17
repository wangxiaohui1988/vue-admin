<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="信息分类：">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：">
      缩略图
    </el-form-item>
    <el-form-item label="发布日期：">
      <el-col :span="11">
        <el-date-picker
          type="date"
          v-model="form.createDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="详细内容：">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {
  name: 'infoDetail',
  setup (props, { root }) {
    const data = reactive({
      id: root.$route.params.id || root.$store.state.infodetail.id
    })

    const form = reactive({
      id: ''
    })

    onMounted(() => {})

    return { data, form }
  }
}
</script>
<style lang="sass" scope></style>
