<template>
  <div>
    <div>
      <el-select clearable class="search" v-model="status" placeholder="请选择支出类型">
        <el-option label="支出" value="0"></el-option>
        <el-option label="收入" value="1"></el-option>
        <el-option label="消费" value="2"></el-option>
      </el-select>
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
      <el-table-column label="序号" type="index" :index="table_index" show-ov erflow-tooltip></el-table-column>
      <el-table-column prop="status" label="支出类型">
        <template slot-scope="scope">
          <div>
            <!-- 获取一行数据 -->
            {{ scope.row.status == 0 ? '支出' : scope.row.status == 1 ? '收入' : scope.row.status == 2 ? '消费' : '未知' }}
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
let _ = require("lodash");
export default {
  data() {
    return {
      starttime: "",
      endtime: "",
      status: "",
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
          status: this.status,
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
      this.pagination.total = res.data.records;
      this.tableData = res.data.rows;
    },
    async fetch(status, starttime, endtime) {
      if (starttime == null) {
        this.starttime = "";
      }
      if (endtime == null) {
        this.endtime = "";
      }
      const res = await this.$http.post(
        "investMoney/query.zul",
        {
          status: status,
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
    decodenameSearch: _.debounce(function(status, starttime, endtime) {
      this.fetch(status, starttime, endtime);
    }, 1000)
  },
  created() {
    this.fetch();
  },
  watch: {
    status: function(val) {
      this.decodenameSearch(val, this.starttime, this.endtime);
    },
    starttime: function(val) {
      this.decodenameSearch(this.status, val, this.endtime);
    },
    endtime: function(val) {
      this.decodenameSearch(this.status, this.starttime, val);
    }
  }
};
</script>