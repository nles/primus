game.resources = [

  /* Graphics. */
  {name: "sewer_tileset", type:"image", src: "data/img/map/sewer_tileset.png"},
  // metatiles
  {name: "metatiles24x24",  type:"image", src: "data/img/map/metatiles24x24.png"},
  // the main player spritesheet
  {name: "primus_sequence", type:"image", src: "data/img/sprite/primus_sequence.png"},
  // the collector spritesheet
  {name: "collector", type:"image", src: "data/img/sprite/collector.png"},
  // the faller spritesheets
  {name: "faller", type:"image", src: "data/img/sprite/faller.png"},
  {name: "faller_fixone", type:"image", src: "data/img/sprite/faller_fixone.png"},
  {name: "faller_fixall", type:"image", src: "data/img/sprite/faller_fixall.png"},
  // the floor_crack spritesheet
  {name: "floor_crack", type:"image", src: "data/img/sprite/floor_crack.png"},
  // main player walking animation
  {name: "main_char_walk", type:"image", src: "data/img/sprite/main_char_walk.png"},
  // font file for the HUD
  {name: "font", type:"image", src: "data/img/font/16x16_font.png"},
  // a button of some sort
  {name: "button", type:"image", src: "data/img/title/button.png"},
  // background picture for the title screen
  {name: "background", type:"image", src: "data/img/title/bg.png"},

	
  {name: "area01_bkg0", type:"image", src: "data/img/background.png"},
  // font file for the HUD
  {name: "font", type:"image", src: "data/img/font/16x16_font.png"},

  /* Atlases
   * @example
   * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
   */

  /* Maps. */
  {name: "area01", type: "tmx", src: "data/map/area01.json"},

  /* Background music.
   * @example
   * {name: "example_bgm", type: "audio", src: "data/bgm/"},
   */
  {name: "primus1", type: "audio", src: "data/bgm/"},
  {name: "primus2", type: "audio", src: "data/bgm/"},
  {name: "primusstartmenu", type: "audio", src: "data/bgm/"},
  
  /* Sound effects.
   * @example
   * {name: "example_sfx", type: "audio", src: "data/sfx/"}
   */

  //for some reason there can't be capital letters in the audio files or the game won't load
  {name: "cracking", type: "audio", src: "data/sfx/"},
  {name: "death", type: "audio", src: "data/sfx/"},
  {name: "hittingobject", type: "audio", src: "data/sfx/"},
  {name: "shootingobjects", type: "audio", src: "data/sfx/"},
];
