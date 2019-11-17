<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="username">
        <el-input placeholder="请输入姓名" v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="账号" prop="loginname">
        <el-input placeholder="请输入账号" v-model="ruleForm.loginname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="初始查询数">
        <el-input-number v-model="ruleForm.article" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="余额">
        <el-link icon="el-icon-money" disabled>剩余可分配条数:{{this.$store.state.article}}</el-link>
      </el-form-item>

      <el-form-item prop="pid" v-if="ruleForm.roleid == 5 && roleid == 1" label="上级代理">
        <!-- && localStorage.roleid == 1 -->
        <el-select v-model="ruleForm.pid" clearable placeholder="请选择上级代理">
          <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="权限">
        <el-radio
          @change="RadioChange"
          v-model="ruleForm.roleid"
          v-if="this.User.roleid == 1"
          label="1"
        >管理员</el-radio>
        <el-radio
          @change="RadioChange"
          v-model="ruleForm.roleid"
          v-if="this.User.roleid == 1"
          label="2"
        >代理商</el-radio>
        <el-radio @change="RadioChange" v-model="ruleForm.roleid" label="5">用户</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleid: "",
      options: [],
      User: [],
      ruleForm: {
        username: "",
        loginname: "",
        password: "",
        roleid: "5",
        pid: "",
        article: 0
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        loginname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级代理", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    RadioChange() {
      if (this.ruleForm.roleid == 2 || this.ruleForm.roleid == 1) {
        this.ruleForm.pid = this.User.id;
      } else if (this.ruleForm.roleid == 5 && this.$store.state.roleid == 2) {
        this.ruleForm.pid = this.User.id;
      } else if (this.ruleForm.roleid == 5) {
        this.ruleForm.pid = "";
      }
    },
    async fetch() {
      try {
        const res = await this.$http.post("user/verify.zul", {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        });
        if (res.data.code == 7) {
          this.$message({ type: "error", message: "请重新登录!" });
          this.$router.push("/login");
        } else if (res.data.code == 8) {
          this.$message({ type: "error", message: "系统异常!" });
          this.$router.push("/login");
        } else {
          this.User = res.data[0];
        }
      } catch (e) {
        this.$router.push("/login");
        this.$message({ type: "error", message: "接口访问失败!" });
      }
    },
    async Create() {
      if (this.ruleForm.roleid == 2 || this.ruleForm.roleid == 1) {
        this.ruleForm.pid = this.User.id;
      } else if (this.ruleForm.roleid == 5 && this.$store.state.roleid == 2) {
        this.ruleForm.pid = this.User.id;
      }
      const res = await this.$http.post("/user/insert.zul", this.ruleForm, {
        header: "application/json;charset=utf8"
      });
      if (res.data[0].code == 0) {
        this.$message({ type: "success", message: "创建用户成功!" });
        this.$router.push("/UserList");
        const money = await this.$http.post(
          "user/query.zul",
          {
            id: this.User.id
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        );
        this.$store.commit("article", money.data.article);
      } else if (res.data[0].code == 3) {
        this.$message({ type: "error", message: "账号已存在!" });
      } else if (res.data[0].code == 13) {
        this.$message({ type: "error", message: "账户条数余额不足!" });
      } else {
        this.$message({ type: "error", message: "系统异常!" });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Create();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async roleid_fetch() {
      let roleid = { roleid: 2 };
      this.roleid = localStorage.roleid;
      const res = await this.$http.post("user/role.zul", roleid, {
        header: "application/json;charset=utf8"
      });
      this.options = res.data;
    }
  },
  created() {
    this.fetch();
    this.roleid_fetch();
  }
};
</script>