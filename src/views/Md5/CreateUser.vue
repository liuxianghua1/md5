<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
				<el-input-number v-model="ruleForm.num" :min="0"></el-input-number>
			</el-form-item>
	
			<el-form-item label="上级代理">
				<el-select v-model="ruleForm.pid" clearable placeholder="请选择上级代理">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
	
			<el-form-item label="权限">
				<el-radio v-model="ruleForm.roleid" label="1">管理员</el-radio>
				<el-radio v-model="ruleForm.roleid" label="2">代理商</el-radio>
				<el-radio v-model="ruleForm.roleid" label="5">用户</el-radio>
				<el-radio v-model="ruleForm.roleid" label="6">财务</el-radio>
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
			options: [],
			ruleForm: {
				username: "",
				loginname: "",
				password: "",
				roleid: "2",
				pid: "",
				num: 0
			},
			rules: {
				username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
				loginname: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					// { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
				],
			}
		};
	},
	methods: {
		async Create() {
			const res = await this.$axios.post('/user/insert.zul', this.ruleForm, {
				header: "application/json;charset=utf8"
			});
			console.log(res);
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.Create();
				} else {
					// console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>