import 'reflect-metadata';
import { ReflectiveInjector, Injectable } from 'injection-js';

import { Didux } from '../src';
import { action } from '../src/decorator';

type data = {
	name: string;
};

type EnginData = {
	power: string;
};

@Injectable()
class Engine extends Didux<EnginData> {
	setupDefaultState() {
		return { power: '' };
	}

	@action
	setPower(power: string): EnginData {
		return { power };
	}
}

@Injectable()
class Car extends Didux<data> {
	constructor(private engin: Engine) {
		super();
	}

	setupDefaultState() {
		return { name: 'Basic' };
	}

	@action
	setName(name: string): data {
		return { name };
	}

	setupWithPower() {
		this.engin.setPower('123');

		this.setName('Basic Hi');
	}
}

const injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);

const singleEngin = injector.get(Engine) as Engine;

singleEngin.subscribe(() => console.log('listener', singleEngin.getState()));

console.log(injector.get(Car) instanceof Car);

const car = injector.get(Car) as Car;

car.setupWithPower();

console.log(singleEngin.getState());

@Injectable()
class MockCar extends Car {
	setupDefaultState() {
		return { name: 'Mock Car' };
	}
}

const injectorChild = ReflectiveInjector.resolveAndCreate(
	[{ provide: Car, useClass: MockCar }],
	injector,
);

console.log(injectorChild.get(Car) instanceof MockCar);

const mockCar = injectorChild.get(Car) as MockCar;

console.log(mockCar.getState());

mockCar.setName('Mock 2');

console.log(mockCar.getState());
console.log(car.getState());

console.log(mockCar === car);

const tmpEngin = injectorChild.get(Engine) as Engine;

console.log(tmpEngin.getState());
console.log(tmpEngin === singleEngin);

export default Car;
