function linearRegression()
{
	// get data
	coordinates = $("#coordinates").val();

	// if no data
	if(coordinates == "")
	{
		alert("Enter some data.");
		return;
	}

	// clean data
	coordinates = $.trim(coordinates)
	coordinates = coordinates.split(/\s+/);

	numData = coordinates.length / 2;

	// calculate averageX, averageY, averageXY, averageXsq, averageYsq, standardDevX, standardDevY, rXY
	averageX = 0
	averageY = 0
	averageXY = 0
	averageXsq = 0
	averageYsq = 0
	standardDevX = 0
	standardDevY = 0
	rXY = 0

	for(i=0; i<numData; i++)
	{
		averageX += parseFloat(coordinates[i * 2]);
		averageY += parseFloat(coordinates[i * 2 + 1]);
		averageXY += parseFloat(coordinates[i * 2]) * parseFloat(coordinates[i * 2 + 1]);
		averageXsq += Math.pow(parseFloat(coordinates[i * 2]), 2)
		averageYsq += Math.pow(parseFloat(coordinates[i * 2 + 1]), 2)
	}

	averageX /= numData;
	averageY /= numData;
	averageXY /= numData;
	averageXsq /= numData;
	averageYsq /= numData;
	rXY = (averageXY-averageX*averageY) / Math.pow((averageXsq-Math.pow(averageX,2)) * (averageYsq-Math.pow(averageY,2)),0.5);

	for(i=0; i<numData; i++)
	{
		standardDevX += Math.pow(parseFloat(coordinates[i * 2])-averageX,2);
		standardDevY += Math.pow(parseFloat(coordinates[i * 2 + 1])-averageY,2);
	}

	standardDevX /= numData;
	standardDevX = Math.pow(standardDevX,0.5);
	standardDevY /= numData;
	standardDevY = Math.pow(standardDevY,0.5);

	// calculate K (gradient) and B (intercept)
	K = standardDevY*rXY/standardDevX;
	B = -1*(standardDevY*rXY*averageX/standardDevX)+averageY;

	//console.log(averageX, averageY, averageXY, averageXsq, averageYsq, standardDevX, standardDevY, rXY)
	if(isNaN(K) || isNaN(B))
	{
		alert("problem");
	}

	$("#answer").val("y = " + K + "x + " + B)
}

function sampleCoordinates()
{
	// Data taken from http://www.codeabbey.com/index/task_view/simple-linear-regression
	$("#coordinates").val("89 257\n75 226\n83 235\n52 173\n148 332\n109 268\n129 306\n115 289\n102 265\n99 269\n50 228\n102 265\n91 256");
}