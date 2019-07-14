import { createStore, Store, Reducer, Unsubscribe, Action } from 'redux';

const ACTIONS_SYMBOL = Symbol('ACTIONS');

interface PayloadAction<state> extends Action {
	payload: state;
}

export function action<T>(): MethodDecorator {
	return (target, key, descriptor: PropertyDescriptor): PropertyDescriptor => {
		const actionName = `@didux/${target.constructor.name}_${String(key)}`;
		const actions = Reflect.getMetadata(ACTIONS_SYMBOL, target) || [];

		Reflect.defineMetadata(ACTIONS_SYMBOL, [...actions, actionName], target);

		const fn = descriptor.value;

		descriptor.value = function(...props: any[]): T {
			const result = fn.apply(this, props);

			(<Didux<T>>this).dispatch({ type: actionName, payload: result });

			return result;
		};

		return descriptor;
	};
}

abstract class Didux<state> {
	private _store: Store;

	private _unsubscribe: Unsubscribe = () => {};

	constructor() {
		const actions: string[] = Reflect.getMetadata(ACTIONS_SYMBOL, this) || [];
		const defaultState = this.setupDefaultState();
		const reducer = this.createReducer(actions, defaultState);
		this._store = createStore(reducer);
	}

	private createReducer(
		actions: string[],
		defaultState: state,
	): Reducer<state, PayloadAction<state>> {
		return (state = defaultState, action) => {
			if (actions.includes(action.type)) {
				return action.payload;
			}

			return state;
		};
	}

	abstract setupDefaultState(): state;

	getState(): state {
		return this._store.getState();
	}

	dispatch(action: PayloadAction<state>) {
		return this._store.dispatch(action);
	}

	subscribe(props: () => void): () => void {
		this._unsubscribe = this._store.subscribe(props);

		return () => {
			this._unsubscribe();
		};
	}
}

export default Didux;
