var G = {
    baseUrl: '',
    baseImgUrl: '',
    debug: 'debug',
    NetworkType:'',
    browser: {},
    platform: {},
    errors: {
        '-1': 'undefined error'
    },
    errorHandlers: {
    },
    loadedScripts: {
    },
    // 存储异步载入Script调用的返回变量
    ajaxLoadReturn: {
    },
    browser: {
    	version: (navigator.userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
    	webkit: /webkit/i.test(navigator.userAgent),
    	opera: /opera/i.test(navigator.userAgent), // untested
    	msie: /msie/i.test(navigator.userAgent) && !/opera/.test(navigator.userAgent), 
    	mozilla: /mozilla/i.test(navigator.userAgent) && !/(compatible|webkit)/.test(navigator.userAgent),
        mobileSafari: /mobile.*safari/i.test(navigator.userAgent),
        is3dSupported: false,
        isAndroid: /android/i.test(navigator.userAgent),
        isBlackberry: /blackberry/i.test(navigator.userAgent),
        isiOS: /like Mac OS/i.test(navigator.userAgent)
   }
};
/*平台日志处理*/
var logger = {};
(function() {
    logger._enable = typeof(console) != 'undefined' && typeof(console.log) != 'undefined';
    if (logger._enable) {
        if (typeof(console.log) == 'function') {
            // here comes normal browsers, firefox and chrome
            logger._log = function() {
                try {
                    console.log.apply(console, arguments);
                }
                catch (e) {
                }
            };
        }
        else if (typeof(console.log) == 'object') {
            //  console.log in IE8 isn't a true Javascript function. It doesn't support the apply or call methods.
            logger._log = function() {
                try {
                    console.log(Array.prototype.slice.call(arguments));
                }
                catch (e) {
                }
            };
        }
        else {
            // a blank function
            logger._log = function() {}();
        }
    }
    else {
        logger._log = function() {};
    }
    var debugLevels = {
        'none': 0,
        'debug': 1,
        'info': 2,
        'warn': 3,
        'error': 4
    }
    var level = debugLevels[G.debug];
    if (typeof(level) == 'undefined') {
        level = 0;
    }
    for (var func in debugLevels) {
        if (level > 0) {
            if (debugLevels[func] > 0) {
                if (debugLevels[func] >= level) {
                    logger[func] = function() {
                        logger._log.apply(logger, arguments);
                    };
                }
                else {
                    logger[func] = function() {};
                }
            }
        }
        else {
            logger[func] = function() {};
        }
    }
})();


/**
 * 部分通用事件处理方法
 */
/**
 * 只允许输入数字，传入的evt对象必须是经过jQuery封装的
 */
function numberKeyOnly(evt,isfloat) {
    var k = evt.which;
    if (evt.shiftKey) {
        // 按下shift的情况下不允许输入
        return false;
    }
   if (typeof (isfloat) == "undefined" || (typeof (isfloat) != "undefined" && !isfloat)){
        if ((k <= 57 && k >= 48) || k == 37 || k == 39 || k == 8 || k == 46 || (k <= 105 && k >= 96)) {
            return true;
        }
   }else{
       if ((k <= 57 && k >= 48) || k == 37 || k == 39 || k == 8 || k == 46 || (k <= 105 && k >= 96) || k==190) {
            return true;
       }
   }
    return false;
};
/**
 * 打印自定义信息
 */
function alert_cust(obj){
     var p,s = []
      for(p in obj){
            s.push(p+":"+obj[p])
      }
      alert(s.join('\n'));
};
/**
 * 执行跳转函数
 */
function executeRedirect(params) {
     params = jQuery.extend({
        'url': ''
    }, params);
    if (typeof(params.url) == 'string' && jQuery.trim(params.url) != '') {
        window.location.href = params.url;
        return true;
    }
    return false;
}
function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
                return unescape(r[2]);
        return null; 
}
function parseParams(str) {
    if( !str ) return {};

    var arr = str.split('&'), obj = {}, item = '';
    for( var i=0,l=arr.length; i<l; i++ ){
        item = arr[i].split('=');
        obj[item[0]] = item[1];
    }
    return obj;
}
function SetCookie(name,value){
    var Days = 360;   
    var exp  = new Date();  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null)
    return unescape(arr[2]);
    return null;
}
function delCookie(name){
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function percent($p,$t){
        var Dight = $p/$t*100;
        Dight = Math.round(Dight*Math.pow(10,1))/Math.pow(10,1);  
        return Dight+'%';
}

String.prototype.padLeft=function(len,ch){
    ch=typeof(ch)==='undefined'?' ':ch;
    var s=String(this);
    while(s.length<len)
        s=ch+s;
    return s;
}

String.prototype.Trim = function() {  
  var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);  
  return (m == null) ? "" : m[1];  
}
String.prototype.isMobile = function() {  
  //return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(this.Trim()));  
  return (/^1[0-9][0-9]{1}[0-9]{8}$|15[0189]{1}[0-9]{8}$|189[0-9]{8}$/.test(this.Trim()));  
} 
String.prototype.isTel = function()
{
    //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
    //return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(this.Trim()));
    return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.Trim()));
}
String.prototype.isBankNo = function()
{
    //旧校验规则：开头6位
    var bankno = this.Trim();
    if (bankno == "") {
        $("#banknoInfo").html("请填写银行卡号");
        return false;
    }
    if (bankno.length < 16 || bankno.length > 19) {
        $("#banknoInfo").html("银行卡号长度必须在16到19之间");
        return false;
    }
    var num = /^\d*$/;  //全数字
    if (!num.exec(bankno)) {
        $("#banknoInfo").html("银行卡号必须全为数字");
        return false;
    }
    //开头6位
    var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
    if (strBin.indexOf(bankno.substring(0, 2))== -1) {
        $("#banknoInfo").html("银行卡号开头6位不符合规范");
        return false;
    }
    
    
    //新校验规则：16位银行卡号（19位通用）:
    // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
    // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
    // 3.将加法和加上校验位能被 10 整除。
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9

    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        

    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;

    if(lastNum==luhm){
        $("#banknoInfo").html("验证通过");
        return true;
    }
    else{
        $("#banknoInfo").html("银行卡号必须符合校验");
        return false;
    }        
}

/*extend functions*/
$.fn.extend({
	textareaAutoHeight: function (options) {
		this._options = {
			minHeight: 0,
			maxHeight: 1000
		} 

		this.init = function () {
			for (var p in options) {
				this._options[p] = options[p];
			}
			if (this._options.minHeight == 0) {
				this._options.minHeight=parseFloat($(this).height());
			}
			for (var p in this._options) {
				if ($(this).attr(p) == null) {
					$(this).attr(p, this._options[p]);
				}
			}
			$(this).keyup(this.resetHeight).change(this.resetHeight)
			.focus(this.resetHeight);
		}
		this.resetHeight = function () {
			var _minHeight = parseFloat($(this).attr("minHeight"));
			var _maxHeight = parseFloat($(this).attr("maxHeight")); 

			if (!$.browser.msie) {
				$(this).height(0);
			}
			var h = parseFloat(this.scrollHeight);
			h = h < _minHeight ? _minHeight :
						h > _maxHeight ? _maxHeight : h;
			$(this).height(h).scrollTop(h);
			if (h >= _maxHeight) {
				$(this).css("overflow-y", "scroll");
			}
			else {
				$(this).css("overflow-y", "hidden");
			}
		}
		this.init();
	}
}); 



/*
解除微信底部栏绑定
 */
/*
$(document).on("WeixinJSBridgeReady",  function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
    WeixinJSBridge.call('hideOptionMenu');
});
*/

    
$(function(){
    
    //全局textarea高度自适应
    //$("textarea").textareaAutoHeight({ maxHeight:200 });
});

