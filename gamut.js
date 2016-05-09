'use strict';

// Utility functions
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

// Exported object
var gamut = module.exports = {
	hexToDenary: {
		// Dictionary for hexadecimal to denary conversion
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
	},

	denaryToHex: {
		// Dictionary for denary to hexadecimal conversion
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
		10: 'A',
		11: 'B',
		12: 'C',
		13: 'D',
		14: 'E',
		15: 'F'
	},

	isValidHexadecimalCharacter: function (char) {
		// Character needs to be 0-9 or A-F/a-f
		var code = char.charCodeAt(0);
		return (48 <= code && code <= 57) || (65 <= code && code <= 70) || (97 <= code && code <= 102);
	},

	areAllCharactersHexadecimal: function (str) {
		str = str.split('');
		for (var i = 0; i < str.length; i++) {
			if (!gamut.isValidHexadecimalCharacter(str[i])) {
				return false;
			}
		}

		return true;
	},

	isValidHexadecimal: function (str) {
		if (typeof str !== 'string') {
			return false;
		}

		// Convert input to standard format of XXXXXX where X is 0-9/A-F/a-f
		str = str.replace('#', '');
		if (str.length === 3) {
			str = str.concat(str);
		}

		if (str.length !== 6 || !gamut.areAllCharactersHexadecimal(str)) {
			return false;
		}
		else {
			return true;
		}
	},

	convertHexToRGB: function (str) {
		if (gamut.isValidHexadecimal(str)) {
			var hex = partitionStrToArray(str, 2);

			var rgb = hex.map(function(charPair, i) {
				charPair = charPair.split('');

				return gamut.hexToDenary[charPair[0]] * 16 + gamut.hexToDenary[charPair[1]];
			});

			return rgb;
		}
		else {
			return false;
		}
	},

	isValidRGB: function(arr) {
		if (arr.length !== 3 || (Number.isInteger(arr[0]) && 0 <= arr[0] && arr[0] <= 255) || (Number.isInteger(arr[1]) && 0 <= arr[1] && arr[1] <= 255) || (Number.isInteger(arr[2]) && 0 <= arr[2] && arr[2] <= 255)) {
			return false;
		}
		else {
			return true;
		}
	},

	convertRGBToHex: function(arr) {
		if (!gamut.isValidRGB(arr)) {
			return false;
		}

		arr = arr.map(function(num) {
			return gamut.denaryToHex[Math.floor(num / 16)].toString() + gamut.denaryToHex[num % 16].toString(); 
		});

		return arr.join('');
	},

	generateRandomRGB: function() {
		var rgb = [];

		for (var i = 0; i < 3; i++) {
			rgb.push(Math.floor( Math.random() * 256 ));
		}

		return rgb;
	},

	generateRandomHexadecimal: function() {
		var hex = [];

		for (var i = 0; i < 6; i++) {
			hex.push(gamut.denaryToHex[Math.floor(Math.random() * 16)].toString());
		}

		return hex.join('');
	},

	generateRandomColourScheme: function(numColours) {
		// Choose 5 colours if number not specified
		numColours = typeof numColours !== 'undefined' ? numColours : 5;
		
		var colourScheme = [];

		// Output hexadecimal format by default
		for (var i = 0; i < numColours; i++) {
			colourScheme.push(gamut.generateRandomHexadecimal());
		}

		return colourScheme;
	}
};
