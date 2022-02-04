# password_gen_devjam

Password generator app for Dev Jam

[Live demo](https://stonecypher.github.io/password_gen_devjam/)

`tl;dr`:

1. Download the repo
1. `npm install && npm run build`
1. look in `./docs/`





<br/><br/>

## What?

Dev Jam is a discord game for programmers.  Projects are announced either weekly or bi-weekly; developers need to submit
an implementation with visible source by PST thursday morning.

One was just announced ten minutes ago.  I'm gonna just toss one together real quick and not worry about it too much.





<br/><br/>

# So what is it?

Password generator.

* Length
* Include [upper, lower, number, symbol]
* Generate button
* Copy to clipboard button

Bonus:

* Can see generated "strength," link is offered to [one strength checker](https://github.com/dropbox/zxcvbn)





<br/><br/>

## Did we add anything?

Meh.  Yeh.

* Bulk output
* JSON output
* Custom charactersets
* Mean strength estimation





<br/><br/>

# How does it work?

Nice and simple.

1. There's a build process





<br/><br/>

## How is it built?

1. a cleanup routine nukes and remakes `./docs/`, `./build/`, and `./src/ts/generated_code/`
1. `typescript` scans the `ts` directory, and converts any `./ts` or `./tsx` into `.js`, and puts that in `./build/typescript/` as `es2015 modules`
1. `rollup` scans `./build/typescript` for modules and builds them into a single `iife`
1. a copy routine assembles `./src/html/` and the rollup build into `./docs/`
1. if pushed, `./docs/` is hosted on github pages
