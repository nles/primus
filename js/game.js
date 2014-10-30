/* Game namespace */
var game = {

  // an object where to store game information
  data : {
    // score
    score : 0
  },

  // Run on page load.
  "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen",  me.video.CANVAS, 480, 380, true, 'auto')) {
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
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },

  // Run on game resources loaded.
  "loaded" : function () {
    // me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());

    // register our player entity in the object pool
    me.pool.register("mainPlayer", game.PlayerEntity);
    // register our collector entity in the object pool
    me.pool.register("collector", game.CollectorEntity);
    // register our faller entity in the object pool
    // me.pool.register("faller", game.FallerEntity);

    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.C, "jump", true);
    me.input.bindKey(me.input.KEY.X, "shoot");

    // Start the game.
    me.state.change(me.state.PLAY);
  }

};

// save references to objects on global (game) scope
var levelLoaded = function(){
  game.mainPlayer = me.game.world.getChildByName("mainPlayer")[0];
  game.collector = me.game.world.getChildByName("collector")[0];
}
me.game.onLevelLoaded = this.levelLoaded.bind(this);

me.event.subscribe(me.event.KEYUP, function (action, keyCode) {
  // Checking unbound keys
  if (keyCode == me.input.KEY.X) game.collector.requireShootKeyRelease = false;
});
