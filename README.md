# iframefileupload.js introduction

Iframefileupload.Js use native js implementation without refresh the page to upload files, at the same time out of the jquery and ajax, with the least amount of code libraries depend on the realization of upload files at the same time, it can be passed to back-end json data, etc.

### Introductions of use

### configuration
``` javascript
iframeFileUpload({
	type : 'post', // get/post
	url : './test.php', // back-end url
	elementId : ['file1', 'file2'], // a collection of the array of ids
	data : { // data to back-end
		name : 'zym',
		blog : 'zymseo.com'
	},
	success : function (res) {
		console.log(JSON.parse(res)); // callback of success
	},
	error : function (res) {
		console.log(res); // callback of error
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
sleep(5); // Simulation of the back-end processing data, even if it takes a long time, ensures that the front end can receive normal return values.
echo json_encode($files); 
// echo json_encode($data); 
```
### iframeFileUpload.js可与[@文件校验插件](https://github.com/zymseo/validateFileUpload)配合使用！
### Released under Apache2.0 license
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475