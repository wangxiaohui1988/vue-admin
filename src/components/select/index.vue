<template>
    <el-select v-model="data.selectVal" clearable placeholder="请选择">
    <el-option
      v-for="item in data.initOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {
  name: 'SelectC',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { root }) {
    const data = reactive({
      selectVal: '',
      initOptions: [],
      options: [
        { value: 'id', label: 'ID' },
        { value: 'title', label: '标题' },
        { value: 'name', label: '姓名' },
        { value: 'email', label: '邮箱' }
      ]
    })

    const initOption = () => {
      let initData = props.config.init
      let optionArr = []
      // 数据校验
      if (initData.length === 0) {
        console.log('config的参数是空的，无法显示下拉菜单；')
        return false
      }
      // 循环遍历传入初始选项
      initData.forEach(item => {
        let arr = data.options.filter(elemet => elemet.value === item)
        if (arr.length > 0) {
          optionArr.push(arr[0])
        }
      })

      // 数据检验
      if (optionArr.length === 0) {
        console.log('匹配的数据为空！')
        return false
      }

      // 初始化下拉框
      data.initOptions = optionArr
      // 初始化默认选项
      // data.selectVal = optionArr[0]
    }

    /** 选择触发 */
    const select = (val) => {
      let filterData = data.options.filter(item => item.value === val)[0]
      root.emit('update:selectData', filterData)
    }

    /** 组件挂载完成时 */
    onMounted(() => {
      initOption()
    })

    return {
      data,
      select
    }
  }
}
</script>
<style lang="scss" scope>
</style>
