// Apache-2

// Import and IBP Node SDK, and also two cli helpers
const ibp = require('ibp-node-sdk');
const chalk = require('chalk');
const env = require('env-var');
const prettyjson = require("prettyjson-256");

// Credentials that are required
prettyjson.init({alphabetizeKeys:true});

const apikey = env.get("IBP_KEY").required().asString();
const ibpendpoint = env.get("IBP_ENDPOINT").required().asString();

// the API key, and endpoint need to used here. Get these from a IBP Service Credential
// Create an authenticator
const authenticator = new ibp.IamAuthenticator({
	apikey: apikey,
});

// Create client from the "BlockchainV3" class
const client = ibp.BlockchainV3.newInstance({
	authenticator,
	url: ibpendpoint,
});

// main method
const main = async () => {

	console.log(chalk.blue("Deleting all the components"));
	let response = await client.deleteAllComponents();
	if (response.status === 200) {
		if (response.result){
			console.log(prettyjson.render(response.result));
		} else {
			console.log(prettyjson.render(response));
		}		
	} else {
		console.log(response);
	}

}

main().then().catch((e) => { console.error(e) })
