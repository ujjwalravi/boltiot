'use strict'
import fetch from 'node-fetch'

const BASE_URL = 'https://cloud.boltiot.com/remote/'

class BoltIoT {
	constructor(apiKey, deviceName) {
		this.apiKey = apiKey
		this.deviceName = deviceName
	}

	static async getData(url) {
		try {
			const response = await fetch(url)
			if (!response.ok) {
				return {value: 'Request not successful. Network response was not ok.', success: 0}
			}
			const data = await response.json()
			return data
		} catch (error) {
			return {value: `Some error occurred - ${error.message}`, success: 0}
		}
	}

	static isValidValue(value, allowed_vals) {
		if (typeof value === 'number') {
			return allowed_vals.includes(value)
		} 
		else if (typeof value == 'string') {
			return allowed_vals.includes(value.toLowerCase())
		}
		else if (Array.isArray(value)) {
			return value.every(item => {
				if (typeof item == 'string') return allowed_vals.includes(item.toLowerCase())
				if (typeof item == 'number') return allowed_vals.includes(item)
			})
		} else {
			return false
		}
	}

	static constructReadOperationUrlString(pin, apiKey, deviceName, type, operation) {
		try {
			let queryParams = ''
			if (type == 'digital' && this.isValidValue(pin, [0, 1, 2, 3, 4])) {
				if (Array.isArray(pin)) {
					pin.sort()
					queryParams = `pins=${pin.join(',' )}`
				}
				else if (typeof pin == 'number') {
					queryParams =  `pin=${pin}`
				}
				else {
					throw Error('Input value is no valid or not allowed')
				}
				return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
			}
			if (type == 'analog') {
				if (pin == 'A0') {
					queryParams =  `pin=${pin}`
					return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
				} else {
					throw Error('Input value is not valid or not allowed')
				}
			}
			if (operation == 'serialWrite') {
				queryParams =  `data=${pin}`
				return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
			}
			if (type == 'serial') {
				if (pin < 128 && pin >= 0) {
					queryParams =  `till=${pin}`
					return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
				} else {
					throw Error('Input value is not valid or not allowed')
				}
			}
			else {
				return {value: 'Input value is no valid or not allowed', success: 0}
			}
		} catch(err) {
			return {value: `Some error occurred - ${err.message}`, success: 0}
		}
	}

	static constructWriteOperationUrlString(pin, value, apiKey, deviceName, type, operation) {
		try {
			let queryParams = ''
			console.log('Val', value)
			if (type == 'digital' && this.isValidValue(pin, [0, 1, 2, 3, 4]) && this.isValidValue(value, ['high', 'low'])) {
				if (Array.isArray(pin) && Array.isArray(value) && pin.length == value.length) {
					queryParams = `pins=${pin.join(',' )}&states=${(value.map(item => item.toUpperCase()).join(',' ))}`
				}
				else if (typeof pin == 'number' && typeof value == 'string') {
					queryParams =  `pin=${pin}&state=${value.toUpperCase()}`
				}
				else {
					throw Error('Input value is not valid or not allowed')
				}
				return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
			}
			if (type == 'analog') {
				if (pin == 'A0' && value <= 255 && value >= 0) {
					queryParams =  `pin=${pin}&value=${value}`
					return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
				} else {
					throw Error('Input value is not valid or not allowed')
				}
			}
			if (type == 'serial') {
				if (pin < 128 && pin >= 0) {
					queryParams =  `data=${value}&till=${pin}`
					return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
				} else {
					throw Error('Input value is not valid or not allowed')
				}
			}
			if (type == 'servo') {
				if (this.isValidValue(pin, [0, 1, 2, 3, 4]) && value <= 180 && value >= 0) {
					queryParams =  `pin=${pin}&value=${value}`
					return {value: `${BASE_URL}${apiKey}/${operation}?deviceName=${deviceName}&${queryParams}`, success: 1}
				} else {
					throw Error('Input value is not valid or not allowed')
				}
			}
			else {
				return {value: 'Input value is no valid or not allowed', success: 0}
			}
		} catch(err) {
			return {value: `Some error occurred - ${err.message}`, success: 0}
		}
	}

	async digitalRead(pin) {
		const url = BoltIoT.constructReadOperationUrlString(pin, this.apiKey, this.deviceName, 'digital', 'digitalRead')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async digitalMultiRead(pin) {
		const url = BoltIoT.constructReadOperationUrlString(pin, this.apiKey, this.deviceName, 'digital', 'digitalMultiRead')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async digitalWrite(pin, value) {
		const url = BoltIoT.constructWriteOperationUrlString(pin, value, this.apiKey, this.deviceName, 'digital', 'digitalWrite')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async digitalMultiWrite(pin, value) {
		const url = BoltIoT.constructWriteOperationUrlString(pin, value, this.apiKey, this.deviceName, 'digital', 'digitalMultiWrite')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async analogRead(pin='A0') {
		const url = BoltIoT.constructReadOperationUrlString(pin.toUpperCase(), this.apiKey, this.deviceName, 'analog', 'analogRead')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async analogWrite(pin, value) {
		const url = BoltIoT.constructWriteOperationUrlString(pin.toUpperCase(), parseInt(value), this.apiKey, this.deviceName, 'analog', 'analogWrite')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async serialBegin() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/serialBegin?deviceName=${this.deviceName}&baud=9600`
		const result = await BoltIoT.getData(url)
		return result
	}

	async serialRead(value) {
		const url = BoltIoT.constructReadOperationUrlString(value, this.apiKey, this.deviceName, 'serial', 'serialRead')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async serialWrite(value) {
		const url = BoltIoT.constructReadOperationUrlString(value, this.apiKey, this.deviceName, 'serial', 'serialWrite')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async serialWriteRead(till, data) {
		const url = BoltIoT.constructWriteOperationUrlString(till, data, this.apiKey, this.deviceName, 'serial', 'serialWR')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async servoWrite(pin, value) {
		const url = BoltIoT.constructWriteOperationUrlString(pin, parseInt(value), this.apiKey, this.deviceName, 'servo', 'servoWrite')
		if (!url.success) return url
		const result = await BoltIoT.getData(url.value)
		return result
	}

	async getHistoricalData() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/fetchData?deviceName=${this.deviceName}`
		const result = await BoltIoT.getData(url)
		return result
	}

	async getVersion() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/version?deviceName=${this.deviceName}`
		const result = await BoltIoT.getData(url)
		return result
	}

	async getDeviceStatus() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/isOnline?deviceName=${this.deviceName}`
		const result = await BoltIoT.getData(url)
		return result
	}

	async restartDevice() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/restart?deviceName=${this.deviceName}`
		const result = await BoltIoT.getData(url)
		return result
	}

	async getDeviceList() {
		let url = `https://cloud.boltiot.com/remote/${this.apiKey}/getDevices`
		const result = await BoltIoT.getData(url)
		return result
	}
}

export default BoltIoT