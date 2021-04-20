# IBP Console Versions

This is a simple usage of the IBP Console API to determine the versions of  the Fabric component, (Peers, Orderers, CAs etc.)  that can be used in Ansible scripts.


## Running the tool

The following command line arguments are set up

```
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -y, --yml      output the latest in yaml format
  -n, --nossl    disable the ssl check for self-signed certs
  -c, --cfg      path to yml to use for auth     
```

### Environment variables

You will need to have an IBP Console Service Credential and API Endpoint. You might also need the token endpoint if not using the 'test.cloud.ibm.com' instance.
Create a `.env` file like this; this will be read automatically by the code.

```
IBP_KEY=<apikey>
IBP_ENDPOINT=<api_endpoint>
API_TOKEN_ENDPOINT=https://iam.test.cloud.ibm.com/identity/token
```

Alternatively, they can be specified in a yaml file the name given as a command line argument. (this is so you can share the configuration with Ansible playbooks)


```
./ibp_hlf_version.js
╔═══════════╤═════════╤═════════╗
║ Component │ Version │ Default ║
╟───────────┼─────────┼─────────╢
║ ca        │ 1.4.9-5 │ *       ║
╟───────────┼─────────┼─────────╢
║ peer      │ 1.4.9-5 │ *       ║
╟───────────┼─────────┼─────────╢
║ peer      │ 2.2.1-5 │         ║
╟───────────┼─────────┼─────────╢
║ orderer   │ 1.4.9-5 │ *       ║
╟───────────┼─────────┼─────────╢
║ orderer   │ 2.2.1-5 │         ║
╚═══════════╧═════════╧═════════╝
```

## IBP APIs Used

The step is to authenticate and create a client to connect to the IBP Console.
Depending on how the IBP Console is installed (is it a public IBM cloud SaaS instance, or has it been installed from the docker images) will determine the authentication method.

```
// the API key, and endpoint need to used here. Get these from a IBP Service Credential
// Create an authenticator
let authenticator;
if (authtype === 'ibmcloud') {
    authenticator = new ibp.IamAuthenticator({
        apikey: apikey,
        url: ibpendpoint
    });
} else {
    authenticator = new BasicAuthenticator({
        username: apikey,
        password: apisecret,
    });
}
```

This authenticator is then used to create the client to the IBP Console

```
// Create client from the "BlockchainV3" class
const client = ibp.BlockchainV3.newInstance({
    authenticator,
    url: ibpendpoint,
    disableSslVerification: args.nossl
});
```


To get the versions of components, the API call is simply

```
    response = await client.getFabVersions();
```

Most of the code in the file is related to handling the output and formatting. 
