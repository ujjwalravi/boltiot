# Bolt IoT API Wrapper

[![NPM Version][npm-version-image]][npm-url]

Simple wrapper for Bolt IoT API - https://cloud.boltiot.com/api

## About
The Bolt IoT Node Package is a powerful and convenient wrapper for the Bolt IoT platform's core APIs. This package allows developers to easily interact with the Bolt Cloud API using Node.js, enabling seamless integration of the Bolt IoT platform into their applications and projects. This node package acts as a wrapper for the existing Bolt Cloud's API. This package is inspired from its official Python's package https://pypi.org/project/boltiot/.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install boltiot
```
or,
```sh
$ npm i boltiot
```

## Geting Started
* __Obtain Your API Key:__
To access the Bolt IoT services, you need an API key from the Bolt Cloud platform. If you don't have one, sign up on the Bolt Cloud platform to obtain your API key.
* __Instantiate the BoltIoT Class:__
To begin using the package, you first need to import the **BoltIoT** class and instantiate it with your API key and device name.

### Import
Use any of the below two ways to import the package.
```js
var BoltIoT = require('boltiot')
import BoltIoT from 'boltiot'
```
## Class: BoltIoT
### Constructor
The **BoltIoT** class is used to interact with the Bolt Cloud API. You need to provide your API key and device name when instantiating the class.
### Parameters
* **api_key** (string): Your Bolt Cloud API key obtained from the Bolt Cloud platform.
* **device_name** (string): The name of the Bolt device you want to control. Ensure that the device is linked to your Bolt Cloud account and is online.
```js
const bolt = new BoltIoT('YOUR_API_KEY', 'YOUR_DEVICE_NAME')
```
### Methods
Once you have instantiated the BoltIoT class, you can use the following methods to interact with the Bolt Cloud API. Please use **async/await** to call the methods or else **Promise** will be returned.

(Note: The package documentation assumes basic familiarity with the Bolt Cloud API. For detailed information on the Bolt Cloud API, refer to the official Bolt Cloud API Documentation.)

1. **digitalRead(pin)**
* pin (integer) - Digital pin number of the Bolt Device - (0,1,2,3,4)
```js
const res = await bolt.digitalRead(1)
```
2. **digitalMultiRead(pins)**
* pins (array<integer>) - Digital pin number of the Bolt Device - (0,1,2,3,4)
```js
const res = await bolt.digitalMultiRead([0,1,3])
```
3. **digitalWrite(pin, value)**
* pin (integer) - Digital pin number of the Bolt Device - (0,1,2,3,4)
* value (string) - Digital pin values - ('HIGH', 'LOW')
```js
const res = await bolt.digitalWrite(0, 'HIGH')
```
4. **digitalMultiWrite(pins, values)**
* pins (array<integer>) - Digital pin number of the Bolt Device - (0,1,2,3,4)
* value (array<string>) - Digital pin values - ('HIGH', 'LOW')
```js
const res = await bolt.digitalMultiWrite([0,1,3], ['HIGH', 'LOW', 'HIGH'])
```
5. **analogRead(pin)**
* pin (string) - Analog pin number of the Bolt Device - ('A0')
```js
const res = await bolt.analogRead('A0')
```
6. **analogWrite(pin, value)**
* pin (integer) - Pin number of the Bolt Device - (0,1,2,3,4)
* value (integer) - Analog pin value between 0 and 255 - (0 <= value <= 255)
```js
const res = await bolt.analogWrite('A0', 128)
```
7. **serialBegin()**
* No parameters required 
```js
const res = await bolt.serialBegin()
```
8. **serialRead(value)**
* value (integer) - Value between 0 and 127 - (0 <= value <= 127)
```js
const res = await bolt.serialRead(64)
```
9. **serialWrite(value)**
* data (string): The data to be sent to the Bolt device via Serial.
```js
const res = await bolt.serialWrite('Hello, Bolt!')
```
10. **serialWriteRead(till, data)**
* till (integer) - Value between 0 and 127 - (0 <= value <= 127)
* data (string): The data to be sent to the Bolt device via Serial.
```js
const res = await bolt.serialWriteRead(124, 'Hello Bolt!')
```
11. **servoWrite(pin, value)**
* pin (integer) - Digital pin number of the Bolt Device - (0,1,2,3,4)
* value (integer) - Value between 0 and 127 - (0 <= value <= 180)
```js
const res = await bolt.servoWrite(1, 45)
```
12. **getHistoricalData()**
* No parameters required 
```js
const res = await bolt.getHistoricalData()
```
13. **getVersion()**
* No parameters required 
```js
const res = await bolt.getVersion()
```
14. **getDeviceStatus()**
* No parameters required 
```js
const res = await bolt.getDeviceStatus()
```
15. **restartDevice()**
* No parameters required 
```js
const res = await bolt.restartDevice()
```
16. **getDeviceList()**
* No parameters required 
```js
const res = await bolt.restartDevice()
```
## Contribution
We welcome contributions from the community. If you find any issues or have ideas for improvements, feel free to create a pull request. Also, please keep an eye on active issues.

## License

[MIT](LICENSE)

[npm-url]: https://npmjs.org/package/boltiot
[npm-version-image]: https://badgen.net/npm/v/boltiot