game.GameOver = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    game.data.gameover = true;

    // add our HUD to the game world
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    game.data.gameover = false;

    // stop music
    me.audio.stopTrack();
    // add background image
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('gameoverbg')),1);

    // back to menu button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      // constructor
      init:function (x, y){
        var settings = {}
        settings.image = "menu";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        //super constructor
        this._super(me.GUI_Object, "init", [480/2-70, 325, settings]);
        this.z = 4;
      },

      onClick:function (event){
        // go to the settings screen
        game.data.settings = false;
        me.state.change(me.state.MENU);
        return true;
      }
    })));

  },


  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.game.world.removeChild(this.HUD);
  }
});
