/*
 * Description: Iframefileupload.Js use native js implementation without refresh the page to upload files, 
 * at the same time out of the jquery and ajax, with the least amount of code libraries depend on the realization of upload files at the same time, 
 * it can be passed to back-end json data, etc.
 * User: zymseo.com
 * Date: 2017/08/15
 * Released under Apache2.0 license, https://github.com/zymseo/iframeFileUpload
*/

;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) : (global.iframeFileUpload = factory());
})(this, function () {
	'use strict';

	// The string is converted to a dom object
	function strToDom (str) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = str;
		return oDiv.childNodes[0];
	}
	
	// Create an iframe
	function createUploadIframe (oDoc, oBody, id) {
		var iframeId = 'iframe' + id,
			iframeHtml = '<iframe name="'+ iframeId +'" id="'+ iframeId +'" src="about:blank" frameborder="0" style="display:none;"></iframe>';
		oBody.appendChild(strToDom(iframeHtml));
		return oDoc.querySelector('#' + iframeId);
	}
	
	// Create a form
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

	// Submit form
	function formSubmit (oForm) {
		oForm.submit();
	}

	// Gets the data returned from the back end
	function getData (oForm) {
		return oForm.contentWindow.document.body.innerHTML;
	}
	
	// The upload class
	function IframeFileUpload (opt) {
		this.opt = opt;
	}

	IframeFileUpload.prototype.init = function () {
		var opt = this.opt,
			_type = opt.type ? opt.type : 'post', // get/post
			_url = opt.url, // back-end url
			_elementId = typeof opt.elementId === 'string' ? [opt.elementId] : opt.elementId ? opt.elementId : false, // a collection of the array of ids
			_elementIdLen = _elementId ? _elementId.length : 0,
			_data = opt.data, // data to back-end
			_success = opt.success, // callback of success
			_error = opt.error, // callback of error
			oDoc = document,
			oBody = oDoc.body,
			id = new Date().getTime(), // random id
			iframe = createUploadIframe(oDoc, oBody, id),
			form = createUploadForm(oDoc, oBody, _url, _data, id, _type),
			tmpNode = null,
			i = 0,
			submitTimer = null,
			getDataTimer = null,
			iframeContent = '';
		
		if (_elementIdLen) {
			for (; i < _elementIdLen; i += 1) {
				tmpNode = oDoc.querySelector('#' +_elementId[i]).cloneNode(true);
				form.appendChild(tmpNode);
			}
		}

		submitTimer = setTimeout(function () {
			formSubmit(form);
			iframeContent = iframe.contentWindow.document.body.innerHTML;
		}, 200);

		getDataTimer = setInterval(function () {
			if (iframeContent !== iframe.contentWindow.document.body.innerHTML) {
				try {
					_success(getData(iframe));
				} catch (e) {
					_error(e);
				}

				oBody.removeChild(oDoc.querySelector('#iframe' + id));
				oBody.removeChild(oDoc.querySelector('#form' + id));

				iframe = form = opt = null;
				clearTimeout(submitTimer);
				clearInterval(getDataTimer);
			}
		}, 100);
	};

	// Initialize the object to get the parameters
	function iframeFileUpload (opt) {
		new IframeFileUpload(opt).init();
	}

	return iframeFileUpload;
});