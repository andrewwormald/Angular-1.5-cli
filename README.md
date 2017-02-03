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

#### Future Development List for Angular-1.5-cli:
<!-- ```javascript -->


* Be able to generate directives

<!-- ``` -->
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
