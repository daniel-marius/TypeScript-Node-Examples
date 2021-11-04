## Example of Node.js App with TypeScript

Node.js, TypeScript

## Usage

- Installation of typescript is required (npm install -g typescript ts-node)
- Install all modules listed in package.json with npm install

## Features

- Loading, parsing and analyzing csv file
- The goal is to understand classes, interfaces, and other concepts in TypeScript

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs concurrently two additional scripts tsc -w and nodemon build/index.js.<br />
tsc -w compiles the input file from root directory specified in tsconfig.json.<br />
nodemon build/index.js will run the .js compiled version from the build directory specified in tsconfig.json.<br />
