/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        "vue/setup-compiler-macros": true
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "prettier", "@vue/elint-config-prettier/sskip-formatting"],
    plugins: ["prettier"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
    },
    rules: {
        "no-debugger": "off",
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        curly: ["error", "all"],
        semi: ["error", "always"],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: 10,
                multiline: 10
            }
        ],
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/no-mutating-props": "off",
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "always",
                    component: "always"
                },
                svg: "always",
                math: "always"
            }
        ],
        "vue/multi-word-component-names": 0
    },
    ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/vendors/**", "applications/*/test/**"]
};
