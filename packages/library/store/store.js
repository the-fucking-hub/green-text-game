import {reactive, computed} from "vue";
/**
 * Registers getters in a store module
 * @param {*} root
 * @param {*} prototype
 * @param {*} getters
 * @returns
 */
const registerGetters = (module, prototype, getters) => {
    if (getters === undefined) {
        return;
    }
    for (let name in getters) {
        prototype[name] = computed(() => getters[name].call(module));
    }
};

/**
 * Registers actions in a store module
 * @param {*} root
 * @param {*} prototype
 * @param {*} actions
 * @returns
 */
const registerActions = (module, prototype, actions) => {
    if (actions === undefined) {
        return;
    }
    for (let name in actions) {
        prototype[name] = actions[name].bind(module);
    }
};

/**
 * Registers mutations in a store module
 * @param {*} root
 * @param {*} prototype
 * @param {*} actions
 * @returns
 */
const registerMutations = (module, prototype, mutations) => {
    if (mutations === undefined) {
        return;
    }
    for (let name in mutations) {
        prototype[name] = mutations[name].bind(module);
    }
};

/**
 * Creates a new store module
 * @param {*} root
 * @param {*} desc
 * @returns
 */
const createModule = (root, parent, {state, actions, getters, mutations, machine}) => {
    const prototype = {};
    const module = reactive(Object.assign(Object.create(prototype), state));
    if (root === null) {
        root = module;
    }
    prototype.$root = root;
    prototype.$parent = parent;
    registerGetters(module, prototype, getters);
    registerActions(module, prototype, actions);
    registerMutations(module, prototype, mutations);
    return module;
};

/**
 * Creates root store module
 * @param {*} desc store descriptor
 * @returns
 */
export const createStore = (desc) => createModule(null, null, desc);

/**
 * Retrieves a module parent by using its path
 * @param {*} root
 * @param {*} path
 * @returns
 */
const getModuleParentByPath = (root, path) => {
    const name = path.pop();
    let parent = root;
    while (path.length) {
        parent = parent[path.shift()];
    }
    return {parent, name};
};

/**
 * Builds a path array by splitting a string
 * @param {*} param0
 * @returns
 */
const getPathFromDesc = ({path}) => {
    if (typeof path === "string") {
        return path.split(".");
    }
    return [...path];
};

/**
 * Registers a new module in a store
 * @param {*} root root module
 * @param {*} desc module descriptor
 */
export const registerModule = (root, desc) => {
    const path = getPathFromDesc(desc);
    const {parent, name} = getModuleParentByPath(root, path);
    parent[name] = createModule(root, parent, desc);
};

/**
 * Deregisters an existing module
 * @param {*} root
 * @param {*} desc
 */
export const unregisterModule = (root, desc) => {
    const path = getPathFromDesc(desc);
    const {parent, name} = getModuleParentByPath(root, path);
    delete parent[name];
};

/**
 * Checks if a module is already registered
 * @param {*} root
 * @param {*} desc
 */
export const hasModule = (root, desc) => {
    const path = getPathFromDesc(desc);
    const {parent, name} = getModuleParentByPath(root, path);
    return name in parent;
};

/**
 * Registers a new module in a store by replacing an existing one
 * @param {*} root root module
 * @param {*} desc module descriptor
 */
export const registerModuleReplace = (root, desc) => {
    const path = getPathFromDesc(desc);
    const {parent, name} = getModuleParentByPath(root, path);
    if (name in parent) {
        delete parent[name];
    }
    parent[name] = createModule(root, parent, desc);
};
