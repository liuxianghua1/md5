<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form :model="model" :rules="rules" ref="model" class="demo-ruleForm1">
                <el-form-item label="用户名" prop="loginname">
                    <el-input placeholder="请输入账户" prefix-icon="el-icon-user" v-model="model.loginname"></el-input>
                </el-form-item>
    
                <el-form-item label="密码" prop="password">
                    <el-input type="password" prefix-icon="el-icon-unlock" placeholder="请输入密码" show-password @keyup.enter.native="submitForm('model')" v-model="model.password"></el-input>
                </el-form-item>
    
                <el-form-item>
                    <el-button type="primary" @click="submitForm('model')">提交</el-button>
                    <el-button @click="resetForm('model')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                loginname: "",
                password: ""
                // "eyJ0eWUiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE1NzM1NTEzMzAsImxvZ2lubmFtZSI6InhzbCIsInVzZXJuYW1lIjoi6K6v5qOu5p6XIiwicGlkIjoiMCIsInBhc3N3b3JkIjoiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2UifQ.F2n80ktBXC9hhpCNqXLTND0VitkbwkslX2npj7RwGNM"
            },
            rules: {
                loginname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        async login() {
            try {
                const res = await this.$http.post('user/login.zul', this.model,{
                    header: "application/json;charset=utf8"
                })
                if (res.data[0].token) {
                    localStorage.token = res.data[0].token;
                    this.$router.push("/");
                    this.$message({ type: "success", message: "登录成功!" });
                } else if (res.data[0].code == 5) {
                    this.$message({ type: "error", message: "用户名不存在!" });
                } else {
                    this.$message({ type: "error", message: "密码错误!" });
                }
            } catch (e) {
                this.$message({ type: "error", message: "接口访问失败!" });
            }
        }
    }
};
</script>

<style>
.login-card {
    width: 25rem;
    margin: 8rem auto;
}
</style>