# Primus

This game was created during
[Introduction to Game Development Tools course](https://nettiopsu.utu.fi/opas/opintojakso.htm?id=34691&lang=en&lvv=2014&uiLang=en)
of 2014 in the University of Turku.

The game uses [melonJS](http://melonjs.org/) game engine, so it works in modern web browsers. It was also
[ported for Android](https://www.dropbox.com/s/d1ita1c8pv8ehw0/primus_debug_signed.apk?dl=0)
using [CocoonJS](https://www.ludei.com/cocoonjs/).

Click [here](http://pea.nu/primus) for an online demo.

## Directory structure
- ./js
  - main directory with the code
- ./data
  - the assets are here
- ./lib
  - game engine resides here

## Code structure and logic
The code is structured according to the melonJS [boilerplate](https://github.com/melonjs/boilerplate)
and mostly follows the patterns defined in the [melonJS documentation](http://melonjs.org/docs).

## How to run a distribution for further development

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:
```
git clone https://github.com/nles/pyoroclone.git
```

Then in the cloned directory, simply run:
```
npm install
```

To build:
```
grunt
```

Running the game:
```
grunt connect
```

And you will have the game running on http://localhost:8000
