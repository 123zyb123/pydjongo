<template>
	<div>
		<el-card>
			<el-card class="box-card1">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">默认主页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
					<el-breadcrumb-item>项目列表</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<el-card class="box-card2">
				<!-- 搜索和新增 -->
				<div class="queryandreset">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-input v-model="formInline" placeholder="请输入项目名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="clickchery">查询</el-button>
							<el-button plain @click="clickreset">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="useradd">
					<el-button type="primary" @click="clicknewadd">新增</el-button>
				</div>

				<!-- 表格 -->
				<el-table :data="tableData" stripe style="width: 100%" :header-cell-style="tablestyle"
					:default-sort="{prop: 'updatedAt', order: 'descending'}">
					<el-table-column type="index" :index="indexMethod" label="序号" width="100">
					</el-table-column>
					<el-table-column label="logo" width="180">
						<template slot-scope="scope">
							<img :src="scope.row.imageUrl" alt="" style="height: 100px; width: 80px;" /></template>
					</el-table-column>
					<el-table-column prop="name" label="项目名称" width="180">
					</el-table-column>
					<el-table-column prop="contactUser" label="联系人" width="180">
					</el-table-column>
					<el-table-column prop="email" label="联系方式">
					</el-table-column>
					<el-table-column prop="updatedAt" label="更新时间" width="180" sortable>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
						layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-card>
		</el-card>

		<el-dialog title="新增项目信息" :visible.sync="newadddialogFormVisible">
			<el-form :model="newadduser" ref="editinref" :rules="rules" :label-position="labelPosition">
				<el-form-item label="LOGO" :label-width="formLabelWidth">
					<div class="avatar-uploader">
						<el-upload action="https://ali-consoleapi.idoocloud.com/api/image/device/upload"
							list-type="picture-card" :headers="headers" :on-success="newaddhandleAvatarSuccess"
							:show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="newadduser.imageUrl" :src="newadduser.imageUrl" class="avatar" alt=""
								width="100%">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<i v-if="newadduser.imageUrl" class="el-icon-delete" style="float: left"
							@click="newadddelimage"></i>
					</div>
				</el-form-item>
				<el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
					<el-input v-model="newadduser.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人" :label-width="formLabelWidth" prop="contactUser">
					<el-input v-model="newadduser.contactUser" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth" prop="email">
					<el-input v-model="newadduser.email" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="newadddialogFormVisible=false">取 消</el-button>
				<el-button type="primary" @click="newadddialogForm">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑项目信息" :visible.sync="dialogFormVisible">
			<el-form :model="form" ref="editinref" :rules="rules" :label-position="labelPosition">
				<el-form-item label="LOGO" :label-width="formLabelWidth">
					<div class="avatar-uploader">
						<el-upload action="https://ali-consoleapi.idoocloud.com/api/image/device/upload"
							list-type="picture-card" :headers="headers" :on-success="handleAvatarSuccess"
							:show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" alt="" width="100%">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<i v-if="form.imageUrl" class="el-icon-delete" style="float: left" @click="delimage"></i>
					</div>
				</el-form-item>
				<el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人" :label-width="formLabelWidth" prop="contactUser">
					<el-input v-model="form.contactUser" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth" prop="email">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<el-button type="primary" @click="dialogForm">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				pagesize: 10,
				total: 400,
				dialogFormVisible: false,
				labelPosition: "left",
				formLabelWidth: '120px',
				form: {},
				rules: {
					name: [{
							required: true,
							message: '请输入客户姓名',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 30,
							message: '长度在 5 到 30 个字符',
							trigger: 'blur'
						}
					],
					contactUser: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: '请输入联系方式',
							trigger: 'blur'
						},
						{
							min: 8,
							max: 100,
							message: '长度在 8 到 100 个字符',
							trigger: 'blur'
						}
					]
				},
				formInline: "",
				headers: {
					"Authorization": window.sessionStorage.getItem('token')
				},
				newadddialogFormVisible: false,
				newadduser: {
					imageUrl: "",
					name: "",
					contactUser: "",
					email: ""
				}
			}
		},
		methods: {

			indexMethod(index) {

				index = (this.currentPage - 1) * this.pagesize + (index++) + 1
				return index
			},
			async getlist() {
				const fromData = new URLSearchParams();
				fromData.append('pageSize', this.pagesize)
				fromData.append('pageId', this.currentPage)
				fromData.append('orderBy', "UPDATED_AT")
				const res = await this.$request.post(
					"/api/org/query", fromData)
				if (res.data.status === 200) {
					console.log(res)
					this.tableData = res.data.result.items
					this.total = res.data.result.numRows
				}
			},
			handleSizeChange(size) {
				this.pagesize = size
				this.currentPage = 1
				this.getlist()
				console.log(`每页 ${size} 条`);

			},
			handleCurrentChange(Page) {
				this.currentPage = Page
				this.getlist()
				console.log(`当前页: ${Page}`);
			},
			errorHandler() {
				return true
			},
			handleDelete(index, id) {
				console.log("我是id:", id);
				console.log("我是索引:", index)
				this.$message({
					message: '删除成功',
					type: 'success',
					duration: 800
				})
			},
			handleEdit(index, value) {
				console.log("我是编辑id:", value);
				console.log("我是编辑索引:", index);
				this.form = {
					...value
				}
				this.dialogFormVisible = true
			},
			async dialogForm() {
				this.$refs.editinref.validate(async (vaild) => {
					console.log(vaild)
					if (!vaild) return
					const res = await this.$request.post("/api/org/update", this.form)
					console.log(res)
					if (res.data.status === 200) {
						this.$message({
							message: '编辑成功',
							type: 'success',
							duration: 800
						});
						this.getlist()
						this.dialogFormVisible = false
					} else {
						this.$message({
							message: '编辑失败',
							type: 'error',
							duration: 1000
						})
					}
				})
			},
			async clickchery() {
				console.log(this.formInline)
				const fromData = new URLSearchParams();
				fromData.append('pageSize', 10)
				fromData.append('pageId', 1)
				fromData.append('orderBy', "UPDATED_AT")
				fromData.append('name', this.formInline)
				const res = await this.$request.post(
					"/api/org/query", fromData)
				if (res.data.status === 200) {
					console.log(res)
					this.tableData = res.data.result.items
					this.total = res.data.result.numRows
				}
			},
			clickreset() {
				this.formInline = ""
				this.currentPage = 1
				this.pagesize = 10
				this.getlist()
			},
			tablestyle() {
				return 'background: #e8e8e8'
			},
			handleAvatarSuccess(res, file) {
				console.log("响应结果", res.result.linkUrl)
				this.form.imageUrl = res.result.linkUrl;
			},
			clicknewadd() {
				this.newadddialogFormVisible = true
			},
			newadddelimage() {
				this.newadduser.imageUrl = ""
			},
			newaddhandleAvatarSuccess(res, file) {
				console.log("响应结果", res.result.linkUrl)
				this.newadduser.imageUrl = res.result.linkUrl;
			},
			async newadddialogForm() {
				this.$refs.editinref.validate(async (vaild) => {
					console.log(vaild)
					if (!vaild) return
					const res = await this.$request.post("/api/org/create", this.newadduser)
					console.log(res)
					if (res.data.status === 200) {
						this.$message({
							message: '添加成功',
							type: 'success',
							duration: 800
						});
						this.getlist()
						this.dialogFormVisible = false
					} else {
						this.$message({
							message: '添加失败',
							type: 'error',
							duration: 1000
						})
					}
				})
			},
			delimage() {
				this.form.imageUrl = ""
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		},
		mounted() {
			this.getlist()
		}
	}
</script>

<style scoped>
	.block {
		text-align: right;
		margin-top: 15px;
	}

	.queryandreset {
		float: left;
	}

	.useradd {
		float: right;
	}
</style>
