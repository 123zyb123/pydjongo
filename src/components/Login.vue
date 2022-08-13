<template>
	<div class="login_class">
		<el-card class="box-card">
			<div class="title">接 口 自 动 化 登 录 平 台</div>
			<el-form ref="loginref" :model="logindata" :rules="loginroules">
				<el-form-item prop="username">
					<el-input type="text" v-model="logindata.username" placeholder="请输入用户名"
						prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="logindata.password" type="password" placeholder="请输入密码"
						prefix-icon="el-icon-lock"></el-input>
				</el-form-item>

				<el-switch v-model="logindata.status" active-text="记住账户与密码"></el-switch>
				<el-form-item style="text-align: center;">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="primary" @click="getbody()">注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				logindata: {
					username: "PNl80b5QRyUWfXwqgtLnad0p67rlcA2EjsXgneKSqZnQQiUJxxZLCCUWgz6tz2bfRR7YnaPX0I/QfK1ahOgz1ZuG0j25vJi7ZRCyHZIbW/IbjOAsvK1V69dOp3yJ55UyAKwtEjINMdN9vL+hr8xhpCvGB20kZMZ1H80dZoCSLAY=",
					password: "QrUo3plnsbjRWGTTATchHHf+DuDoSLkw+RQHbF3K35lvxsXsbVfO0Obw/0T16LbrKxFm+ikFXusVHe/X9Hb4wixe7g6+78Q6wDU3Z6v2OB4EMeFf13DiPAftznZUIEMMzpzVtMb4irkE/C4QLwyY0ezxIzQ04Mpa4Ky6+OsfX/g=",
					status: false
				},
				loginroules: {
					username: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 200,
							message: '长度在 6 到 200 个字符之间',
							trigger: 'blur'
						}
					]
				}

			}
		},
		methods: {
			login: async function() {
				const fromData = new URLSearchParams();
				fromData.append('username', this.logindata.username)
				fromData.append('password', this.logindata.password)
				this.$refs.loginref.validate(async (vaild) => {
					console.log(vaild)
					if (!vaild) return

					if (this.logindata.status) {
						window.localStorage.setItem('username', this.logindata.username)
						window.localStorage.setItem('password', this.logindata.password)
					} else {
						window.localStorage.removeItem('username')
					}

					//在main.js绑定之后，在vue中可以通过this.$request调用axios
					const res = await this.$request.post(
						"/userapi/public/account/login", fromData)
					if (res.data.status === 200) {
						this.$message({
							message: '登录成功',
							type: 'success',
							duration: 800
						})
						window.sessionStorage.setItem('token', res.data.result)
						this.$router.push('/indexhome')
					} else {
						this.$message.error('登录失败')
					}
				})
			},
			getbody1: function() {
				this.$request.get("/userbody/get").then(function(response) {
					alert(response.data.result)
				})
			},
			getbody: async function() {
				var res = await this.$request.post("/userapi/userbody/get")
				console.log(res)
				alert(res.data.result.id)
			}
		},
		mounted() {
			const username = window.localStorage.getItem('username')
			if (username) {
				this.logindata.username = username
				this.logindata.password = password
				this.logindata.status = true
			}
		}
	}
</script>

<style scoped>
	/*在style中添加scoped属性，表示css只对该组件生效*/
	.login_class {
		width: 600px;
		height: 400px;
		margin: 100px auto;
	}

	.title {
		color: #409EFF;
		font: bold 30px/60px "microsoft yahei";
		width: 600px;
		text-align: center;
		margin-bottom: 30px;
	}
</style>
