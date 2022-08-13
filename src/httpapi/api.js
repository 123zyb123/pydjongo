import axios from 'axios'

const request = axios.create({
	validateStatus: function(status) {
		return true
	},
	baseURL: 'https://域名.com',
})

// request.defaults.headers.common["appkey"] = '800a6444f9c0433c8e88741b6ddf1443';
request.interceptors.request.use(function(config) {
	console.log(config)
	if (window.sessionStorage.getItem('token')) {
		config.headers.Authorization = window.sessionStorage.getItem('token');
	}
	return config;
})


export default request
