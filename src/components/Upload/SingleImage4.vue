<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="minioUploadUrl"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'SingleImageUpload4',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      minioUploadUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9085/minio/upload' : process.env.VUE_APP_BASE_API + 'minio/upload',
      headers: { 'Authorization': this.$store.state.user.token },
      shopImg: ''
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if (res.code === 200) {
        this.$emit('input', res.data.url)
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

