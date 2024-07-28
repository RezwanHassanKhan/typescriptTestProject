# Typescript Unit testing fundemnatls impleneted  in real projects

### Install npm

```console
1. 
```

### Initialises empty node project

```console
npm init -y
```

### Adding  Development Dependenciess

```console
npm i -D typescript jest ts-jest @types/jest ts-node
```

### Create a jest.config.ts file based on needs

```console
import type{Config} from '@jest/types'

const config : Config.InitialOptions = 
{
    
}
export default config;
```

### Create a folder(src) with 2 sub folders(app,test) inside it to write source code and its test code->example given.

```console
1. src-->app,test
2. app -->  code.ts 
3. test --> code.test.ts
```
### Make changed in Configure package.json file to excecute the test.

```console
1. "scripts": {
    "test": "jest"
  }
```
### to handle import and export -we need to create a typescript configuration file -> tsconfig.json.

```console
1. {
     "compilerOptions" : {
        "esModuleIntertop" : true 

     }
}
----------
Reach out to Rezwan at md.rezwanhassankhan@gmail.com for any further questions. :)
