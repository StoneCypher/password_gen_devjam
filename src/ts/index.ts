
import { version } from './generated_code/version';





// seq(3) is [0,1,2]
// - generate an array of the needed length.
// - fill it with zero because .map skips holes and a `new Array()` is all holes
// - map and ignore the zeroes; return the indices, which is what we actually want

const seq = (n: number) =>

  new Array(n).fill(0).map( (_, i) => i );





// ch_seq('a', 4) is 'abcd'
// - seq() to get the series length
// - map and add to the requested character, as the first index of the input string as a char code
// - bounce back to characters with .fromCharCode and join('') to get a target string

const ch_seq = (ch: string, n: number) =>

  seq(n).map(off => String.fromCharCode(ch.charCodeAt(0) + off)).join('');





const byId   = (id: string) => document.getElementById(id),                                                    // convenience
      s_byId = (id: string) => { const c = byId(id); if (c === null) { throw 'no such element'; } return c; }, // wrap off null returns
      i_byId = (id: string) => ( (s_byId(id)) as HTMLInputElement ),                                           // cast to HTMLInputElement
      idVal  = (id: string) => i_byId(id).value,                                                               // get the .value
      idValN = (id: string) => Number( idVal(id) ),                                                            //   as a number
      idValB = (id: string) => Boolean( i_byId(id).checked );                                                  //   as a boolean





// startup routine.  sets the onclicks and onchanges; generates initial passwords

const bootstrap = () => {

  // capture changes from number spinners and checkboxes
  document
    .querySelectorAll('input')
    .forEach(i => i.onchange = remake);

  i_byId('what_symbols').onkeyup = remake;  // capture changes to the custom symbol textbox

  (byId('regenerate') as HTMLButtonElement).onclick = remake;

  remake();

}





// gets a random element from an array.
//
// random_from([1,2,3]) => 3.
// random_from([1,2,3]) => 2.

const random_from = (a: unknown[]) =>

  a[Math.floor(Math.random() * a.length)];





// gets any random character from among a string's characters.
//
// random_among('abc') => 'c'
// random_among('abc') => 'a'

const random_among = (s: string) =>

  random_from(s.split(''));





// generates a random letter for a password according to the current
// characterset rule, as found in the relevant DOM element

const letter = () =>

  random_among( i_byId('characterset').value );





// Make a password by taking a sequence of the relevant length, mapping it,
// ignoring its contents, and per item generating a character, then flattening
// that to get a string

const new_pass = (length: number) =>

  seq(length).map(_ => letter()).join('');





// remake the password list by looking up the numbers and booleans in the dom,
// using those to rewrite the characterset

const remake = () => {

  const len = idValN('pass_length'),
        cnt = idValN('pass_count'),
        upp = idValB('has_upper'),
        low = idValB('has_lower'),
        num = idValB('has_number'),
        sym = idValB('has_symbol'),
        asj = idValB('as_json');

  console.log(`len ${len}, cnt ${cnt}, upp ${upp?'y':'n'}, low ${low?'y':'n'}, num ${num?'y':'n'}, sym ${sym?'y':'n'}, asj ${asj?'y':'n'}`);

  const out = byId('output');

  let ch_ = '';

  if (upp) { ch_ += ch_seq('A', 26); }
  if (low) { ch_ += ch_seq('a', 26); }
  if (num) { ch_ += ch_seq('0', 10); }
  if (sym) { ch_ += idVal('what_symbols'); }

  if (out === null) { throw 'no output element?!';  }

  i_byId('characterset').value = ch_;

  const passes = seq(cnt).map( _ => new_pass(len) );

  out.innerHTML =
    asj
      ? JSON.stringify(passes, undefined, 2)
      : passes.join('\n');

}





export { bootstrap, version, remake, byId, idVal, idValN, idValB, i_byId };
