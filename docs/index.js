var pwd_bundle = (function (exports) {
    'use strict';

    const version = "1.0.0"; new Date().getTime();

    const seq = (n) => new Array(n).fill(0).map((_, i) => i);
    const ch_seq = (ch, n) => seq(n).map(off => String.fromCharCode(ch.charCodeAt(0) + off)).join('');
    const byId = (id) => document.getElementById(id), s_byId = (id) => { const c = byId(id); if (c === null) {
        throw 'no such element';
    } return c; }, i_byId = (id) => (s_byId(id)), idVal = (id) => i_byId(id).value, idValN = (id) => Number(idVal(id)), idValB = (id) => Boolean(i_byId(id).checked);
    const bootstrap = () => {
        document
            .querySelectorAll('input')
            .forEach(i => i.onchange = remake);
        i_byId('what_symbols').onkeyup = remake;
        byId('regenerate').onclick = remake;
        remake();
    };
    const random_from = (a) => a[Math.floor(Math.random() * a.length)];
    const random_among = (s) => random_from(s.split(''));
    const letter = () => random_among(i_byId('characterset').value);
    const new_pass = (length) => seq(length).map(_ => letter()).join('');
    const remake = () => {
        const len = idValN('pass_length'), cnt = idValN('pass_count'), upp = idValB('has_upper'), low = idValB('has_lower'), num = idValB('has_number'), sym = idValB('has_symbol'), asj = idValB('as_json');
        console.log(`len ${len}, cnt ${cnt}, upp ${upp ? 'y' : 'n'}, low ${low ? 'y' : 'n'}, num ${num ? 'y' : 'n'}, sym ${sym ? 'y' : 'n'}, asj ${asj ? 'y' : 'n'}`);
        const out = byId('output');
        let ch_ = '';
        if (upp) {
            ch_ += ch_seq('A', 26);
        }
        if (low) {
            ch_ += ch_seq('a', 26);
        }
        if (num) {
            ch_ += ch_seq('0', 10);
        }
        if (sym) {
            ch_ += idVal('what_symbols');
        }
        if (out === null) {
            throw 'no output element?!';
        }
        i_byId('characterset').value = ch_;
        const passes = seq(cnt).map(_ => new_pass(len));
        out.innerHTML =
            asj
                ? JSON.stringify(passes, undefined, 2)
                : passes.join('\n');
    };

    exports.bootstrap = bootstrap;
    exports.byId = byId;
    exports.i_byId = i_byId;
    exports.idVal = idVal;
    exports.idValB = idValB;
    exports.idValN = idValN;
    exports.remake = remake;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
