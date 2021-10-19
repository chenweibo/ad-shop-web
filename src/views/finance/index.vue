<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      style="width: 100%"
      height="700"
    >
      <el-table-column
        prop="shopName"
        label="店铺"
        width="180"
      />
      <el-table-column
        prop="name"
        label="金额"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.plusMinus===1?'+':'-' }}{{ scope.row.pay }}
        </template>
      </el-table-column>
      <el-table-column
        prop="currentMomey"
        label="变更后余额"
      />
      <el-table-column
        prop="note"
        label="备注"
      />
      <el-table-column align="center" label="时间" width="165">
        <template slot-scope="scope">
          {{ dayjs(scope.row.createdTime).format('YYYY-MM-DD HH:mm:ss') }}

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList } from '@/api/finance'
import Pagination from '@/components/Pagination'
export default {
  name: 'Finance',
  components: { Pagination },
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
