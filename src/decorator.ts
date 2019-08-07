/* eslint no-param-reassign: "error" */

import Didux from './didux';
import { ACTIONS_SYMBOL } from './constant';

function isPromise(value: any) {
	if (value !== null && typeof value === 'object') {
		return value && typeof value.then === 'function';
	}

	return false;
}

export function action<T>(): MethodDecorator {
	return (target, key, descriptor: PropertyDescriptor): PropertyDescriptor => {
		const actionName = `@didux/${target.constructor.name}_${String(key)}`;
		const actions = Reflect.getMetadata(ACTIONS_SYMBOL, target) || [];

		Reflect.defineMetadata(ACTIONS_SYMBOL, [...actions, actionName], target);

		const fn = descriptor.value;

		descriptor.value = function WraFunc(...props: any[]): T | Promise<T> {
			const result = fn.apply(this, props);

			if (isPromise(result)) {
				return result.then((data: T) => {
					(this as Didux<T>).dispatch({ type: actionName, payload: data });

					return data;
				});
			}

			(this as Didux<T>).dispatch({ type: actionName, payload: result });

			return result;
		};

		return descriptor;
	};
}
