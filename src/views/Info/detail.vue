<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="信息分类：" prop="id">
      <el-select v-model="form.categoryId" placeholder="请选择信息分类">
        <el-option v-for="item in data.category" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：">
      缩略图
    </el-form-item>
    <el-form-item label="发布日期：" prop="createDate">
      <el-col :span="11">
        <el-date-picker
          type="date"
          v-model="form.createDate"
          style="width: 100%;"
          disabled
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="详细内容：" prop="content">
      <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
import { GetList, EditInfo } from '@/api/news'
import { timestampToTime } from '@/utils/common'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'infoDetail',
  components: { quillEditor },
  setup (props, { root }) {
    const data = reactive({
      id: root.$route.params.id || root.$store.state.infodetail.id,
      category: []
    })

    const form = reactive({
      id: '',
      categoryId: '',
      title: '',
      createDate: '',
      content: '',
      imgUrl: ''
    })

    /** 获取信息分类 */
    const getInfoCategory = () => {
      root.$store.dispatch('common/getInfoCategory').then(response => {
        data.category = response
      }).catch(error => {
        console.log(error)
      })
    }

    /** 获取指定ID的信息 */
    const getInfo = () => {
      let requestData = {
        id: data.id,
        pageNumber: 1,
        pageSize: 1
      }

      GetList(requestData).then(response => {
        let resData = response.data.data.data[0]
        form.id = resData.id
        form.categoryId = resData.categoryId
        form.title = resData.title
        form.createDate = timestampToTime(resData.createDate)
        form.content = resData.content
      }).catch(error => {
        console.log(error)
      })
    }

    const onSubmit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        updateDate: form.createDate,
        content: form.content,
        imgUrl: ''
      }
      EditInfo(requestData).then(response => {
        let resData = response.data
        if (resData.resCode === 0) {
          root.$message.success(resData.message)
        }
      }).catch(error => {
        console.log(error)
      })
      console.log('submit')
    }

    onMounted(() => {
      getInfoCategory()
      getInfo()
    })

    return { data, form, onSubmit }
  }
}
</script>
<style lang="sass" scope></style>
