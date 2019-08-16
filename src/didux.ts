import { createStore, Store, Reducer, Unsubscribe, Action } from 'redux';
import { ACTIONS_SYMBOL } from './constant';

interface PayloadAction<state> extends Action {
	payload: state;
}

abstract class Didux<state = any> {
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
