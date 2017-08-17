# iframefileupload.js插件介绍

iframefileupload.js使用原生JS实现页面无刷新的情况下上传文件，同时脱离jquery和ajax，用最少的代码库依赖实现上传文件的同时也可以向后端传递json数据等。

### 使用说明

### 配置项
``` javascript
iframeFileUpload({
	type : 'post', // 传输方式，get或post，如果不设置，则默认为post
	url : './test.php', // 后端url地址
	elementId : ['file1', 'file2'], // 上传文件的input表单的id数组集合
	data : { // 要传给后端的data数据
		name : 'zym',
		blog : 'zymseo.com'
	},
	success : function (res) {
		console.log(JSON.parse(res)); // 执行成功之后的回调函数
	},
	error : function (res) {
		console.log(res); // 执行失败之后的回调函数
	}
});
```

### html

``` html
<input type="file" name="file1" id="file1" />
<input type="file" name="file2" id="file2" />
<input type="button" value="提交" id="btn" />
```

### （1）script标签引入

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
### （2）require方法异步引入：
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
### （3）ES6语法引入：
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
### 后端PHP：
``` php
$files = $_FILES;
$data = $_POST;
sleep(5); // 模拟后端处理处理，即使需要很长时间，也可以保证前端能正常接收到返回值。
echo json_encode($files); // 向前端展示结果，判断是否接受成功，仅供测试
// echo json_encode($data); // 向前端展示结果，判断是否接受成功，仅供测试
```
### iframeFileUpload.js可与[@文件校验插件](https://github.com/zymseo/validateFileUpload)配合使用！
### 插件遵循Apache开源许可协议
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475