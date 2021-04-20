# Total IBP Clean

This is a simple usage of the IBP Console API to completely delete everything within the IBP console.

This is a very powerful API - a single API call will be used to delete everything. To be used very carefully in test and dev scenarios.

It is included to to point out the power of this API.

## Environment Variables

You will need to have an IBP Console Service Credential and API Endpoint. You might also need the token endpoint if not using the 'test.cloud.ibm.com' instance.

```
export IBP_KEY=<apikey>
export IBP_ENDPOINT=<api_endpoint>
```


## IBP APIs Used

The step is to authenticate and create a client to connect to the IBP Console.

A simple approach is taken here, see the other examples for other scenarios.

```javascript
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
```

The API call is simply `await client.deleteAllComponents();` 

```javascript
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
```

