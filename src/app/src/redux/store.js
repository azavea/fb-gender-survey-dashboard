import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['visualizations', 'survey'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ diff: true, collapsed: true });
    middlewares.push(logger);
}

const configureStore = () => {
    const store = applyMiddleware(...middlewares)(createStore)(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    const persistor = persistStore(store);
    return { store, persistor };
};

export { configureStore as default };
