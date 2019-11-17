<template>
  <div>
    <el-container border style="height:100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path" :default-openeds="['1-2']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>Md5解码
            </template>

            <el-menu-item index="/about">Md5解码</el-menu-item>
            <el-menu-item index="1-2">Md5解码</el-menu-item>
          </el-submenu>
          <el-submenu
            v-if="this.$store.getters.get_roleid.roleid == 1 || this.$store.getters.get_roleid.roleid == 2"
            index="2"
          >
            <template slot="title">
              <i class="el-icon-message"></i>
              用户管理
            </template>

            <el-menu-item index="/CreateUser">创建用户</el-menu-item>
            <el-menu-item index="/UserList">用户管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>
              流水记录
            </template>
            <el-menu-item index="/Record">流水记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span style="margin-right: 5px">{{this.User.username}}</span>
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-money">余额:{{this.$store.state.article}}</el-dropdown-item>
              <el-dropdown-item @click.native="swtichs" icon="el-icon-copy-document">切换账号</el-dropdown-item>
              <el-dropdown-item @click.native="exit" icon="el-icon-house">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

body {
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
</style>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      tableData: [],
      User: [],
      article: 1
    };
  },
  methods: {
    swtichs() {
      this.$router.push("/login");
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
          Vue.prototype.User = res.data[0];
          this.$store.commit("SetUser", res.data[0]);
          this.$store.commit("set_roleid", res.data[0].roleid);
          localStorage.setItem("roleid", res.data[0].roleid);
          this.User = res.data[0];
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
        }
      } catch (e) {
        this.$router.push("/login");
        this.$message({ type: "error", message: "接口访问失败!" });
      }
    },
    exit() {
      this.$router.push("/login");
      localStorage.clear();
      sessionStorage.clear();
      this.$message({ type: "success", message: "退出成功" });
    }
  },
  created() {
    this.fetch();
    // window.onbeforeunload = function(e) {
    //   localStorage.clear();
    // };
  }
};
</script>