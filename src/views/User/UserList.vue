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
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="loginname" label="登录名"></el-table-column>
      <el-table-column prop="rolename" label="权限"></el-table-column>
      <el-table-column prop="pname" label="上级代理"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button plain size="medium" type="success">充值</el-button>
          <el-button plain size="medium" @click="modifyUser(scope.row)" type="primary">修改</el-button>
          <el-button plain size="medium" @click="remove(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pagination.page_index"
      @current-change="handleCurrentChange"
      :page-size="pagination.page_size"
      layout="total,prev, pager, next, jumper"
      :total="pagination.total"
      style="margin-top: 20px;text-align: center;"
    ></el-pagination>
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form">
        <el-form-item prop="username" label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="loginname" label="登录名" :label-width="formLabelWidth">
          <el-input v-model="form.loginname" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDilog(form)">取 消</el-button>
        <el-button type="primary" @click="modifySave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: "",
        username: "",
        loginname: "",
        password: ""
      },
      formLabelWidth: "120px",
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        loginname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
      pagination: {
        total: 1,
        page_size: 20,
        page_index: 0
      }
    };
  },
  methods: {
    async handleCurrentChange(page) {
      console.log(page)
    },
    closeDilog: function(form) {
      this.dialogFormVisible = false;
      if (this.$refs[form] !== undefined) {
        this.$refs[form].resetFields();
      }
    },
    async modifySave() {
      this.dialogFormVisible = false;
      const res = await this.$http.post("user/update.zul", this.form);
      if (res.data.code == 0) {
        this.$message({ type: "success", message: "工单详情数据保存成功" });
        this.fetch();
      } else {
        this.$message({ type: "error", message: "工单详情数据保存成功" });
      }
    },
    async fetch() {
      const res = await this.$http.post("user/query.zul", {
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
    },
    async modifyUser(row) {
      this.dialogFormVisible = true;
      const res = await this.$http.post(
        "user/query.zul",
        {
          id: row.id
        },
        {
          header: "application/json;charset=utf8"
        }
      );
      this.form = res.data;
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