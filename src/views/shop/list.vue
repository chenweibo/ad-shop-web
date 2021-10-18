<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加商铺
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编号">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="店铺类型">
        <template>
          <span>淘宝/天猫</span>
        </template>
      </el-table-column>

      <el-table-column prop="taobaoName" align="center" label="淘宝店铺名称" />

      <el-table-column label="淘宝掌柜名称" prop="taobaoLeader" />

      <el-table-column class-name="status-col" prop="isCheck" label="店铺后台审核状态">
        <template slot-scope="scope">
          {{ checkStatus[scope.row.isCheck] }}
        </template>
      </el-table-column>

      <el-table-column min-width="200px" prop="note" label="说明" />

      <el-table-column align="center" prop="shopTelephone" label="商家手机" width="120" />

      <el-table-column align="center" label="创建时间" width="165">
        <template slot-scope="scope">
          {{ dayjs(scope.row.createdTime).format('YYYY-MM-DD HH:mm:ss') }}

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>

import { fetchList } from '@/api/shop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'Shop',
  components: { Pagination },
  props: {},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      checkStatus: ['待审核', '审核通过', '拒绝']
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    handleCreate() {
      this.$router.push({ name: 'CreateShop' })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleEdit() {},
    handleDelete() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
