<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="loginname" label="登录名">
        </el-table-column>
        <el-table-column prop="roleid" label="权限">
        </el-table-column>
        <el-table-column prop="pid" label="上级代理">
        </el-table-column>
           <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button plain size="medium" @click.native.prevent="deleteRow(scope.$index, tableData)"
                   type="success">添加次数</el-button>
                  <el-button plain size="medium" @click.native.prevent="deleteRow(scope.$index, tableData)"
                   type="primary">修改</el-button>
                  <el-button plain size="medium" @click.native.prevent="deleteRow(scope.$index, tableData)"
                   type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        async fetch() {
            // const res = await this.$mock.get('/UserList');
            // this.tableData = res.data;
            console.log(this.tableData);
        }
    },
    created() {
        this.fetch();
    }
}
</script>