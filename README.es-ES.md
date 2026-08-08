

# Introducción a iframefileupload.js

iframefileupload.js está implementado con JavaScript nativo y permite cargar archivos en la página sin necesidad de recargarla, además de pasar datos JSON al servidor, todo ello con la menor dependencia de bibliotecas posible.

### Notas
- Si esto te ha sido útil, puedes hacer clic en "Star" en la esquina superior derecha para apoyarme. ¡Gracias! ^_^
- O puedes "seguirme" para que te avise cuando publique más proyectos interesantes

### Métodos de uso

### Configuración
``` javascript
iframeFileUpload({
	url: './test.php', // 后端 url
	elementId: ['file1', 'file2'], // input表单的id数组集合
	data: { // 发送到后端的data
		name: 'zym',
		blog: 'https://zhaoyiming0803.com'
	},
	success: function (res) {
		console.log(res); // 成功时回调函数
	},
	error: function (res) {
		console.log(res); // 错误时回调函数
	}
});
```

### HTML

``` html
<!-- 注意：一定要添加name属性 -->
<input type="file" name="file1" id="file1" />
<input type="file" name="file2" id="file2" />
<input type="button" value="提交" id="btn" />
```

### (1) Importación usando la etiqueta `<script>`:

``` javascript
<script type="text/javascript" src="iframeFileUpload.js"></script>
<script type="text/javascript">
	iframeFileUpload({
		url: './test.php',
		elementId: ['file1', 'file2'],
		data: {
			name: 'zym',
			blog: 'zhaoyiming0803.com'
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
### (2) Importación asíncrona usando RequireJS:
``` javascript
require(['iframeFileUpload'], function (iframeFileUpload) {
	iframeFileUpload({
		url: './test.php',
		elementId: ['file1', 'file2'],
		data: {
			name: 'zym',
			blog: 'https://zhaoyiming0803.com'
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
### (3) Importación usando ES6:
``` javascript
import iframeFileUpload from './iframeFileUpload.js';
iframeFileUpload({
	url: './test.php',
	elementId: ['file1', 'file2'],
	data: {
		name : 'zym',
		blog : 'https://zhaoyiming0803.com'
	},
	success: function (res) {
		console.log(JSON.parse(res));
	},
	error: function (res) {
		console.log(res);
	}
});
```
### PHP:
``` php
$files = $_FILES;
$data = $_POST;
sleep(5); // 模拟后端处理数据，即使需要很长时间，也确保前端能正常收到返回值
echo json_encode($files); 
// echo json_encode($data); 
```
### ¡iframeFileUpload.js es compatible con el [@plugin de validación de archivos](https://github.com/zymfe/validateFileUpload)!
### Código abierto bajo la licencia Apache 2.0
- Blog: [@Zhao Yiming](https://zhaoyiming0803.com)
- QQ: 1047832475
