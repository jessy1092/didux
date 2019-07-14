import Didux from './didux';

interface data {
	count: number;
}

class TestDidux extends Didux<data> {
	setupDefaultState() {
		return { count: 0 };
	}
}

const testDidux = new TestDidux();

console.log(testDidux.getState());

export default TestDidux;
