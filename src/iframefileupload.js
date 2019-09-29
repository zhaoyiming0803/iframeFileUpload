/*
 * iframefileupload.js通过原生JS实现，用最少的代码库依赖实现页面无刷新上传文件的同时也可以向后端传递json数据等。
 * @author: zhaoyiming
 * @since:  2017/08/15
 * License: Apache2.0 , https://github.com/zymfe/iframeFileUpload
*/

; (function (window, document, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(document) :
    typeof define === 'function' && define.amd ? define([], function () { return factory(document); }) :
      (window.iframeFileUpload = factory(document));
})(this, document, function (document) {
  'use strict';

  function strToDom(str) {
    var oDiv = document.createElement("div");
    oDiv.innerHTML = str;
    return oDiv.childNodes[0];
  }

  function createUploadIframe(document, oBody, id) {
    var iframeId = 'iframe' + id,
      iframeHtml = '<iframe name="' + iframeId + '" id="' + iframeId + '" src="about:blank" frameborder="0" style="display:none;"></iframe>';
    oBody.appendChild(strToDom(iframeHtml));
    return document.querySelector('#' + iframeId);
  }

  function createUploadForm(document, oBody, url, data, id) {
    var formId = 'form' + id,
      tmpInpt = null,
      formHtml = '<form action="' + url + '" target="iframe' + id + '" name="fileinfo" method="POST" enctype="multipart/form-data" id="' + formId + '" style="display: none;">';

    for (var prop in data) {
      formHtml += '<input type="text" name="' + prop + '" value="' + data[prop] + '" />';
    }
    formHtml += '</form>';

    oBody.appendChild(strToDom(formHtml));
    return document.querySelector('#' + formId);
  }

  // 从后端获取到的数据
  function getData(iframe) {
    return iframe.contentWindow.document.body.innerText || iframe.contentDocument.body.innerText;
  }

  function IframeFileUpload(opt) {
    this.opt = opt;
  }

  IframeFileUpload.prototype.init = function () {
    var opt = this.opt,
      // 后端url
      _url = opt.url,
      // 上传表单的id数组集合，例：['file1', 'file2']
      _elementId = typeof opt.elementId === 'string'
        ? [opt.elementId]
        : opt.elementId
          ? opt.elementId
          : false,
      _elementIdLen = _elementId
        ? _elementId.length
        : 0,
      _data = opt.data,
      _success = opt.success,
      _error = opt.error,
      oBody = document.body,
      id = new Date().getTime(),
      iframe = createUploadIframe(document, oBody, id),
      form = createUploadForm(document, oBody, _url, _data, id),
      frag = null,
      tmpNode = null,
      oldNode = null;

    if (_elementIdLen) {
      frag = document.createDocumentFragment();
      for (var i = 0; i < _elementIdLen; i += 1) {
        oldNode = document.querySelector('#' + _elementId[i]);
        tmpNode = oldNode.cloneNode(true);

        // clone方法不能拷贝事件，所以需要给新node重新绑定change事件，方便下次执行
        tmpNode.addEventListener('change', iframeFileUpload.bind(this, this.opt));

        oldNode.parentNode.insertBefore(tmpNode, oldNode);
        frag.appendChild(oldNode);
      }
      form.appendChild(frag);
      form.submit();
      frag = null;
    }

    iframe.onload = function () {
      try {
        _success(JSON.parse(getData(iframe).replace(/<[^>]+>/g, "")));
      } catch (e) {
        _error(e);
      }

      oBody.removeChild(document.querySelector('#iframe' + id));
      oBody.removeChild(document.querySelector('#form' + id));

      iframe = form = opt = null;
    };
  };

  function iframeFileUpload(opt) {
    new IframeFileUpload(opt).init();
  }

  return iframeFileUpload;
});
