/* Game namespace */
var game = {

  // an object where to store game information
  data : {
    // score
    score : 0,
    settings : false,
    gameover : false,
    volume : 1.0,
    music : "primus1"
  },

  // Run on page load.
  "onload" : function () {
    // Initialize the video.
    var keepAspectRatio = (me.device.isMobile || navigator.isCocoonJS) ? false : true;
    if (!me.video.init("screen",  me.video.CANVAS, 480, 384, true, 'auto', keepAspectRatio)) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(this, debugPanel, "debug");
      });
    }

    // Initialize the audio.
    me.audio.init("ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },

  // Run on game resources loaded.
  "loaded" : function () {
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.SETTINGS, new game.SettingScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.set(me.state.GAMEOVER, new game.GameOver());

    // register our player entity in the object pool
    me.pool.register("mainPlayer", game.PlayerEntity);
    // register our collector entity in the object pool
    me.pool.register("collector", game.CollectorEntity);

    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.C, "jump", true);
    me.input.bindKey(me.input.KEY.X, "shoot");

    // Start the game.
    me.audio.setVolume(1);
    me.state.change(me.state.MENU);
  }
};

// save references to objects on global (game) scope
var levelLoaded = function(){
  game.mainPlayer = me.game.world.getChildByName("mainPlayer")[0];
  game.mainPlayer.z = 6;
  game.collector = me.game.world.getChildByName("collector")[0];
  game.collector.z = 6;
}
me.game.onLevelLoaded = this.levelLoaded.bind(this);

me.event.subscribe(me.event.KEYUP, function (action, keyCode) {
  // Checking unbound keys
  if (keyCode == me.input.KEY.X) game.collector.requireShootKeyRelease = false;
});
