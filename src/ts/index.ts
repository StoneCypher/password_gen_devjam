
import { version } from './generated_code/version';





const seq = (n: number) =>

  new Array(n).fill(0).map( (_, i) => i );





const byId  = (id: string) => document.getElementById(id),

      idVal = (id: string) => {
        const t = byId(id);
        if (id === null) throw 'No such element';
        return (t as HTMLInputElement).value;
      },

      idValN = (id: string) => Number(idVal(id));//,
//      idValB = (id: string) => Boolean(idVal(id));





const bootstrap = () => {

  console.log('bootstrap');

  document
    .querySelectorAll('input')
    .forEach(i => i.onchange = remake);

  remake();

}





const new_pass = (length: number) =>

  'a'.repeat(length);





const remake = () => {

  const len = idValN('pass_length'),
        cnt = idValN('pass_count');
  //       upp = idValB('has_upper'),
  //       low = idValB('has_lower'),
  //       num = idValB('has_upper'),
  //       sym = idValB('has_upper');

  const out = byId('output');
  if (out === null) { throw 'no output element?!'; }

  out.innerHTML = seq(cnt).map( _ => new_pass(len) ).join('\n');

}





export { bootstrap, version, remake, byId, idVal, idValN };
