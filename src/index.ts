import 'reflect-metadata';

import Didux from './didux';
import { action } from './decorator';

interface data {
	count: number;
}

export const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

class Calculator extends Didux<data> {
	setupDefaultState() {
		return { count: 0 };
	}

	@action
	reset(): data {
		return { count: 0 };
	}

	@action
	addOne(): data {
		const state = this.getState();

		return { count: state.count + 1 };
	}

	@action
	add(num: number): data {
		const state = this.getState();

		return { count: state.count + num };
	}

	@action
	async delayAdd(num: number, time: number): Promise<data> {
		const state = this.getState();

		await sleep(time);

		return { count: state.count + num };
	}
}

async function exec() {
	const calculator = new Calculator();

	calculator.subscribe(() => {
		console.log('listener', calculator.getState());
	});

	console.log(calculator.getState());

	console.log('Get add one', calculator.addOne());

	console.log('result', calculator.getState());

	console.log('add 10?', calculator.add(10));

	console.log('reset');

	console.log('reset?', calculator.reset());

	const result = await Promise.all([calculator.delayAdd(1, 5000), calculator.delayAdd(10, 1000)]);

	console.log(result);
}

exec();

export default Calculator;
