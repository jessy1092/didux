import { createStore, Store, Reducer, Unsubscribe, Action } from 'redux';

enum ACTION_TYPE {
	SETUP_REDUCER,
}

interface PayloadAction<state> extends Action {
	type: ACTION_TYPE;
	payload: state;
}

abstract class Didux<state> {
	private _defaultState: state;

	private _store: Store;

	private _reducer: Reducer<state, PayloadAction<state>> = (state = this._defaultState, action) => {
		if (action.type === ACTION_TYPE.SETUP_REDUCER) {
			return action.payload;
		}
		return state;
	};

	private _unsubscribe: Unsubscribe = () => {};

	constructor() {
		this._defaultState = this.setupDefaultState();
		this._store = createStore(this._reducer);
	}

	abstract setupDefaultState(): state;

	getState(): state {
		return this._store.getState();
	}

	subscribe(props: () => void): () => void {
		this._unsubscribe = this._store.subscribe(props);

		return () => {
			this._unsubscribe();
		};
	}
}

export default Didux;
