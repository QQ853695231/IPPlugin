;(function($){
//插件的默认参数
$.fn.selfsettings={
		  	 parent_css:{},//当前元素的CSS样式
	         input_css:{"font-size":"20px","ime-mode":"disabled"},//生成的每个input标签的样式
	         xhforID:[],//生成的每个Input标签的ID属性数字
	         defaultvalue:"",//默认的IP数据 
	         prefix:"ipdz",//所生成标签的英文名称前缀
	         total_input_cnt:4,//所有的input标签总数
	         usedfor:"ip",//使用该插件的用途，用于区别IP和MAC的用途。
	         splitletter:"."//调用getValue方法返回值的分隔符 。
};
//插件初始化的默认方法 
$.fn.ipAddress=function(option)
{
	bind_UUID_Math();//为math对象绑定生成UUID的方法。
	this.selfsettings=$.extend({}, $.fn.selfsettings,option);//合并用户配置的各项参数。
	if(this.selfsettings.xhforID.length==0)//如果用户没有配置input标签的ID数组就生成相应的Input标签
		{
			this.selfsettings.xhforID=new Array();//定义存放UUID生成的ID的数组
			for(var index=0;index<this.selfsettings.total_input_cnt;index++)//根据要生成input标签的总个数开始生成。
			{
				this.selfsettings.xhforID.push(this.selfsettings.prefix+Math.uuidFast());//将生成的UUID存放到数组当中。
			}
		}
     genIPinput(this);//根据当前用户配置的参数生成Input标签框。
     return this;//返回当前对象
};
//该方法是用于返回生成UUID值即各项ID值
$.fn.getCurrentIDS=function()
{
	return this.selfsettings.xhforID;//返回ID数组
};
$.fn.setValue=function(value)
{
	//获取当前对象的所有input标签的ID数组(当前的对象一般是不同的一个组内的input标签)
	var xharr=this.selfsettings.xhforID;
	var arr=null;//定义切割用到的数组
	if(this.selfsettings.usedfor=="ip")//判断是否为用来作IP使用
		arr=value.split(".");//对当前的传入的IP地址进行切割
	else
		arr=value.split(":");//被用来作为MAC使用
	//遍历ID数组进行赋值
	$(xharr).each(function(index,iditem){//遍历切割的数组
		$("#"+iditem).val(arr[index]);//放到对应的input标签当中
	});
};
//对象方法，返回当前对象的IP值 或者MAC地址
$.fn.getValue=function(){
	 var self=this;//获取当前调用对象
     var ipresult=""; //定义返回结果的变量
     var usedfor=self.selfsettings.usedfor;//获取当前调用对象的用途
     $(self.selfsettings.xhforID).each(function(index,iditem){
    	if($("#"+iditem).val().length==0)
    		{
    			if(usedfor=="ip")
    				alert("请输入第"+(index+1)+"项的IP地址！");
    			else
    				alert("请输入第"+(index+1)+"项的MAC地址！");
				ipresult=null;
				return false;
    		}
    	else
    			index==self.selfsettings.xhforID.length-1?ipresult+=$("#"+iditem).val():ipresult+=$("#"+iditem).val()+self.selfsettings.splitletter;
    });
    return ipresult;
};
//向目标元素当中追加n个IP对应的input标签。
function genIPinput(targetarea)
{
	 //获取生成input标签的ID属性序号
	 var xharr=targetarea.selfsettings.xhforID;
	 //设置当前对象的样式
	 $(targetarea).css(targetarea.selfsettings.parent_css);
	 //获取给IP标签所设置的样式
	 var ipinput_css=targetarea.selfsettings.input_css;
	 //遍历ID序号数组生成每个input标签
    $(xharr).each(function(index,item)
    		{
	             var $IP=$("<input type='text'>");
	             $IP.get(0).selfsettings=targetarea.selfsettings;
	             $IP.get(0).setValue=targetarea.setValue;
	             $IP.attr(
	            		 {
	            			 "id":item,
	            			 "numid":index,
	            			 "isfirst":index==0?"true":"false",
	            			 "next":targetarea.selfsettings.xhforID[index+1]==undefined?"":targetarea.selfsettings.xhforID[index+1]
	             		 })
	             	.css(ipinput_css)
	                .keyup(function(event){
	                	if(event.target.selfsettings.usedfor=="ip")
	                		usedForIP(event)
	                	else
	                		usedForMAC(event)
	                })
	                .keydown(function(event){
	                	var code = event.keyCode; // 当前输入的键盘值
	                	var self=this;
	                	if (code == 8) 
	            		{ // 删除键
	            			if($(self).val().length==0)
	            				{
	            				if($(self).attr("isfirst")=="false")	
	            					$(self).prev().focus().select();
	            				}
	            			return true;
	            		}
	                	if(event.target.selfsettings.usedfor=="ip")
	                		{
			                	var xhforID=this.selfsettings.xhforID;;
			                	var id = $(self).attr("id"); // 当前输入框的ID
			            		// 除了数字键、删除键、小数点之外全部不允许输入
			            		if (code == 8) 
			            		{ // 删除键
			            			if($(self).val().length==0)
			            				{
			            				if($(self).attr("isfirst")=="false")	
			            					$(self).prev().focus().select();
			            				}
			            			return true;
			            		} else if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) 
			            		{ // 数字键
			            			return true;
			            		} else if (code == 110 || code == 190 || code==9)//9为tab箭 
			            		{// 110、190代表键盘上的两个点
			            			var next=$(this).attr("next");
			            			$("#"+next).focus().select();
			            			return false;
			            		} else if (code == 37 ) { // 37:左箭头
			            			return true;
			            		} else if (code == 39) { // 39:右箭头
			            			return true;
			            		} else {
			            			return false;
			            		}
	                	}
	                else
	                	{
	                		if(code==9)
	                			return false;
	                		return true;
	                	}
	                })
	                .on("paste",function(event){
	                	var target=event.target;
	                	setTimeout(function(){
	                		target.setValue(target.value);
	                	},10);
	                })
	                .on("blur",function(event){
	                	if(this.selfsettings.usedfor=="mac" && this.value.length<2)
	                		{
	                			var id="#"+$(this).attr("id");
	                			$(id).select();
	                		}
	                })
	                .appendTo(targetarea);
    		});
    if(targetarea.selfsettings.ipaddress != "")
    	targetarea.setValue(targetarea.selfsettings.defaultvalue);//获取用户配置的IP地址，并利用.进行切割
 };
 function bind_UUID_Math() {
	 var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	 
	  Math.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	 
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	 
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	  };
	 
	  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	  // by minimizing calls to random()
	  Math.uuidFast = function() {
	    var chars = CHARS, uuid = new Array(36), rnd=0, r;
	    for (var i = 0; i < 36; i++) {
	      if (i==8 || i==13 ||  i==18 || i==23) {
	        uuid[i] = '-';
	      } else if (i==14) {
	        uuid[i] = '4';
	      } else {
	        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
	        r = rnd & 0xf;
	        rnd = rnd >> 4;
	        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	      }
	    }
	    return uuid.join('');
	  };
	 
	  // A more compact, but less performant, RFC4122v4 solution:
	  Math.uuidCompact = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    });
	  };
}
 function usedForIP(eventtarget)
 {
	var target=self=eventtarget.target;
 	var xhforID=self.selfsettings.xhforID;
 	var id = $(self).attr("id");
 	var value = parseInt($(self).val());
 	var code = eventtarget.keyCode; // 当前输入的键盘值
	 if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105))
 	{
 			if (xhforID[0] == id) 
 			{
 				if (value > 233) {
 					alert(value + " 不是有效项，请指定一个1和233之间的值。");
 					$(self).val("");
 				} else {
 					if ($(self).val().length == 3) { // 三位合法数字时，当光标在ipdz1时，跳到ipdz2
 						$("#"+xhforID[1]).focus();
 					}
 				}
 			} 
 			else if (xhforID[1] == id || xhforID[2] == id || xhforID[3] == id) {
 				if (value > 255)
 				{
 					alert(value + " 不是有效项，请指定一个1和255之间的值。");
 					$(self).val("");
 				}
 				else
 				{
 					if ($(self).val().length == 3)
 					{ // 三位合法数字
 						var next=$(self).attr("next");
	            			$("#"+next).focus().select();
 					}
 				}
 			}
 		}
 };
 function usedForMAC(eventtarget)
 {
	  var input_target=eventtarget.target;
	  input_target.value=input_target.value.toUpperCase();
		if(input_target.value.length==2)
			{
				var patternstr=/[0-9a-fA-F]{2}/g;
				if(input_target.value.search(patternstr)!=-1)
				{
					var idvalue=$(input_target).attr("next");
					$("#"+idvalue).focus().select();
				}
				else
				{
					alert("MAC地址输入有误");
					$(input_target).val("");
				}
			}
		else
			{
				if(input_target.value.length>2)
					{
						alert("MAC地址位数超出范围！");
						$(input_target).val("")
					}
			}
 };
})(jQuery);