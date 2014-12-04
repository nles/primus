game.TitleScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    // play music
    me.audio.playTrack("primusstartmenu");
    // add background image
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('background')),1);
    //add a start button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      // constructor
      init:function (x, y){
        var settings = {}
        settings.image = "button";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        // super constructor
        this._super(me.GUI_Object, "init", [480/2-70, 255, settings]);
        // define the object z order
        this.z = 4;
      },

      onClick:function (event){
        // start game
        me.state.change(me.state.PLAY);
        return true;
      }
    })));

  },


  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.audio.stopTrack(); // TODO
  }
});
