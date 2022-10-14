const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");

(async () => {
	
	var fs = require('fs');

	require.extensions['.txt'] = function (module, filename) {
		module.exports = fs.readFileSync(filename, 'utf8');
	};

	var inputData = require("./input.txt");

	//console.log(inputData); // string
	var phonenumber = inputData.split(',');
	var existPhoneNumber = phonenumber;
	var nonExistPhoneNumber = phonenumber;
	
	//console.log(phonenumber.length); // string
	//console.log(phonenumber); // string
	
	//const phonenumber = process.argv[2];
	var i = 0;
	for (i = 0; i < phonenumber.length; i ++){
		log(chalk.blue(`Checking for Existence : ${phonenumber[i]}`));
		const numberExists = await checkNumber(phonenumber[i]);
		if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
		else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
		if (numberExists) nonExistPhoneNumber.splice(i, 1);
		else existPhoneNumber.splice(i, 1);
	}
	fs = require('fs');
	fs.writeFile('existList.txt', existPhoneNumber, function (err) {
	  if (err) return console.log(err);
	  console.log('output.txt exported.');
	});
	fs = require('fs');
	fs.writeFile('nonExistList.txt', nonExistPhoneNumber, function (err) {
	  if (err) return console.log(err);
	  console.log('output.txt exported.');
	});
	
	process.exit(0);
})();
