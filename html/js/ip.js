$(function() {
	var ip1=$(".first").ipAddress(
			{
				ipaddress:"11.22.33.44",
			}
	);
	var ip2=$(".second").ipAddress(
			{
				ipaddress:"55.66.77"
			}
	);
	$("#test").on("click",function(){
		$(".span_first").text(ip1.getIPValue());
		$(".span_second").text(ip2.getIPValue());
	});
});