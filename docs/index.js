var pwd_bundle = (function (exports) {
    'use strict';

    const version = "0.1.0"; new Date().getTime();

    const seq = (n) => new Array(n).fill(0).map((_, i) => i);
    const byId = (id) => document.getElementById(id), idVal = (id) => {
        const t = byId(id);
        if (id === null)
            throw 'No such element';
        return t.value;
    }, idValN = (id) => Number(idVal(id));
    const bootstrap = () => {
        console.log('bootstrap');
        document
            .querySelectorAll('input')
            .forEach(i => i.onchange = remake);
        remake();
    };
    const new_pass = (length) => 'a'.repeat(length);
    const remake = () => {
        const len = idValN('pass_length'), cnt = idValN('pass_count');
        const out = byId('output');
        if (out === null) {
            throw 'no output element?!';
        }
        out.innerHTML = seq(cnt).map(_ => new_pass(len)).join('\n');
    };

    exports.bootstrap = bootstrap;
    exports.byId = byId;
    exports.idVal = idVal;
    exports.idValN = idValN;
    exports.remake = remake;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
