<template>
  <div>
    <div>
      <el-input
        class="search"
        v-model="decodename"
        clearable
        prefix-icon="el-icon-search"
        placeholder="输入解码文件搜索"
      />
      <el-date-picker
        class="search"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="starttime"
        type="datetime"
        placeholder="选择解码开始时间"
      ></el-date-picker>
      <el-date-picker
        class="search"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="endtime"
        type="datetime"
        placeholder="选择解码结束时间"
      ></el-date-picker>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="table_index"
        show-ov
        erflow-tooltip
        width="50"
      ></el-table-column>
      <el-table-column prop="decodename" label="解码文件"></el-table-column>
      <el-table-column prop="decodenum" label="消耗条数"></el-table-column>
      <el-table-column prop="username" label="解码用户"></el-table-column>
      <el-table-column prop="updatetime" label="解码时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">

          <el-button size="medium" v-if="scope.row.status == 0 && scope.row.uid == id" @click="download(scope.row)" type="primary">下载</el-button>
          <!-- <el-link v-else type="primary" disabled >您无权下载</el-link> -->
          <el-link v-if="scope.row.status == 1" type="primary" disabled >已下载</el-link>
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
  </div>
</template>

<script>
let _ = require("lodash");
export default {
  data() {
    return {
      id: localStorage.id,
      tableData: [],
      pagination: {
        total: 1,
        page_size: 20,
        page_index: 0
      },
      decodename: "",
      starttime: "",
      endtime: ""
    };
  },

  methods: {
    download(row) {
      window.open(
        `http://192.168.0.100:8081/xsl-decode/decodeRecode/downMd5.zul?id=${row.id}&uid=${localStorage.id}`
      );
      this.fetch();
    },
    async handleCurrentChange(page) {
      let res;
      if (
        this.decodename.length ||
        this.starttime.length ||
        this.endtime.length >= 1
      ) {
        res = await this.$http.post(
          "decodeRecode/query.zul",
          {
            decodename: this.decodename,
            starttime: this.starttime,
            endtime: this.endtime,
            page
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        );
      } else {
        res = await this.$http.post(
          "decodeRecode/query.zul",
          {
            page
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        );
      }
      this.pagination.total = res.data.records;
      this.tableData = res.data.rows;
    },
    async fetch(decodename, starttime, endtime) {
      let res;
      if (starttime == null) {
        this.starttime = "";
      }
      if (endtime == null) {
        this.endtime = "";
      }
      res = await this.$http.post(
        "decodeRecode/query.zul",
        {
          decodename: decodename,
          starttime: starttime,
          endtime: endtime
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
    table_index(index) {
      return (
        (this.pagination.page_index - 1) * this.pagination.page_size + index + 1
      );
    },
    decodenameSearch: _.debounce(function(decodename, starttime, endtime) {
      this.fetch(decodename, starttime, endtime);
    }, 1000)
  },
  created() {
    this.fetch();
  },
  watch: {
    decodename: function(val) {
      this.decodenameSearch(val, this.starttime, this.endtime);
    },
    starttime: function(val) {
      this.decodenameSearch(this.decodename, val, this.endtime);
    },
    endtime: function(val) {
      this.decodenameSearch(this.decodename, this.starttime, val);
    }
  }
};
</script>

<style>
.search {
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>