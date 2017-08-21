# iframefileupload.js简介

Iframefileupload.js使用原生JS编写，无需依赖如jQuery等第三方插件库，实现页面无刷新文件上传，兼容script标签、require异步、ES6的import等三种方式引入使用。

### Introductions of use

### configuration
``` javascript
iframeFileUpload({
	type : 'post', // get/post
	url : './test.php', // 后端 url
	elementId : ['file1', 'file2'], // input表单的id数组集合
	data : { // 发送到后端的data
		name : 'zym',
		blog : 'zymseo.com'
	},
	success : function (res) {
		console.log(JSON.parse(res)); // 成功时回调函数
	},
	error : function (res) {
		console.log(res); // 错误时回调函数
	}
});
```

### html

``` html
<input type="file" name="file1" id="file1" />
<input type="file" name="file2" id="file2" />
<input type="button" value="提交" id="btn" />
```

### （1）script tag:

``` javascript
<script type="text/javascript" src="iframeFileUpload.js"></script>
<script type="text/javascript">
	iframeFileUpload({
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
### （2）require async:
``` javascript
require(['iframeFileUpload'], function (iframeFileUpload) {
	iframeFileUpload({
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
### （3）ES6 grammar：
``` javascript
import iframeFileUpload from './iframeFileUpload.js';
iframeFileUpload({
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
### PHP：
``` php
$files = $_FILES;
$data = $_POST;
sleep(5); // 模拟后端处理数据，即使需要很长时间，也确保前端能正常收到返回值
echo json_encode($files); 
// echo json_encode($data); 
```
### iframeFileUpload.js可与[@文件校验插件](https://github.com/zymseo/validateFileUpload)配合使用！
### Released under Apache2.0 license
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475