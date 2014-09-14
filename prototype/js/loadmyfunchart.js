loadmyfun(G.baseUrl+"js/chart.js",function(){
	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		var tab_chart = document.getElementById('tab_chart');
		var aTr = tab_chart.tBodies[0].getElementsByTagName('tr');
		var arr_tdfirst=[],arr_tdsecond=[];arr_tdthird=[];
		var testNum = /\D+/g;
		for(var i=aTr.length-1;i>=0;i--){
			arr_tdfirst.push(aTr[i].cells[0].innerHTML);
			arr_tdsecond.push(aTr[i].cells[1].innerHTML.replace(testNum,""));
			// console.log(aTr[i].cells[1].innerHTML.replace(testNum,""));

		}		

		var lineChartData = {
			labels : arr_tdfirst,
			datasets : [
				{
					label: "My first dataset",
					fillColor : "rgba(151,187,205,0.2)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(151,187,205,1)",
					data : arr_tdsecond
				}
				
			]

		}


	var ctx = document.getElementById("canvas").getContext("2d");
	window.myLine = new Chart(ctx).Line(lineChartData, {
		responsive: true
	});

});

