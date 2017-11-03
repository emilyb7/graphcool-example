# React / Apollo / Graphcool example

### Requirements

- Graphcool CLI tools


### Setup

- `graphcool init`
- in `src/index.js` replace the uri with your project's simple API uri


### Run React app locally

`npm start`


### Deployment

(For changes to schema or functions) `graphcool deploy`


### Local Graphcool server

With docker:

`graphcool local up` starts the server

`graphcool deploy --target dev` to deploy


### What happens...

At `/update` we fetch data from an existing list of locations

Locations are validated and the database is populated

View list at `/`
