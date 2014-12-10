game.SettingScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    // play music
    if(me.audio.getCurrentTrack() !== "primusstartmenu"){
      me.audio.stopTrack();
      me.audio.playTrack("primusstartmenu");
    }
    // add background image
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('background')),1);

    // add our HUD to the game world
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    // play music button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      // constructor
      init:function (x, y){
        var settings = {}
        settings.image = "play";
        settings.spritewidth = 71;
        settings.spriteheight = 30;
        // super constructor
        this._super(me.GUI_Object, "init", [480/2+120, 295, settings]);
        this.z = 4;
      },

      onClick:function (event){
        // reset settings
        me.audio.stopTrack();
        me.audio.playTrack(game.data.music);
        // go to menu
        return true;
      }
    })));

    // cancel settings button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "cancel";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        // super constructor
        this._super(me.GUI_Object, "init", [480/2-150, 340, settings]);
        this.z = 4;
        this.oldMusic = game.data.music;
        this.oldVolume = game.data.volume;
      },

      onClick:function (event){
        // reset settings
        me.audio.stopTrack();
        game.data.music = this.oldMusic;
        me.audio.setVolume(this.oldVolume);
        game.data.volume = this.oldVolume;
        // go to menu
        me.state.change(me.state.MENU);
        return true;
      }
    })));

    // confirm settings button
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "confirm";
        settings.spritewidth = 140;
        settings.spriteheight = 30;
        // super constructor
        this._super(me.GUI_Object, "init", [480/2+10, 340, settings]);
        this.z = 4;
      },

      onClick:function (event){
        // go to menu
        me.state.change(me.state.MENU);
        return true;
      }
    })));

    me.game.world.addChild(new (me.GUI_Object.extend ({
      init: function(x, y) {
        this._super(me.Renderable, 'init', [120, 255, 10, 10]);
        this.font = new me.BitmapFont("font", 16);
        this.font.set("right");
        this.floating = true;
        this.z = 4;
      },
      draw : function (context) {
        this.font.draw (context, "VOLUME", 120, 255);
      }
    })));

    me.game.world.addChild(new (me.GUI_Object.extend ({
      init: function(x, y) {
        this._super(me.Renderable, 'init', [120, 295, 10, 10]);
        this.font = new me.BitmapFont("font", 16);
        this.font.set("right");
        this.floating = true;
        this.z = 4;
      },
      draw : function (context) {
        this.font.draw (context, "MUSIC", 120, 295);
      }
    })));

    // reduce volume by 1
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "arrow";
        settings.spritewidth = 16;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2-60-16, 255, settings]);
        this.z = 4;
        this.flipX(true);
      },

      onClick:function (event){
        if(game.data.volume >= 0.01){
          game.data.volume -= 0.01;
          me.audio.setVolume(game.data.volume);
        } else { 
          game.data.volume = 0;
          me.audio.setVolume(game.data.volume);
        }
      }
    })));

    // reduce volume by 10
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "doublearrow";
        settings.spritewidth = 23;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2-90-23, 255, settings]);
        this.z = 4;
        this.flipX(true);
      },

      onClick:function (event){
        if(game.data.volume >= 0.1){
          game.data.volume -= 0.1;
          me.audio.setVolume(game.data.volume);
        } else { 
          game.data.volume = 0;
          me.audio.setVolume(game.data.volume);
        }
      }
    })));

    // increase volume by 1
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "arrow";
        settings.spritewidth = 16;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2+60, 255, settings]);
        this.z = 4;
        this.flipX(false);
      },

      onClick:function (event){
        if(game.data.volume <= 0.99){
          game.data.volume += 0.01;
          me.audio.setVolume(game.data.volume);
        } else { 
          game.data.volume = 1;
          me.audio.setVolume(game.data.volume);
        }
      }
    })));

    // reduce volume by 10
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "doublearrow";
        settings.spritewidth = 23;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2+90, 255, settings]);
        this.z = 4;
        this.flipX(false);
      },

      onClick:function (event){
        if(game.data.volume <= 0.9){
          game.data.volume += 0.1;
          me.audio.setVolume(game.data.volume);
        } else {
          game.data.volume = 1;
          me.audio.setVolume(game.data.volume);
        }
      }
    })));

    // change song left
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "arrow";
        settings.spritewidth = 16;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2-90-16, 295, settings]);
        this.z = 4;
        this.flipX(true);
      },

      onClick:function (event){
        if(game.data.music === "primus1"){game.data.music = "primusstartmenu";}
        else if(game.data.music === "primus2"){game.data.music = "primus1";}
        else if(game.data.music === "primusstartmenu"){game.data.music = "primus2";}
      }
    })));

    // change song right
    me.game.world.addChild(new (me.GUI_Object.extend ({
      init:function (x, y){
        var settings = {}
        settings.image = "arrow";
        settings.spritewidth = 16;
        settings.spriteheight = 28;
        this._super(me.GUI_Object, "init", [480/2+90, 295, settings]);
        this.z = 4;
        this.flipX(false);
      },

      onClick:function (event){
        if(game.data.music === "primus1"){game.data.music = "primus2";}
        else if(game.data.music === "primus2"){game.data.music = "primusstartmenu";}
        else if(game.data.music === "primusstartmenu"){game.data.music = "primus1";}

      }
    })));
  },


  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    game.data.settings = false;

    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
    if(me.audio.getCurrentTrack() === "primusstartmenu"){}
    else {me.audio.stopTrack();} 
  }
});
