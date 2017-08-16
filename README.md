# iframefileupload.js插件介绍

iframefileupload.js使用原生JS实现页面无刷新的情况下上传文件，在上传文件的同时也可以向后端传递json数据等。

##使用说明
###（1）script标签引入
``` javascript
<script type="text/javascript" src="iframefileupload.js"></script>
<script type="text/javascript">
	iframefileupload({
		type : 'post',
		url : './test.php',
		elementId : ['file1', 'file2'],
		data : {
			name : 'zym',
			blog : 'zymseo.com'
		},
		success : function (res) {
			console.log(JSON.parse(res));
		},
		error : function (res) {
			console.log(res);
		}
	});
</script>
```
### （2）require方法异步引入：
``` javascript
require(['iframefileupload'], function (iframefileupload) {
	iframefileupload({
		type : 'post',
		url : './test.php',
		elementId : ['file1', 'file2'],
		data : {
			name : 'zym',
			blog : 'zymseo.com'
		},
		success : function (res) {
			console.log(JSON.parse(res));
		},
		error : function (res) {
			console.log(res);
		}
	});
});
```
### （3）ES6语法引入：
``` javascript
import iframefileupload from './iframefileupload.js';
iframefileupload({
	type : 'post',
	url : './test.php',
	elementId : ['file1', 'file2'],
	data : {
		name : 'zym',
		blog : 'zymseo.com'
	},
	success : function (res) {
		console.log(JSON.parse(res));
	},
	error : function (res) {
		console.log(res);
	}
});
```
### 插件遵循Apache开源许可协议
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475
