/*
 * Description: iframefileupload.js
 * User: zymseo.com
 * Date: 2017/08/15
*/

;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) : (global.iframeFileUpload = factory());
})(this, function () {
	'use strict';

	// 字符串转为dom对象
	function strToDom (str) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = str;
		return oDiv.childNodes[0];
	}
	
	// 创建iframe
	function createUploadIframe (oDoc, oBody, id) {
		var iframeId = 'iframe' + id,
			iframeHtml = '<iframe name="'+ iframeId +'" id="'+ iframeId +'" src="about:blank" frameborder="0" style="display:none;"></iframe>';
		oBody.appendChild(strToDom(iframeHtml));
		return oDoc.querySelector('#' + iframeId);
	}
	
	// 创建form表单
	function createUploadForm (oDoc, oBody, url, data, id, method) {
		var formId = 'form' + id,
			tmpInpt = null,
			formHtml = '<form action="'+ url +'" target="iframe'+ id +'" name="fileinfo" method="POST" enctype="multipart/form-data" id="'+ formId +'" style="display:none;">';
		for (var prop in data) {
			formHtml += '<input type="text" name="'+ prop +'" value="'+ data[prop] +'" />';
		}
		formHtml += '</form>';

		oBody.appendChild(strToDom(formHtml));
		return oDoc.querySelector('#' + formId);
	}

	// 提交form表单
	function formSubmit (oForm) {
		oForm.submit();
	}

	// 获取后端返回的数据
	function getData (oForm) {
		return oForm.contentWindow.document.body.innerHTML;
	}
	
	// 上传类
	function IframeFileUpload (opt) {
		this.opt = opt;
	}

	IframeFileUpload.prototype.init = function () {
		var opt = this.opt,
			_type = opt.type ? opt.type : 'post', // 传输方式：get/post
			_url = opt.url, // 后端url
			_elementId = typeof opt.elementId === 'string' ? [opt.elementId] : opt.elementId, // input类型为file的id数组集合
			_elementIdLen = _elementId.length,
			_data = opt.data, // 后端通过get或post接收到数据
			_success = opt.success, // 成功时回调
			_error = opt.error, // 错误时回调
			oDoc = document,
			oBody = oDoc.body,
			id = new Date().getTime(), // 随机ID
			iframe = createUploadIframe(oDoc, oBody, id),
			form = createUploadForm(oDoc, oBody, _url, _data, id, _type),
			tmpNode = null,
			i = 0,
			submitTimer = null,
			getDataTimer = null;

		for (; i < _elementIdLen; i += 1) {
			tmpNode = oDoc.querySelector('#' +_elementId[i]).cloneNode(true);
			form.appendChild(tmpNode);
		}

		submitTimer = setTimeout(function () {
			formSubmit(form);
		}, 200);

		getDataTimer = setTimeout(function () {
			try {
				_success(getData(iframe));
			} catch (e) {
				_error(e);
			}
			submitTimer = getDataTimer = iframe = form = opt = null;
		}, 400);
	};

	// 初始化对象，获取参数
	function iframeFileUpload (opt) {
		new IframeFileUpload(opt).init();
	}

	return iframeFileUpload;
});