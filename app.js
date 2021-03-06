'use strict';

function isArray(input) {
	return input instanceof Array && input instanceof Object;
}

function traverseArray(inputArray, resultArray) {
	// check inputArray is empty, if yes then return resultArray
	if (inputArray.length === 0) {
		return resultArray;
	}

	// before traversing inputArray make sure that inputArray has more than one row and column
	if (inputArray.length > 1 && isArray(inputArray[0]) && inputArray[0].length > 1) {
		// traverse right
		resultArray = resultArray.concat(inputArray.shift());

		// traverse bottom
		inputArray.forEach(function (item) {
			resultArray.push(item.pop());
		});

		// traverse left
		resultArray = resultArray.concat(inputArray.pop().reverse());

		// traverse top
		var temp = [];
		inputArray.forEach(function (item) {
			temp.push(item.shift());
		});
		resultArray = resultArray.concat(temp.reverse());
	} else {
		resultArray = resultArray.concat(inputArray.shift());
	}
	return traverseArray(inputArray, resultArray);
}
window.onload = function () {
	document.getElementById('print_output').addEventListener('click', function (e) {
		e.preventDefault();
		var inputElem = document.getElementById('input'),
			inputValue = inputElem.value ? inputElem.value.trim() : inputElem.value,
			outputElem = document.getElementById('output'),
			errorMessageElem = document.getElementById('error_message');
		// clean error message
		errorMessageElem.innerHTML = '';
		if (inputValue) {
			var input = null;
			try {
				input = JSON.parse(inputValue);
			} catch (err) {
				errorMessageElem.innerHTML = 'Invalid input';
				inputElem.focus();
				return false;
			}
			if (isArray(input)) {
				var result = [];
				result = traverseArray(input, result);
				outputElem.value = result.join(', ');
			} else {
				errorMessageElem.innerHTML = 'Please enter valid two dimentional array';
				inputElem.focus();
			}
		} else {
			errorMessageElem.innerHTML = 'Please enter input';
			inputElem.focus();
		}
	});
};