game.PlayScreen = me.ScreenObject.extend({
  /**
  * action to perform on state change
  */
  onResetEvent: function() {
    // load a level
    me.levelDirector.loadLevel("area01");

    // reset the score
    game.data.score = 0;

    // add our HUD to the game world
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    // start randomly spawning fallers every 2 second
    var floorgrid = h.floorgrid()
    var fallInterval = setInterval(function(){
      if(!me.state.isPaused()){
        // select a random floor tile x coordinate
        var floorIndex = h.random(0,floorgrid.length-1)
        var newX = floorgrid[floorIndex]
        var faller = new game.FallerEntity(newX-(24), 100, {});
        me.game.world.addChild(faller,5);
      }
      //clearInterval(fallInterval);
    },2000)

  },


  /**
  * action to perform when leaving this screen (state change)
  */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
  }
});
