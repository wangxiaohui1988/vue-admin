<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'first_category_add'})">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
              <!--一级分类-->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ firstItem.category_name }}
                <el-button type="danger" size="mini" round @click="editCategory({data:firstItem, type:'first_category_edit'})">编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button size="mini" round @click="delFirstCategory(firstItem.id)">删除</el-button>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="firstItem.children">
                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :model="ruleForm"  ref="ruleForm" label-width="142px" class="from-wrap">
            <el-form-item label="一级分类名称" prop="categoryName" >
              <el-input v-model="ruleForm.categoryName" autocomplete="off" :disabled="firstCategoryDisable"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" prop="secCategoryName" v-if="categoryChildrenInput">
              <el-input v-model="ruleForm.secCategoryName" autocomplete="off" :disabled="secCategoryDisable"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :disabled='submitButtonDisable'>确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { AddFirstCategory, GetInfoCategoryAll, DelFirstCategory, EditFirstCategory } from '@/api/news'
import { global } from '@/utils/global-vue3.0'
export default {
  name: 'category',
  setup (props, { refs, root }) {
    /** global */
    const { confirm } = global()

    /** ref数据定义 */
    const categoryChildrenInput = ref(true)
    const firstCategoryDisable = ref(true)
    const secCategoryDisable = ref(true)
    const submitButtonDisable = ref(true)
    const submitButtonType = ref('')

    /** reactive数据定义 */
    const ruleForm = reactive({
      categoryName: '',
      secCategoryName: '',
      age: ''
    })

    const category = reactive({
      item: [],
      current: []
    })

    /** 函数定义 */
    // 点击添加一级分类按钮操作
    const addFirst = (params) => {
      submitButtonType.value = params.type
      // 一级分类和确定按钮变可用
      firstCategoryDisable.value = false
      submitButtonDisable.value = false
      // 隐藏二级分类
      categoryChildrenInput.value = false
    }

    const addFirstCategory = () => {
      if (!ruleForm.categoryName) {
        root.$message.error('一级分类不能为空！')
        return
      }

      let requestData = {
        categoryName: ruleForm.categoryName
      }
      AddFirstCategory(requestData).then((response) => {
        let data = response.data
        if (data.resCode === 0) {
          root.$message.success('添加成功！！')
        }
        // 新增数据添加到分类信息列表 或者调用getInfoCategoryAll()方法
        category.item.push(data.data)
        // 重置表格
        refs.ruleForm.resetFields()
        firstCategoryDisable.value = true
        secCategoryDisable.value = true
        submitButtonDisable.value = true
        categoryChildrenInput.value = true
      }).catch((error) => {
        console.log(error)
      })
    }

    const editCategory = (params) => {
      submitButtonType.value = params.type
      submitButtonDisable.value = false
      firstCategoryDisable.value = false
      ruleForm.categoryName = params.data.category_name
      category.current = params.data
    }

    const editFirstCategory = () => {
      if (category.current.length === 0) {
        root.$message.error('未选择分类！！')
      }
      let requestData = {
        id: category.current.id,
        categoryName: ruleForm.categoryName
      }
      EditFirstCategory(requestData).then(response => {
        let data = response.data
        if (data.resCode === 0) {
          root.$message.success(data.message)
        }
        category.current.category_name = data.data.categoryName
        refs.ruleForm.resetFields()
        getInfoCategoryAll()
      }).catch(error => {
        console.log(error)
      })
    }

    // 提交
    const submit = () => {
      console.log(submitButtonType.value)
      if (submitButtonType.value === 'first_category_add') {
        addFirstCategory()
      }

      if (submitButtonType.value === 'first_category_edit') {
        editFirstCategory()
      }
    }

    /** 获取消息分类信息 */
    const getInfoCategoryAll = () => {
      GetInfoCategoryAll().then(response => {
        let data = response.data.data
        category.item = data
      }).catch(error => {
        console.log(error)
      })
    }

    // 确认删除一级分类信息
    const delFirstCategory = (id) => {
      confirm({
        content: '确认删除该记录?',
        tip: '提示',
        id: id,
        fn: ConfirmDelFirstCategory
      })
    }
    // 删除一级分类信息
    const ConfirmDelFirstCategory = (id) => {
      let requestData = {
        categoryId: id
      }
      DelFirstCategory(requestData).then(response => {
        let data = response.data
        if (data.resCode === 0) {
          root.$message.success('删除成功！！')
        }
        // 重新查询信息分类信息
        getInfoCategoryAll()
      }).catch(error => {
        console.log(error)
      })
    }
    /**
     * 生命周期
     * 挂载完成时执行，（页面DOM元素完成时，实例完成）
     */
    onMounted(() => {
      getInfoCategoryAll()
    })

    return {
      categoryChildrenInput,
      firstCategoryDisable,
      secCategoryDisable,
      submitButtonDisable,
      category,
      ruleForm,
      addFirst,
      submit,
      editCategory,
      getInfoCategoryAll,
      delFirstCategory
    }
  }
}
</script>
<style lang="scss" scope>
@import "../../styles/config.scss";
.category-wrap {
    div:first-child {
        &:before { top: 20px; }
    }
    div:last-child {
        &:before { bottom: 21px; }
    }
}
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
.category {
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
    }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 17px;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group { display: block; }
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button { font-size: 12px; }
}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
}
</style>
