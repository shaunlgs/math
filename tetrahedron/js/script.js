$(document).ready(function(){
	
	window.a = "";
	window.b = "";
	window.c = "";
	window.d = "";
	window.e = "";
	window.f = "";
	window.x = "";
	window.y = "";
	window.p = "";
	window.q = "";
	window.r = "";
	window.volume = "";
	window.area = "";
	window.coordinate1 = [0, 0, 0]; 
	window.coordinate2 = [0, 0, 0]; 
	window.coordinate3 = [0, 0, 0]; 
	window.coordinate4 = [0, 0, 0]; 

	// when submit button is clicked
	$('#submit').click(function(event){
		event.preventDefault();
		// pass validation
		if (validate()){
			// calculate, then display
			calculate($("#a").val(), $("#b").val(), $("#c").val(), $("#d").val(), $("#e").val(), $("#f").val(), function display(){
				$("#middle").html("");
				$("#message").hide();
				// prints length of sides of tetrahedron
				var html = "Length of sides given:<br>";
				html +=	"AB: " + window.a + "<br>";
				html +=	"BC: " + window.b + "<br>";
				html +=	"AC: " + window.c + "<br>";
				html +=	"CD: " + window.d + "<br>";
				html += "AD: " + window.e + "<br>";
				html += "BD: " + window.f + "<br><br>";
				// prints coordinate of vertices
				html += "Coordinates of vertices of tetrahedron:<br>";
				html += "(" + Math.round10(window.coordinate1[0], -4) + ", " + Math.round10(window.coordinate1[1], -4) + ", " + Math.round10(window.coordinate1[2], -4) + ")<br>";
				html += "(" + Math.round10(window.coordinate2[0], -4) + ", " + Math.round10(window.coordinate2[1], -4) + ", " + Math.round10(window.coordinate2[2], -4) + ")<br>";
				html += "(" + Math.round10(window.coordinate3[0], -4) + ", " + Math.round10(window.coordinate3[1], -4) + ", " + Math.round10(window.coordinate3[2], -4) + ")<br>";
				html += "(" + Math.round10(window.coordinate4[0], -4) + ", " + Math.round10(window.coordinate4[1], -4) + ", " + Math.round10(window.coordinate4[2], -4) + ")<br><br>";
				// prints volume of tetrahedron
				html += "Volume of tetrahedron:<br>";
				html += window.volume + "<br><br>"; 
				// prints surface area of tetrahedron
				html += "Surface area of tetrahedron:<br>";
				html += window.area + "<br><br>";
				// link to refresh
				html += "<a href='javascript:history.go(0)'>Click to do another calculation.</a><br>";
				$("#middle").html(html);
			});
		}
	});
	// when enter button is pressed
	$(document).keypress(function(event){
		if (event.which == 13)
		{
			$('#submit').click();
		}
	});
});

/*
 * Make sure every field is empty and all inputs are more than zero. Return true if pass validation, false otherwise.
 */
function validate(){
	// check if fields are filled
	if ($("#a").val() != "" && $("#b").val() != "" && $("#c").val() != "" && $("#d").val() != "" && $("#e").val() != "" && $("#f").val() != ""){
		// check if inputs are numbers
		if ($.isNumeric($("#a").val()) && $.isNumeric($("#b").val()) && $.isNumeric($("#c").val()) && $.isNumeric($("#d").val()) && $.isNumeric($("#e").val()) && $.isNumeric($("#f").val()))
		{
			// check if inputs are more than zero
			if ($("#a").val() > 0 && $("#b").val() > 0 && $("#c").val() > 0 && $("#d").val() > 0 && $("#e").val() > 0 && $("#f").val() > 0)
			{
				return true;
			}
			else
			{
				$("#message").hide();	
				$("#message").html("Length cannot be negative or zero!");
				$("#message").show();
			}
		}
		else
		{
			$("#message").hide();	
			$("#message").html("Input numbers only.");
			$("#message").show();
		}
	}
	else
	{
		$("#message").hide();	
		$("#message").html("Fields are not filled.");
		$("#message").show();
	}

}


/*
* Return volume of tetrahedron given coordinates of its vertices.
*/
function volumeCal(coordinate1, coordinate2, coordinate3, coordinate4)
{
	var a11 = coordinate1[0] - coordinate4[0];		
	var a12 = coordinate2[0] - coordinate4[0];
	var a13 = coordinate3[0] - coordinate4[0];
	var a21 = coordinate1[1] - coordinate4[1];
	var a22 = coordinate2[1] - coordinate4[1];
	var a23 = coordinate3[1] - coordinate4[1];
	var a31 = coordinate1[2] - coordinate4[2];
	var a32 = coordinate2[2] - coordinate4[2];
	var a33 = coordinate3[2] - coordinate4[2];
	var determinant = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31);
	var volume = determinant / 6.0;

	return volume;
}

/*
* Return surface area of tetrahedron given length of its sides.
*/
function areaCal(a, b, c, d, e, f)
{
	return heron(a, b, c) + heron(a, e, f) + heron(b, d, f) + heron(c, d, e);
}

/*
* Heron's formula
*/
function heron(x, y, z)
{
	return 0.25 * Math.sqrt(2 * (x * x * y * y + x * x * z * z + y * y * z * z) - x * x * x * x - y * y * y * y - z * z * z * z);
}


function calculate(a_raw, b_raw, c_raw, d_raw, e_raw, f_raw, callback){
		// calculation requires them to be float, if we use integer, integer division will truncate the decimal values.
		window.a = parseFloat(a_raw);
		window.b = parseFloat(b_raw);
		window.c = parseFloat(c_raw);
		window.d = parseFloat(d_raw);
		window.e = parseFloat(e_raw);
		window.f = parseFloat(f_raw);

		// get four coordinates of vertices of tetrahedron
		window.y = (window.a * window.a + window.c * window.c - window.b * window.b) / (2 * window.c);
		// cannot square root a negative number
		if ((window.a * window.a - window.y * window.y) < 0)
		{
			$("#message").hide();	
			$("#message").html("No such tetrahedron.<br> (Perhaps, you can try regular tetrahedron, they always exist, regular tetrahedron has the same length for all sides.)");
			$("#message").show();
			return false;
		}
		window.x = Math.sqrt(window.a * window.a - window.y * window.y);
		// denominator cannot be zero
		if (x == 0)
		{
			$("#message").hide();	
			$("#message").html("No such tetrahedron.<br> (Perhaps, you can try regular tetrahedron, they always exist, regular tetrahedron has the same length for all sides.)");
			$("#message").show();
			return false;
		}
		window.q = (window.c * window.c + window.e * window.e - window.d * window.d) / (2 * window.c);
		window.p = (window.a * window.a + window.e * window.e - window.f * window.f - 2 * window.q * window.y) / (2 * window.x);
		// cannot square root a negative number
		if ((window.e * window.e - window.q * window.q - window.p * window.p) < 0)
		{
			$("#message").hide();	
			$("#message").html("No such tetrahedron.<br> (Perhaps, you can try regular tetrahedron, they always exist, regular tetrahedron has the same length for all sides.)");
			$("#message").show();
			return false;
		}
		window.r = Math.sqrt(window.e * window.e - window.q * window.q - window.p * window.p);
		window.coordinate1 = [0, 0, 0];
		window.coordinate2 = [0, window.c, 0];
		window.coordinate3 = [window.x, window.y, 0];
		window.coordinate4 = [window.p, window.q, window.r];

		// get volume of tetrahedron
		window.volume = volumeCal(coordinate1, coordinate2, coordinate3, coordinate4);

		// get surface area of tetrahedron
		window.area = areaCal(window.a, window.b, window.c, window.d, window.e, window.f);		
		callback();
}


// advance rounding, ceiling, floor function
// Closure
(function(){

	/**
	 * Decimal adjustment of a number.
	 *
	 * @param	{String}	type	The type of adjustment.
	 * @param	{Number}	value	The number.
	 * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
	 * @returns	{Number}			The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}

})();