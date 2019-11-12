<template>
  <div>
    <el-container border style="height:100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path" :default-openeds="['1-2']">
              <!-- <el-menu-item index="1-2">首页</el-menu-item> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>Md5解码
            </template>
              <el-menu-item index="/about">Md5解码</el-menu-item>
              <el-menu-item index="1-2">Md5解码</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>用户管理
            </template>
              <el-menu-item index="/CreateUser">创建用户</el-menu-item>
              <el-menu-item index="1-2">用户管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>流水记录
            </template>
              <el-menu-item index="1-2">历史记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span style="margin-right: 5px">王小虎</span>
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-check">切换账号</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">注销</el-dropdown-item>
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
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  methods: {
    async fetch() {
      // const res = await this.$axios.get("demo");
      // console.log(res);
    }
  },
  created() {
    this.fetch();
  }
};
</script>