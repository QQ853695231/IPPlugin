# IPPlugin
JQuery版本的IP地址输入框插件。
这个插件主要是用于生成IP地址对应的4个input标签，并可以利用通过初始化插件返回的对象来获取当前对象所对应的ip值，
并可以动态的改变ip地址！  
   
   
下面我们来看一下该插件各参数的意义：

----------------------------------------------------------------------------------------------------------

 					 parent_css:{},//当前元素的CSS样式                                                        
	         input_css:{"font-size":"20px","ime-mode":"disabled"},//生成的每个input标签的样式
	         ipaddress:""//默认的IP数据  
	         xhforID:[],//生成的每个Input标签的ID属性数字(暂时没有用，id属性会自动生成)  
	         
	         $.fn.getIPValue方法用于获取初始化的IP插件对象的IP值。
 
  
使用该插件时依赖于JQuery插件，所以要在页面当中引入先引入JQuery插件。
以当前下载的压缩包里面的js文件夹下的JQuery2.1.4.js为例。
<script type="text/javascript" src="../js/jquery-2.1.4.js" ></script> 
再引入当前的IP地址插件
<script type="text/javascript" src="../js/IPPlugin.js" ></script>      


页面的body元素内容为：
<body>                             
<div class="first">                	         
	     <!--此处是用于初始化第1个IP插件的位置-->                           	                                                        
</div>                             
<div class="second">               
	     <!--此处是用于初始化第2个IP插件的位置-->                             
</div>      
<!--用于弹出第个不同的IP地址的值-->                       
<button id="test">显示IP值</button>  


在当前页面当中利用IP插件初始化
<script type="text/javascript">

$(function() {                               
	var ip1=$(".first").ipAddress(             
			{                                      </script>
				ipaddress:"11.22.33.44",             
			}                                                      
	);                                         
	var ip2=$(".second").ipAddress(            
			{                                      
				ipaddress:"55.66.77"                 
			}                                      
	);                                         
	$("#test").on("click",function(){          
		alert(ip1.getIPValue()); 
		alert(ip2.getIPValue());
	});                                        
});     




温馨提示：该插件可以初始化多次，不用担心input的ID值会重复。                                       