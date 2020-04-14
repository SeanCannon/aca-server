AnimalCrossingArt.com server
========

# Dependencies

This service has the following external dependencies

* [SSL](#ssl)
* [Environment Variables](#markdown-header-environment-variables)
* [NodeJS](#markdown-header-nodejs)
* [Redis](#markdown-header-redis)
* [Nginx](#markdown-header-nginx)
* [ImageMagick](#markdown-header-imagemagick)


### Environment Variables
The required environment variables will be enforced by the node package [dotenv-safe](https://www.npmjs.com/package/dotenv-safe). As you add required 
env vars, make sure the variable names are also added to this file. 

See `./run/env/demo/.env` for a list of loaded variables.
See `./.env.example' for a list of required variables

### NodeJS
API depends on node 10.15.x as of 4/12/2020

##### Updating Node
If you update with NVM, re-link the binary, same commands as above ^

### Install the Node dependencies
```bash
brew update
brew install yarn
```

```bash
yarn install
```

### Run the tests

```bash
yarn test
```

### Start the app
```bash
yarn demo
```

### DNS

Do this, for `.test` domain. Do NOT use `.dev`
 - https://gist.github.com/ogrrd/5831371
 
If the client is set to `www.animalcrossingart.test` then set the API to `http://api.animalcrossingart.test`

# Deployment
Please see the `.circleci/config.yml` file for CircleCI build config.

## Demo
```bash
pm2 start ./run/env/demo/startRemoteDocker.sh -n docker-suite
pm2 start ./run/env/demo/run.sh --name api
```

## Production
Run the following commands on a production instance (from project root), assuming a `.env` file exists in the project 
root which adheres to the `.env.example` recommendations. 

```bash
pm2 start ./run/env/production/run.sh --name api
```
