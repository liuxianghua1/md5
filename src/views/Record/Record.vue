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
      const res = await this.$http.post("investMoney/query.zul", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(res)
      this.pagination.total = res.data.records;
      this.tableData = res.data.rows;
    },
    table_index(index) {
      return (
        (this.pagination.page_index - 1) * this.pagination.page_size + index + 1
      );
    },
  },
  created() {
    this.fetch();
  }
};
</script>