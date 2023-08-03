import {ModulesInitializer} from "./modules.js";
import {createStore} from "./store.js";

export const createDispatcherStore = (descriptor) => {
    const store = createStore(descriptor);
    const initializer = new ModulesInitializer(store, descriptor);
    initializer.registerAll();
    return {store, initializer};
};
