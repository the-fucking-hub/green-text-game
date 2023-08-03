import {registerModule, hasModule, unregisterModule} from "./store.js";

const ModulesIterator = function (descriptor) {
    const iterator = ({submodules}) => Object.values(submodules).values();
    const path = [iterator(descriptor)];
    this.next = () => {
        while (path.length !== 0) {
            const parent = path.pop();
            const child = parent.next();
            if (child.done) {
                continue;
            }
            path.push(parent);
            if (child.value.submodules !== undefined) {
                path.push(iterator(child.value));
            }
            return {value: child.value, done: false};
        }
        return {value: undefined, done: true};
    };
    this[Symbol.iterator] = () => this;
};

export const ModulesInitializer = function (store, descriptor) {
    const initialize = async ({init}) => {
        if (init === undefined) {
            return;
        }
        await init(store);
    };
    const register = (submodule) => {
        if (submodule === undefined) {
            return;
        }
        registerModule(store, submodule);
    };
    const deregister = (submodule) => {
        if (submodule === undefined) {
            return;
        }
        if (hasModule(store, submodule)) {
            unregisterModule(store, submodule);
        }
    };
    this.registerAll = () => {
        const submodules = new ModulesIterator(descriptor);
        for (const submodule of submodules) {
            register(submodule);
        }
    };
    this.replaceAll = () => {
        const submodules = new ModulesIterator(descriptor);
        const submodulesArray = [...submodules];
        const submodulesArrayReverse = [...submodulesArray].reverse();
        for (const submodule of submodulesArrayReverse) {
            // deregister modules in reverse order
            deregister(submodule);
        }
        for (const submodule of submodulesArray) {
            register(submodule);
        }
    };
    this.initializeAll = async () => {
        const submodules = new ModulesIterator(descriptor);
        const submodulesInitialize = [];
        for (const submodule of submodules) {
            submodulesInitialize.push(await initialize(submodule));
        }
        return submodulesInitialize;
    };
};
