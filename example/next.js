import 'reflect-metadata';

import { Didux } from '../dist-es';
import { action } from '../dist-es/decorator';

export const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

class Calculator extends Didux {
	setupDefaultState() {
		return { count: 0 };
	}

	@action
	reset() {
		return { count: 0 };
	}

	@action
	addOne() {
		const state = this.getState();

		return { count: state.count + 1 };
	}

	@action
	add(num) {
		const state = this.getState();

		return { count: state.count + num };
	}

	@action
	async delayAdd(num, time) {
		await sleep(time);

		const state = this.getState();

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
