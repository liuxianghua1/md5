<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="loginname" label="登录名"></el-table-column>
    <el-table-column prop="rolename" label="权限"></el-table-column>
    <el-table-column prop="pname" label="上级代理"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button plain size="medium" type="success">充值</el-button>
        <el-button plain size="medium" type="primary">修改</el-button>
        <el-button plain size="medium" @click="remove(scope.row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async fetch() {
        const res = await this.$http.post("user/query.zul", {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        });
        this.tableData = res.data.rows;
    },
    async remove(row) {
      this.$confirm(`确定要删除"${row.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.post("user/delete.zul", {
            id: row.id
          });
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
          } else {
            this.$message({
              type: "error",
              message: "删除失败,请联系管理员!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>