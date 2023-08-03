const Application = function(namespace){
    Object.defineProperty(this, "name", {get:()=>namespace});
    window[namespace] = this
}

export default Application
