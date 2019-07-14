import 'reflect-metadata';
import Didux, { action } from './didux';

interface data {
	count: number;
}

class Calculator extends Didux<data> {
	setupDefaultState() {
		return { count: 0 };
	}

	@action<data>()
	reset(): data {
		return { count: 0 };
	}

	@action<data>()
	addOne(): data {
		const state = this.getState();

		return { count: state.count + 1 };
	}

	@action<data>()
	add(num: number): data {
		const state = this.getState();

		return { count: state.count + num };
	}
}

const calculator = new Calculator();

calculator.subscribe(() => {
	console.log('listener', calculator.getState());
});

console.log(calculator.getState());

console.log(calculator.addOne());

console.log('result', calculator.getState());

console.log(calculator.add(10));

console.log('add 10?', calculator.getState());

console.log('reset');

calculator.reset();

export default Calculator;
