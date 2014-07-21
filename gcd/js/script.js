$(document).ready(function(){
	$('#number1').val(10000);
	$('#number2').val(23212);
	$('#calculate').click(function(event){
		event.preventDefault();
		var number1 = parseInt($('#number1').val());
		var number2 = parseInt($('#number2').val());
		$("#difference").empty();
		$("#remainder").empty();
		$("#primeDivide").empty();
		$("#primeFactorize").empty();
		difference(number1, number2, "#difference");
		remainder(number1, number2, "#remainder");
		primeDivide(number1, number2, "#primeDivide");
		primeFactorize(number1, number2, "#primeFactorize");
	});
	$('#clear').click(function(event){
		event.preventDefault();
		$('#number1').val("");
		$('#number2').val("");
		$("#difference").empty();
		$("#remainder").empty();
		$("#primeDivide").empty();
		$("#primeFactorize").empty();
	});

});


// Euclidean difference algorithm
function difference(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var count = 0;
	var html = "<h2>Euclidean difference algorithm</h2><br>GCD(" + num1 + "," + num2 + ")<br>";
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
			var html = "<h2>Euclidean difference algorithm</h2><br>GCD(" + number1 + "," + number2 + ")<br>";
			$(id).html(html);
			$(id).append("=?<br>");
			$(id).append("<br><b>More than 10000 steps!</b><br><br>");
			return
		}
	}
	html = "=" + num1 + "<br>";
	html += "<br><b>" + count + " step(s)</b><br><br>";
	$(id).append(html);
}

// Euclidean remainder algorithm
function remainder(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var count = 0;
	var html = "<h2>Euclidean remainder algorithm</h2><br>GCD(" + num1 + "," + num2 + ")<br>";
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
			var html = "<h2>Euclidean difference algorithm</h2><br>GCD(" + number1 + "," + number2 + ")<br>";
			$(id).html(html);
			$(id).append("=?<br>");
			$(id).append("<br><b>More than 10000 steps!</b><br><br>");
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
	html = "<br><b>" + count + " step(s)</b><br><br>";
	$(id).append(html);
}

function primality(number)
{
	if (number == 2 || number == 3)
	{
		return true;
	}
	else
	{
		var i = 2;
		while (i * i <= number)
		{
			if (number % i == 0)
			{
				return false;
			}
			i += 1;
		}
		return true;
	}
}

function primeDivide(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var count = [];
	var common = [];
	var html = "<h2>Division by primes method</h2><br>";
	$(id).html(html);
	// find smallest common prime factor until no smallest common prime can be found
	while (true)
	{
		var result = smallestCommonPrime(num1, num2);
		// if no smallest common prime factor can be found
		if (result.smallest == 0)
		{
			// if no smallest common prime factor at all (this is during first loop)
			if (count == 0)
			{
				count[count.length] = result.count;
				html = "&nbsp;	&nbsp;	" + num1 + "&nbsp;	&nbsp;	&nbsp; &nbsp;" + num2 + "<br></br>";
				$(id).append(html);
				break;
			}
			// if no smallest common prime factor can be found already after many loops
			else
			{
				count[count.length] = result.count;
				html = "&nbsp;	&nbsp;	" + num1 + "&nbsp;	&nbsp;	&nbsp; &nbsp;" + num2 + "<br></br>";
				$(id).append(html);
				break;
			}
		}
		// smallest common prime factor found
		else
		{
			html = result.smallest + " |<u>" + num1 + "</u>___<u>" + num2 + "</u><br>";
			$(id).append(html);
			num1 /= result.smallest;
			num2 /= result.smallest;
			common[common.length] = result.smallest;
			count[count.length] = result.count;
		}
	}

	html = "Answer<br>=";
	// print answer for numbers that have no smallest common prime factor
	if (common.length == 0)
	{
		html += "1";
		$(id).append(html);
		$(id).append("<br><br>");
	}
	// print answer for numbers that have one or more smallest common prime factor
	else
	{
		for (i=0; i<common.length; i++)
		{
			if (i == 0)
			{
				html += common[i];
			}
			else
			{
				html += " x " + common[i];
			}
		}
		var total = 1;
		$.each(common, function() {
		    total *= this;
		});
		html += "<br>=" + total;
		$(id).append(html);
		$(id).append("<br><br>");
	}
	// print number of steps taken to perform the method
	// if there is no division
	if (count.length == 1)
	{
		html = "There is no smallest common prime factor, we took " + count[0] + " step(s) to verify that.<br><br>";
		html += "Total step(s) taken<br>= <b>" + count[0] + " step(s)</b><br><br>";
		$(id).append(html); 
	}
	// if there is more than one division
	else
	{
		html = "";
		for(i=0; i<count.length-1; i++)
		{
			html += "Division number " + (i+1) + " took " + count[i] + " step(s).<br>";
		}
		html += "There is no smallest common prime factor in the last step, we took " + count[i] + " step(s) to verify that.<br><br>";
		total = 0;
		$.each(count, function() {
		    total += this;
		});
		html += "Total step(s) taken<br>= <b>" + total + " step(s)</b><br><br>";
		$(id).append(html);
	}

}

/* Return the smallest common prime between two numbers and the count of steps taken to find it */
function smallestCommonPrime(num1, num2)
{
	var count = 0;
	// print the number of 2s that divide n
	if (num1%2 == 0 && num2%2 == 0)
	{
		num1 /= 2;
		num2 /= 2;
		count += 1;
		return {
			smallest: 2,
			count: count
		}
	}
	// number must be odd at this point.  So we can skip one element (Note i += 2)
    for (var i = 3; i <= Math.sqrt(Math.min(num1, num2)); i += 2)
    {
        // If i divides numbers, add i to array and divide number
        if (num1%i == 0 && num2%i == 0)
        {
            num1 /= i;
            num2 /= i;
            count += 1;
            return {
				smallest: i,
				count: count
			}
        }
        count += 1;
    }
    return {
		smallest: 0,
		count: count
	}
}

/* Return array of prime factors and steps taken of a given number */
function primeFactor(number)
{
	var factors = [];
	var count = 0;
	// print the number of 2s that divide n
	while (number%2 == 0)
	{
		factors[factors.length] = 2;
		number /= 2;
		count += 1;
	}
	// number must be odd at this point.  So we can skip one element (Note i += 2)
    for (var i = 3; i <= Math.sqrt(number); i += 2)
    {
        // While i divides number, add i to array and divide number
        while (number%i == 0)
        {
            factors[factors.length] = i;
            number /= i;
            count += 1;
        }
        count += 1;
    }
 
    // This condition is to handle the case when number is a prime number greater than 2
    if (number > 2)
    {
    	factors[factors.length] = number;
    	count += 1;
    }
    return {
        factors: factors,
        count: count
    }
}

function primeFactorize(number1, number2, id)
{
	var num1 = number1;
	var num2 = number2;
	var factor1 = [];
	var factor2 = [];
	var count1 = 0;
	var count2 = 0;
	var html = "<h2>Prime Factorization Method</h2><br>";
	// find prime factors of num1
	var result = primeFactor(num1);
	factor1 = result.factors;
	count1 = result.count;
	// print prime factors of num1
	for (var i=0; i<factor1.length; i++)
	{
		if (i==0)
		{
			html += number1 + " = " + factor1[i];
		}
		else
		{
			html += " x " + factor1[i];
		}
	}
	html += "<br>";
	// find prime factors of num2
	var result = primeFactor(num2);
	factor2 = result.factors;
	count2 = result.count;
	// print prime factors of num2
	for (var i=0; i<factor2.length; i++)
	{
		if (i==0)
		{
			html += number2 + " = " + factor2[i];
		}
		else
		{
			html += " x " + factor2[i];
		}
	}
	// find common factors
	var finder;
	var suspect;
	var common = [];
	if (factor1.length < factor2.length)
	{
		finder = factor1;
		suspect = factor2;
	}
	else if (factor1.length > factor2.length)
	{
		finder = factor2;
		suspect = factor1;
	}
	else
	{
		finder = factor2;
		suspect = factor1;
	}
	// loop through each element of finder
	for (i=0; i < finder.length; i++)
	{
		// loop through each element of suspect to find match
		for (var j=0; j < suspect.length; j++)
		{
			if (finder[i] == suspect[j])
			{
				common[common.length] = suspect[j];
				suspect[j] = 0;
				break;
			}
		}
	}
	// print out answer with steps
	html += "<br><br>Answer<br>=";
	for (i=0; i < common.length; i++)
	{
		if (i == 0)
		{
			html += common[i];
		}
		html += " x " + common[i];
	}
	// if no common prime
	if (common.length == 0)
	{
		html += "1";
	}
	else
	{
		var total = 1;
		$.each(common, function() {
		    total *= this;
		});
		html += "<br>=" + total;
	}
	$(id).append(html + "<br><br>");
	html = "Prime factorization of " + number1 +" requires " + count1 + " step(s).<br>";
	html += "Prime factorization of " + number2 +" requires " + count2 + " step(s).<br>";
	html += "Assuming finding common prime factors from the two sets of prime factors of respective number requires 1 step.<br><br>";
	html += "Total step(s) taken<br>= " + count1 + " + " + count2 + " + 1";
	html += "<br>= <b>" + (count1 + count2 + 1) + " step(s)</b><br><br>";
	$(id).append(html);
}

