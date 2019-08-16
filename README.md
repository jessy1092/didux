# Didux

Combine redux into class for DI usage

## Example

### Typescript

```ts
import 'reflect-metadata';

import Didux from '../src/didux';
import { action } from '../src/decorator';

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
```

## License

The MIT License (MIT)

Copyright (c) 2019 Lee < jessy1092@gmail.com >

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
