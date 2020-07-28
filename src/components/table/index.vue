<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <el-table-column type="selection" v-if="data.tableConfig.selection" width="55"></el-table-column>
    <el-table-column v-for="item in data.tableConfig.tHead" :key="item.field" :prop="item.field" :label="item.lable"></el-table-column>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from '@vue/composition-api'
export default {
  name: 'TableC',
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { root }) {
    const data = reactive({
      tableConfig: {
        selection: true,
        tHead: []
      }
    })

    // 初始化数据
    const initTableConfig = () => {
      let tableConfig = props.config
      for (const key in tableConfig) {
        if (data.tableConfig[key]) {
          data.tableConfig[key] = tableConfig[key]
        }
      }
    }

    onBeforeMount(() => {
      initTableConfig()
    })

    return { data }
  }
}
</script>
<style lang="sass">

</style>
