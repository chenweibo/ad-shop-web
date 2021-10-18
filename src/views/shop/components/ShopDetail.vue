<template>
  <div class="common-container">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="150px">
      <el-form-item label="店铺类型" prop="shopType">
        <el-select v-model="form.shopType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="淘宝店铺名称" prop="taobaoName">
        <el-input v-model="form.taobaoName" placeholder="不会显示给卖家" />
      </el-form-item>
      <el-form-item label="淘宝掌柜名称" prop="taobaoLeader">
        <el-input v-model="form.taobaoLeader" placeholder="不会显示给卖家" />
      </el-form-item>
      <el-form-item label="淘宝后台截图" prop="shopImg">
        <el-upload
          class="avatar-uploader"
          :action="minioUploadUrl"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.shopImg" :src="form.shopImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-question i-O" @click="openExmple">查看示例</i>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      top="5vh"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <img src="/exmple.png" alt="">

    </el-dialog>
  </div>
</template>
<script>
import { create } from '@/api/shop'
export default {
  name: 'ShopDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: { 'Authorization': this.$store.state.user.token },
      form: {
        shopType: undefined,
        taobaoName: '',
        taobaoLeader: '',
        shopImg: ''
      },
      options: [{
        value: 1,
        label: '天猫/淘宝'
      }],
      value: '',
      dialogVisible: false,
      minioUploadUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9085/minio/upload' : process.env.VUE_APP_BASE_API + 'minio/upload',
      rules: {
        shopType: [
          { required: true, trigger: 'blur', message: '请选择类型' }
        ],
        taobaoName: [
          { required: true, trigger: 'blur', message: '店铺名称不能为空' }
        ],
        taobaoLeader: [
          { required: true, trigger: 'blur', message: '淘宝掌柜名称不能为空' }
        ],
        shopImg: [
          { required: true, trigger: 'blur', message: '店铺截图不能为空' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            create(this.form).then(res => {
              this.$router.push({ name: 'shop' })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if (res.code === 200) {
        this.form.shopImg = res.data.url
      } else {
        this.$message('上传错误')
      }
    },
    beforeAvatarUpload(file) {
      const arr = ['image/png', 'image/jpeg', 'image/jpg']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,png,jpeg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    openExmple() {
      this.dialogVisible = true
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .i-O{
      cursor: pointer;
  }
</style>
