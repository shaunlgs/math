$(document).ready(function(){
    $("#number1").val("ABCDE");
    $("#clear").click(function(event){
        event.preventDefault();
        $("#display").empty();
    });
	$("#calculate").click(function(event){
		event.preventDefault();
        // empty div
        $("#display").empty();
        // convert string to array
        array = [];
        string = $("#number1").val();
        for (var i=0; i < string.length; i++)
        {
            array[i] = string[i];
        }
        // start
        // construct table
        var table = document.createElement('table');
        table.className = 'table table-condensed';
        document.getElementById("display").appendChild(table);

        var thead = document.createElement('thead');
        table.appendChild(thead);
        var tr = document.createElement('tr');
        thead.appendChild(tr);
        var td1 = document.createElement('td');
        var text1 = document.createTextNode('Index');
        td1.appendChild(text1);
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        var text2 = document.createTextNode('Lehmer code');
        td2.appendChild(text2);
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        var text3 = document.createTextNode('Permutation');
        td3.appendChild(text3);
        tr.appendChild(td3);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        var trIndex = 0;
        var tdIndex = 0;
        var tr = [];
        var td = [];
        var text = [];

        var number = 0;
        while (number != factorial(array.length))
        {
            if (number == 5000)
            {
                break;
                $("#display").append("<p>...more</p>");
            }
            tr[trIndex] = document.createElement('tr');
            td[tdIndex] = document.createElement('td');
            text[trIndex] = document.createTextNode(number);
            td[tdIndex].appendChild(text[trIndex]);
            tr[trIndex].appendChild(td[tdIndex]);
            tdIndex += 1;
            var code = integerToCode(number, array.length);
            td[tdIndex] = document.createElement('td');
            text[trIndex] = document.createTextNode(code.join(""));
            td[tdIndex].appendChild(text[trIndex]);
            tr[trIndex].appendChild(td[tdIndex]);
            tdIndex += 1;
            var permutation = createPermutation(array, number, code);
            td[tdIndex] = document.createElement('td');
            text[trIndex] = document.createTextNode(permutation.join(""));
            td[tdIndex].appendChild(text[trIndex]);
            tr[trIndex].appendChild(td[tdIndex]);
            tdIndex += 1;
            tbody.appendChild(tr[trIndex]);
            trIndex += 1;
            console.log();
            number += 1;
        }
        $("#stats").html("<p>Number of permutation(s) = " + factorial(array.length) + "</p>");
	});
});



function createPermutation(arr, index) {
    var code = integerToCode(index, arr.length);
    return codeToPermutation(arr, code).join("")
}

function createPermutation(arr, index, code) {
    return codeToPermutation(arr, code);
}

function integerToCode(int, permSize) {
    if (permSize <= 1) {
        return [0];
    }
    var multiplier = factorial(permSize-1);
    var digit = Math.floor(int / multiplier);
    var answer = [digit].concat(
        integerToCode(
            int % multiplier,
            permSize-1));
    return answer
}

function codeToPermutation(elements, code) {
    return code.map(function (index) {
        var elem = elements[index];
        elements = removeElement(elements, index);
        return elem;
    });
}

/**
 * @returns the factorial of n
 */
function factorial(n) {
        if (n <= 0) {
            return 1;
        } else {
            return n * factorial(n-1);
        }
    }

/**
 * @returns a fresh copy of arr, with the element at index removed
 */
function removeElement(arr, index) {
    return arr.slice(0, index).concat(arr.slice(index+1));
}

/**
 * @returns a number 0 <= n < upper
 */
function getRandomInteger(upper) {
    return Math.floor(Math.random() * upper);
}