import greenText from "@library/global";
import {createDispatcherStore} from "@library/store";
(() => {
    // const settings = import("settings/store.js");
    // const map = import("@dispatcher/map/store.js");
    // const talkgroup = import("talkgroup/store.js");
    // const contacts = import("@dispatcher/contacts/store.js");
    // const conversations = import("@dispatcher/conversations/store.js");
    // const voip = import("voip/store.js");
    // const audioCommunicationBarLayout = import("voip-bar-layout/store.js");
    const submodules = {
        // settings,
        // talkgroup,
        // contacts,
        // conversations,
        // voip,
        // audioCommunicationBarLayout,
        // map
    };
    for (const name in submodules) {
        submodules[name].then((name) => (submodules[name] = name.default));
        //submodules[name] = (await submodules[name]).default;
    }
    const {store, initializer} = createDispatcherStore({
        submodules
    });
    greenText.store = store;

    greenText.store_initializer = initializer;
    greenText.store_initializer.initializeAll();
})();
