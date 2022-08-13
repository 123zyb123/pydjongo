<template>
	<div>
		<el-container>
			<el-header>
				<div class="title">
					接 口 自 动 化 测 试 平 台
				</div>
				<div class="logout">
					<el-popconfirm title="确定退出登录吗？" @confirm="logout">
						<div slot="reference">退出登录</div>
					</el-popconfirm>
				</div>
			</el-header>
			<el-container>
				<el-aside width="240px">
					<el-menu class="el-menu-demo" router="routerStatus" background-color="#545c64" text-color="#ffff00"
						unique-opened="routerStatus" active-text-color="#aa55ff" default-active="Myinformation">
						<el-submenu index="mymanager">
							<template slot="title">
								<i class="el-icon-star-on"></i>
								<span>项目管理</span>
							</template>
							<el-menu-item index="Myinformation">项目列表</el-menu-item>
						</el-submenu>
						<el-submenu index="healthmanager">
							<template slot="title">
								<i class="el-icon-info"></i>
								<span>接口管理</span>
							</template>
							<el-menu-item index="Health">接口列表</el-menu-item>
						</el-submenu>
						<el-submenu index="familymanager">
							<template slot="title">
								<i class="el-icon-remove"></i>
								<span>用例管理</span>
							</template>
							<el-menu-item index="Familyinformation">用例信息</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				routerStatus: true
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			logout() {
				window.sessionStorage.removeItem('token')
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	.el-header {
		background-color: blue;
		margin-bottom: 3px;
	}

	.title {
		width: 90%;
		color: #fafafa;
		font: normal 28px/60px "microsoft yahei";
		text-align: center;
		float: left;
	}

	.logout {
		width: 7%;
		color: antiquewhite;
		font: bold 17px/60px "宋体";
		float: right;
		text-align: center;
	}

	.logout:hover {
		background: #ff0000;
	}

	.el-menu {
		height: 800px;
	}
</style>
