<template>
	<div>
		<!-- 分割线 -->
		<el-divider content-position="left"><span style="color: blue;">
				<H2>接口</H2>
			</span></el-divider>
		<el-row :gutter="20">
			<el-col :span="2">
				<el-select v-model="forminfo.requestmethod" placeholder="请求方式">
					<el-option label="GET" value="GET"></el-option>
					<el-option label="POST" value="POST"></el-option>
				</el-select>
			</el-col>
			<el-col :span="15">
				<el-input placeholder="请输入接口地址" v-model="forminfo.requesturl">
					<template slot="prepend">接口地址</template>
				</el-input>
			</el-col>
			<el-col :span="3">
				<el-button type="primary" icon="el-icon-s-promotion">发送请求</el-button>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" icon="el-icon-folder-checked">保存</el-button>
			</el-col>
		</el-row>
		<!-- 分割线 -->
		<el-divider content-position="left">
			<span style="color: blue;">请求数据</span>
		</el-divider>
		<el-tabs type="border-card">
			<el-tab-pane label="请求头">
				<el-row :gutter="20" v-for="(header,index) in forminfo.headers" :key="index" style="margin: 10px;">
					<el-col :span="6">
						<el-input v-model="header.key" placeholder="key"></el-input>
					</el-col>
					<el-col :span="12">
						<el-input v-model="header.value" placeholder="value"></el-input>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" icon="el-icon-delete" round @click="deleterow(header,headers)">
						</el-button>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="请求参数">
				<el-tabs>
					<el-tab-pane label="params" name="first">
						<el-row :gutter="20" v-for="(header,index) in forminfo.params" :key="index"
							style="margin: 10px;">
							<el-col :span="6">
								<el-input v-model="header.key" placeholder="key"></el-input>
							</el-col>
							<el-col :span="12">
								<el-input v-model="header.value" placeholder="value"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" icon="el-icon-delete" round @click="deleterow(params,params)">
								</el-button>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="json" name="second">
						<editor height="300" width="100%" ref="editor" :contect="forminfo.json" v-model="forminfo.json"
							:options="{ enableBasicAutocompletion:true, enableSnippents:true,
							enableLiveAutocompletion:true, tabSize:2, fontSize:20, showPrintMargin:false }" :lang="'json'"
							@init="editorInit">
						</editor>
						<el-button type="primary" size="small" @click="jschange">格式化json数据</el-button>

					</el-tab-pane>
					<el-tab-pane label="data" name="third">
						<el-row :gutter="20" v-for="(header,index) in forminfo.data" :key="index" style="margin: 10px;">
							<el-col :span="6">
								<el-input v-model="header.key" placeholder="key"></el-input>
							</el-col>
							<el-col :span="12">
								<el-input v-model="header.value" placeholder="value"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" icon="el-icon-delete" round @click="deleterow(data,data)">
								</el-button>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
			<el-tab-pane label="前置处理器">前置处理器</el-tab-pane>
			<el-tab-pane label="后置处理器">后置处理器</el-tab-pane>
			<el-tab-pane label="断言">断言</el-tab-pane>
			<el-tab-pane label="数据库校验">数据库校验</el-tab-pane>
		</el-tabs>
		<json-view :data="forminfo" theme="vs-code" />
	</div>
</template>

<script>
	import Editor from 'vue2-ace-editor'
	import jsonView from 'vue-json-views'
	export default {
		data() {
			return {
				forminfo: {
					requestmethod: "GET",
					requesturl: "",
					headers: [{
						key: "",
						value: ""
					}],
					params: [{
						key: "",
						value: ""
					}],
					data: [{
						key: "",
						value: ""
					}],
					json: '{}',
				},

			}
		},
		watch: {
			'forminfo.headers': {
				handler: function(val, oldVal) {
					this.addInputRow('headers')
				},
				deep: true
			},
			'forminfo.data': {
				handler: function(val, oldVal) {
					this.addInputRow('data')
				},
				deep: true
			},
			'forminfo.params': {
				handler: function(val, oldVal) {
					this.addInputRow('params')
				},
				deep: true
			}
		},
		methods: {
			deleterow(header, name) {
				const newdata = this.forminfo[name].filter(function(item, index) {
					return header != item
				})
				this.forminfo[name] = newdata
			},
			editorInit: function() {
				require('brace/ext/language_tools')
				require('brace/mode/yaml')
				require('brace/mode/json')
				require('brace/mode/less')
				require('brace/theme/chrome')
				require('brace/snippets/json')
			},
			addInputRow(name) {
				const padata = this.forminfo[name]
				if (padata.length === 0) {
					this.forminfo[name].push({
						key: "",
						value: ""
					})
				}
				if (padata[padata.length - 1].key || padata[padata.length - 1].value) {
					this.forminfo[name].push({
						key: "",
						value: ""
					})
				}
			},
			jschange() {
				console.log("打印类型：", this.forminfo.json)
				const jsdata = JSON.parse(this.forminfo.json)
				this.forminfo.json = JSON.stringify(jsdata, null, 4)
			},
		},

		components: {
			Editor,
			jsonView

		}
	}
</script>

<style>
</style>
