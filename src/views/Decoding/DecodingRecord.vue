<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="table_index"
        show-ov
        erflow-tooltip
        width="50"
      ></el-table-column>
      <el-table-column prop="uname" label="被充值用户"></el-table-column>
      <el-table-column prop="investname" label="充值者"></el-table-column>
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