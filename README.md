![logo](https://raw.githubusercontent.com/SwiftySpartan/Angular-1.5-cli/master/canvas1.png)

___________
# ANGULAR-1.5-CLI
###### created by  Andrew Wormald

### Installation:
```bash

npm install angular-1.5-cli -g
```
You need to install this globally (aka using `-g` at the end) in order for this to work efficiently and enhance your experience.
___________
### Build
```javascript

npm run serve
```
This will run webpack and serve up the app on http://localhost:8080/.

___________
### Version 1.6 update:


##### Generate Services on the fly!

Generate a serive on the fly! You can generate 3 types of templates for the service.

1. Generate a plain service template

2. Generate a Get request service template with '--get'

3. Generate a Post request service template with '--post'

<br>

##### Comes with docker support built in and ready to go!

You just need to add you docker url in the 'deploy.js' file!


___________

### Commands:

#### Generate Project:
```javascript
gen new {{PROJECT NAME}}
// Generates a new project using scss styling
```


```javascript
gen new {{PROJECT NAME}} --style:css

 // Generates a new project using css styling
 ```


#### Generate Component:
Make sure that you are at the base of the project directory


```javascript
gen -c {{COMPONENT NAME}}

// Generates a new component using scss styling
```

```javascript
gen -c {{COMPONENT NAME}} --style:css

// Generates a new component using css styling
```

#### Generate Services:
Make sure that you are at the base of the project directory


```javascript
gen -s {{SERVICE NAME}}

gen service {{SERVICE NAME}}

// Generates a service with a plain template inside your service.

// Generates a new service. both execute the same thing
```

```javascript
gen -s {{SERVICE NAME}} --get

// Generates a service with a get request template inside your service

// gen -s is used above just as an example
// You can replace 'gen -s' with 'gen service'
```

```javascript
gen -s {{SERVICE NAME}} --post

// Generates a service with a post request template inside your service

// gen -s is used above just as an example
// You can replace 'gen -s' with 'gen service'
```


___________
#### Clone Component:
```javascript

gen clone {{COMPONENT NAME THAT WILL BE CLONED}} {{NAME OF CLONED COMPONENT}}

// Clones the specified component and renames the new component as well as updates components.js
```


___________
#### Remove Component:
```javascript

gen -r {{COMPONENT NAME}}
gen remove {{COMPONENT NAME}}

// Removes the specified component name and updates components.js
```

___________
#### Update component.js:
```javascript

gen update components.js

// Updates the components.js file
// If you manually remove a component directory then call this function to update the components.js file
```


___________
#### Version Number:
```javascript
gen v
gen -v
gen version
gen --version  

// Retrieves the Angular-1.5-cli version number
```
___________
#### Help:
```javascript
gen h
gen -h
gen help
gen --help  

// Retrieves the Angular-1.5-cli command list
```
___________
