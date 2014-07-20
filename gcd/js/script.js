$(document).ready(function(){

	$("#submit").click(function(event){
		event.preventDefault();
		var num1 = $('input[name="number1"]').val();
		var num2 = $('input[name="number2"]').val();
		if ($("#difference").is(':empty'))
		{
			difference(num1, num2, "#difference");
			remainder(num1, num2, "#remainder");
		}
		else
		{
			$("#difference").empty();
			$("#remainder").empty();
			difference(num1, num2, "#difference");
			remainder(num1, num2, "#remainder");
		}
		

	});

});


// Euclidean difference algorithm
function difference(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var count = 0;
	var html = "<u>Euclidean difference algorithm</u><br><br>GCD(" + num1 + "," + num2 + ")<br>";
	$(id).append(html);
	while (num1 != num2)
	{
		if (num1 > num2)
		{
			num1 = num1 - num2;
		}
		else
		{
			num2 = num2 - num1;
		}
		html = "=GCD(" + num1 + "," + num2 + ")<br>";
		$(id).append(html);
		count += 1;
		if (count > 10000)
		{
			var html = "<u>Euclidean difference algorithm</u><br><br>GCD(" + number1 + "," + number2 + ")<br>";
			$(id).html(html);
			$(id).append("=?<br>");
			$(id).append("<br><b>More than 10000 steps!</b>");
			return
		}
	}
	if (num1 == 0)
	{
		console.log();
		html = "=" + num2 + "<br>";
		$(id).append(html);
	}
	else
	{
		html = "=" + num1 + "<br>";
		$(id).append(html);
	}
	if (count == 1)
	{
		html = "<br><b>" + count + " step</b><br>";
	}
	else
	{
		html = "<br><b>" + count + " steps</b><br>";
	}
	$(id).append(html);
}

// Euclidean remainder algorithm
function remainder(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var count = 0;
	var html = "<u>Euclidean remainder algorithm</u><br><br>GCD(" + num1 + "," + num2 + ")<br>";
	$(id).append(html);
	while (num1 != 0 && num2 != 0)
	{
		if (num1 > num2)
		{
			num1 = num1 % num2;
		}
		else
		{
			num2 = num2 % num1;
		}
		html = "=GCD(" + num1 + "," + num2 + ")<br>";
		$(id).append(html);
		count += 1;
		if (count > 10000)
		{
			var html = "<u>Euclidean difference algorithm</u><br><br>GCD(" + number1 + "," + number2 + ")<br>";
			$(id).html(html);
			$(id).append("=?<br>");
			$(id).append("<br><b>More than 10000 steps!</b>");
			return
		}
	}
	if (num1 == 0)
	{
		html = "=" + num2 + "<br>";
		$(id).append(html);
	}
	else
	{
		html = "=" + num1 + "<br>";
		$(id).append(html);
	}
	if (count == 1)
	{
		html = "<br><b>" + count + " step</b><br>";
	}
	else
	{
		html = "<br><b>" + count + " steps</b><br>";
	}
	$(id).append(html);
}