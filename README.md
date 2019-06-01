# iframefileupload.js简介

iframefileupload.js通过原生JS实现，用最少的代码库依赖实现页面无刷新上传文件的同时也可以向后端传递json数据等。

### 说明 
- 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
- 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

### 使用方法

### 配置
``` javascript
iframeFileUpload({
	url: './test.php', // 后端 url
	elementId: ['file1', 'file2'], // input表单的id数组集合
	data: { // 发送到后端的data
		name: 'zym',
		blog: 'zymseo.com'
	},
	success: function (res) {
		console.log(res); // 成功时回调函数
	},
	error: function (res) {
		console.log(res); // 错误时回调函数
	}
});
```

### html

``` html
<!-- 注意：一定要添加name属性 -->
<input type="file" name="file1" id="file1" />
<input type="file" name="file2" id="file2" />
<input type="button" value="提交" id="btn" />
```

### （1）使用script 标签引入:

``` javascript
<script type="text/javascript" src="iframeFileUpload.js"></script>
<script type="text/javascript">
	iframeFileUpload({
		url: './test.php',
		elementId: ['file1', 'file2'],
		data: {
			name: 'zym',
			blog: 'zymseo.com'
		},
		success: function (res) {
			console.log(res);
		},
		error: function (res) {
			console.log(res);
		}
	});
</script>
```
### （2）使用requireJs异步引入:
``` javascript
require(['iframeFileUpload'], function (iframeFileUpload) {
	iframeFileUpload({
		url: './test.php',
		elementId: ['file1', 'file2'],
		data: {
			name: 'zym',
			blog: 'zymseo.com'
		},
		success: function (res) {
			console.log(res);
		},
		error: function (res) {
			console.log(res);
		}
	});
});
```
### （3）使用ES6方式导入：
``` javascript
import iframeFileUpload from './iframeFileUpload.js';
iframeFileUpload({
	url: './test.php',
	elementId: ['file1', 'file2'],
	data: {
		name : 'zym',
		blog : 'zymseo.com'
	},
	success: function (res) {
		console.log(JSON.parse(res));
	},
	error: function (res) {
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
### iframeFileUpload.js可与[@文件校验插件](https://github.com/zymfe/validateFileUpload)配合使用！
### 基于 Apache2.0 license 开源
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475