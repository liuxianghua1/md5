<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="table_index"
        show-ov
        erflow-tooltip
      ></el-table-column>
      <el-table-column prop="status" label="支出类型">
          <template  slot-scope="scope">
              <div>
                  <!-- 获取一行数据 -->
                  {{ scope.row.status == 0 ? '支出' :  scope.row.status == 1 ? '收入' : scope.row.status == 2 ? '消费' : '未知' }}
              </div>
          </template>
      </el-table-column>
      <el-table-column prop="article" label="条数"></el-table-column>
      <el-table-column prop="createtime" label="时间"></el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pagination.page_index"
      @current-change="handleCurrentChange"
      :page-size="pagination.page_size"
      layout="total,prev, pager, next, jumper"
      :total="pagination.total"
      style="margin-top: 20px;text-align: center;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagination: {
        total: 1,
        page_size: 20,
        page_index: 0
      }
    };
  },
  methods: {
    async handleCurrentChange(page) {
      const res = await this.$http.post(
        "investMoney/query.zul",
        {
          page
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      );
      this.pagination.total = res.data.records;
      this.tableData = res.data.rows;
      /* 
            article: 1222
            createtime: "2019-11-19 11:28:03"
            id: 89
            investid: 3
            investname: "王馨雨"
            money: -2.40734
            status: 0
            uid: 1
            uname: "讯森林"
        */
    },
    async fetch() {
      const res = await this.$http.post("investMoney/query.zul", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      this.pagination.total = res.data.records;
      this.tableData = res.data.rows;
    },
    table_index(index) {
      return (
        (this.pagination.page_index - 1) * this.pagination.page_size + index + 1
      );
    }
  },
  created() {
    this.fetch();
  }
};
</script>