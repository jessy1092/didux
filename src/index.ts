const test: string = 'test';

console.log(test);

console.log('test ');

const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

const testPromise = async () => {
	console.log('wait 5s');

	await sleep(5000);

	console.log('done');
};

testPromise();

export default test;
