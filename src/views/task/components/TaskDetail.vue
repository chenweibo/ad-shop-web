<template>
  <div class="createTask-container">
    <el-form ref="ruleForm" :model="postForm" :rules="rules" label-width="100px">
      <el-form-item label="店铺" prop="shop">
        <el-input v-model="postForm.shop" />
      </el-form-item>
      <el-form-item label="任务类型" prop="task">
        <el-radio-group v-model="postForm.taskType">
          <el-radio :label="1">搜索下单</el-radio>
          <el-radio :label="2">淘口令下单</el-radio>
          <el-radio :label="3">链接下单</el-radio>
          <el-radio :label="4">二维码下单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="返款类型" prop="task">
        <el-radio-group v-model="postForm.backType">
          <el-radio :label="1">平台返款</el-radio>
          <el-radio :label="2">商家返款</el-radio>
        </el-radio-group>
        <el-tag type="danger" style="margin-left:10px">若选商家返款，免返款服务费，但需在48小时内返款。</el-tag>
      </el-form-item>
      <el-form-item label="实发商品" prop="task">
        <el-radio-group v-model="postForm.backType">
          <el-radio :label="1">平台发礼品</el-radio>
          <el-radio :label="2">商家发货（卖什么发什么）</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item
        label="任务内容"
        prop="task"
        :rules="[
          { required: true, message: '请输入任务内容', trigger: 'blur' },
          { type: 'tag', message: '请输入任务内容', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="domain.value" />
      </el-form-item> -->
    </el-form>

  </div>
</template>
<script>

const defaultForm = {
  shop: 'draft',
  taskType: 1,
  backType: 1

}
export default {
  name: 'TaskDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {},
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        tag: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.createTask-container {
   padding: 40px 45px 20px 50px;

}

</style>
