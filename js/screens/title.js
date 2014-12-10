game.TitleScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    game.data.settings === false;
    // play music
    if(me.audio.getCurrentTrack() !== "primusstartmenu"){
      me.audio.playTrack("primusstartmenu");
    }

    // add background image
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('background')),1);

    // settings button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      // constructor
      init:function (x, y){
        var settings = {}
        settings.image = "settings";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        //super constructor
        this._super(me.GUI_Object, "init", [480/2-70, 325, settings]);
        this.z = 4;
      },

      onClick:function (event){
        // go to the settings screen
        game.data.settings = true;
        me.state.change(me.state.SETTINGS);
        return true;
      }
    })));

    // add a start button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      // constructor
      init:function (x, y){
        var settings = {}
        settings.image = "start";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        // super constructor
        this._super(me.GUI_Object, "init", [480/2-70, 275, settings]);
        this.z = 4;
      },

      onClick:function (event){
        // start game
        me.state.change(me.state.PLAY);
        me.audio.stopTrack();
        return true;
      }
    })));

  },

  // action to perform when leaving this screen (state change)
  onDestroyEvent: function() {
    if(me.audio.getCurrentTrack() !== "primusstartmenu") { me.audio.stopTrack(); }
  }
});
