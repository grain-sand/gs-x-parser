export function defHideProp<T>(key: string, value: T, targetObject: object = self) {
	Object.defineProperty(targetObject, key, {
		value,
		enumerable: false,
		configurable: false,
		writable: false,
	})
}
