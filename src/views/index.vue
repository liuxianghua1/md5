
<template>
  <el-container border style="height:100vh;">
    <!-- 头部 -->
    <el-header>
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
    <el-container>
      <div>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router unique-opened :default-active="$route.path">
            <template>
              <!-- <a href="/" style="text-align: center;text-decoration: none;">
                <h1
                  style="color: #364149;font-weight: 300;font-size: 1.3rem;font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;"
                >工单提交平台</h1>
              </a>-->
              <router-link style="text-align: center;" to="/">
                <h1
                  style="color: #364149;font-weight: 300;font-size: 1.3rem;font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;"
                >Md5解码平台</h1>
              </router-link>
            </template>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-folder-opened"></i> Md5解码
              </template>

              <el-menu-item index="/DecodingFile">Md5解码</el-menu-item>
              <el-menu-item index="/DecodingRecord">解码记录</el-menu-item>
            </el-submenu>
            <el-submenu
              v-if="this.$store.getters.get_roleid.roleid == 1 || this.$store.getters.get_roleid.roleid == 2"
              index="2"
            >
              <template slot="title">
                <i class="el-icon-user"></i>
                用户管理
              </template>

              <el-menu-item index="/CreateUser">创建用户</el-menu-item>
              <el-menu-item index="/UserList">用户管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                流水记录
              </template>
              <el-menu-item index="/Record">流水记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>

      <el-main>
        <div v-if="this.$route.path == '/'">
          <el-col :span="12">
            <ve-line
              :loading="loading"
              :data="consumPtion"
              :extend="extend"
              :settings="chartSettings"
            ></ve-line>
          </el-col>
          <el-col :span="12">
            <ve-funnel
              :loading="loading"
              :data="consumPtion"
              :extend="extend"
              :settings="chartSettings"
            ></ve-funnel>
          </el-col>
          <el-col :span="12">
            <ve-waterfall
              :loading="loading"
              :data="consumPtion"
              :extend="extend"
              :settings="chartSettings"
            ></ve-waterfall>
          </el-col>
          <el-col :span="12">
            <ve-bar
              :loading="loading"
              :data="consumPtion"
              :extend="extend"
              :settings="chartSettings"
            ></ve-bar>
          </el-col>
        </div>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #00a65a;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import "v-charts/lib/style.css";
import Vue from "vue";
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        consumPtion: "消费条数",
        username: "用户",
        month: "月份"
      },
      area: true
    };
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    return {
      tableData: [],
      User: [],
      article: 1,
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "年龄"],
        rows: [
          { 日期: "1/1", 访问用户: 123, 年龄: 3, 下单用户: 1244 },
          { 日期: "1/2", 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
          { 日期: "1/3", 访问用户: 7123, 年龄: 9, 下单用户: 3245 },
          { 日期: "1/4", 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
          { 日期: "1/5", 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
          { 日期: "1/6", 访问用户: 2323, 年龄: 20, 下单用户: 6537 }
        ]
      },
      consumPtion: {
        columns: ["username", "consumPtion", "month"],
        rows: []
      },
      loading: true
    };
  },
  methods: {
    swtichs() {
      this.$router.push("/login");
    },
    async consumPtionFetch() {
      const res = await this.$http.post("investMoney/consumption.zul", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      this.consumPtion.rows = res.data;
      if (this.consumPtion.rows.length >= 1) {
        this.loading = false;
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
          Vue.prototype.User = res.data[0];
          this.$store.commit("SetUser", res.data[0]);
          this.$store.commit("set_roleid", res.data[0].roleid);
          localStorage.setItem("roleid", res.data[0].roleid);
          localStorage.setItem("id", res.data[0].id);
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
    this.consumPtionFetch();
    // window.onbeforeunload = function(e) {
    //   localStorage.clear();
    // };
  }
};
</script>

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
.el-dropdown {
  float: right;
}
.el-menu {
  border-right: 0px;
}
a {
  text-decoration: none;
}
</style>