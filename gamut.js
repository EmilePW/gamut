'use strict';

var hexLookup = {
	// List of hexagonal to denary conversion
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15
};

function partitionStrToArray(str, num) {
	// Split a string into num-sized paritions
	str = str.split('');
	var partitionedArray = [];	
	
	for (var i = 0; i < str.length; i += num) {
		var partition = [];
		
		for (var j = i; j < i + num; j++) {
			partition.push(str[j]);
		}

		partition = partition.join('');
		partitionedArray.push(partition);
	}

	return partitionedArray;
}

function isValidHexadecimalCharacter(char) {
	// Character needs to be 0-9 or A-F/a-f
	var code = char.charCodeAt(0);
	return (48 <= code && code <= 57) || (65 <= code && code <= 70) || (97 <= code && code <= 102);
}

function areAllCharactersHexadecimal(str) {
	str = str.split('');
	for (var i = 0; i < str.length; i++) {
		if (!isValidHexadecimalCharacter(str[i])) {
			return false;
		} 
	}

	return true;
}

function isValidHexadecimal(str) {
	if (typeof str !== 'string') {
		return false;
	}

	// Convert input to standard format of XXXXXX where X is 0-9/A-F/a-f
	str = str.replace('#', '');
	if (str.length === 3) {
		str = str.concat(str);
	}

	if (str.length !== 6 || !areAllCharactersHexadecimal(str)) {
		return false;
	}
	else {
		return true;
	}
}

function convertHexToRGB(str) {
	if (isValidHexadecimal(str)) {
		var hex = partitionStrToArray(str, 2);

		var rgb = hex.map(function(charPair, i) {
			charPair = charPair.split('');

			return hexLookup[charPair[0]] * 16 + hexLookup[charPair[1]];
		});

		return rgb;
	}
	else {
		return false;
	}
}

