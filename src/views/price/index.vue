<template>
  <div>
    <div class="title">
      <div class="chunk"></div>
      <p>票价列表</p>
    </div>

    <el-card class="box-card">
      <el-button style=" padding: 3px 0;margin-bottom: 10px;" type="text" @click="createPrice">创建票价</el-button>
      <el-table :data="tableData" style="width: 100%" header-cell-class-name="hedClass" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="ticketName" align="center" label="票价名称"></el-table-column>
        <el-table-column prop="ticketPrice" align="center" label="票价/元"></el-table-column>
        <el-table-column prop="ticketNum" align="center" label="总票数量"></el-table-column>
        <el-table-column prop="ticketType" align="center" label="票价类型"></el-table-column>
        <el-table-column prop="ticketDesc" align="center" label="票价描述"></el-table-column>
        <el-table-column prop="seatArea" align="center" label="所属区域"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" ref="pagination" :total="total" :limit.sync="pageInfo.pageSize" :page.sync="pageInfo.current" @pagination="pagination"></pagination>
    </el-card>
    <PriceDialog @addSucess="addSucess" ref="pricedialog"></PriceDialog>
  </div>
</template>

<script>
import pagination from '@/components/pagination'
export default {
  inject: ['reload'], // 注入依赖
  components: {
    pagination
  },
  data () {
    return {
      tableData: [
        {
          metId: '',
          ticketName: '周杰伦十周年',
          ticketPrice: '100',
          ticketNum: '50',
          ticketType: '贵宾',
          ticketDesc: '1',
          seatArea: 'cs'
        }
      ],
      loading: true,
      total: 0, // 总页数
      pageInfo: {} // 分页
    }
  },
  mounted () {
    this.priceQuery()
  },
  computed: {
    userinfo () {
      return JSON.parse(this.$cookie.get('userinfo'))
    },
    params () {
      let size
      if (this.$refs.pagination) {
        size = this.$refs.pagination.limit
      }
      return {
        page: 0,
        size
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$refs.pricedialog.open()
      this.$refs.pricedialog.ruleForm = row
      this.$refs.pricedialog.ifAffirm = false
    },
    handleDelete(index, row){
      console.log('删除当前行', index, row)
      this.$deletePrice(row.id).then(data => {
        this.reload()
      })
    },
    createPrice () {
      this.$refs.pricedialog.ruleForm = {
        ticketName: '',
        ticketPrice: '',
        ticketNum: '',
        ticketType: '',
        ticketDesc: '',
        seatArea: ''
      }
      this.$refs.pricedialog.open()
      this.$refs.pricedialog.ifAffirm = true
    },
    addSucess () {
      this.priceQuery()
    },
    // 分页查询价格
    priceQuery () {
      let params = {
        metId: this.$store.state.met.id || this.$cookie.get('metId'),
        current: this.params.page,
        pageSize: this.params.size
      }
      this.$axios.get(this.$priceQueryByPage, { params: params }).then(({ data }) => {
        if (data) {
          this.loading = false
          let { list, pagination } = data
          this.tableData = list
          this.pageInfo = {
            pageSize: parseInt(pagination.pageSize),
            current: parseInt(pagination.current)
          }
          this.total = pagination.total
        }
      })
    },
    // 分页
    pagination (e) {
      this.loading = true
      this.params.page = e.page
      this.priceQuery()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  .chunk {
    height: 100%;
    width: 12px;
    display: inline-block;
    background: $--color-primary;
  }
  p {
    display: inline-block;
    line-height: 50px;
    vertical-align: top;
    margin-left: 10px;
    font-size: 15px;
    font-weight: normal;
    color: $--color-primary;
  }
}
.box-card{
  margin-top: 10px;
}
</style>

<style lang="scss">
.hedClass {
  background: $--color-primary !important;
  color: #fff;
}
</style>
