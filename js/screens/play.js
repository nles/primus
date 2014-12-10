game.PlayScreen = me.ScreenObject.extend({
  /**
  * action to perform on state change
  */
  onResetEvent: function() {
    // play music
    me.audio.playTrack(game.data.music);

    // load a level
    me.levelDirector.loadLevel("area01");

    // set the background
    var bg = new me.ImageLayer("BG", 480, 384, 'area01_bkg0', 100)
    me.game.world.addChild(bg, 2);

    // reset the score
    game.data.score = 0;

    // add our HUD to the game world
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    // // // //
    // // // //
    // MOBILE BUTTONS (code should be moved somewhere else...)
    // refactor:

    if (me.device.isMobile || navigator.isCocoonJS) {
      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y){
          var settings = {}
          settings.image = "dpad-left";
          settings.spritewidth = 105;
          settings.spriteheight = 89;
          settings.width = 105;
          this._super(me.GUI_Object, "init", [10, 290, settings]);
          this.z = 4;
          this.alpha = 0.3;
        },
        onClick: function(){
          me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
          me.input.triggerKeyEvent(me.input.KEY.X, false);
          me.input.triggerKeyEvent(me.input.KEY.C, false);
        },
        onRelease: function(){
          me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
        }
      })));

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y){
          var settings = {}
          settings.image = "dpad-right";
          settings.spritewidth = 105;
          settings.spriteheight = 89;
          settings.width = 105;
          this._super(me.GUI_Object, "init", [125, 290, settings]);
          this.z = 4;
          this.alpha = 0.3;
        },
        onClick: function(){
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
          me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
          me.input.triggerKeyEvent(me.input.KEY.X, false);
          me.input.triggerKeyEvent(me.input.KEY.C, false);
        },
        onRelease: function(){
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
        }
      })));

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y){
          var settings = {}
          settings.image = "button";
          settings.spritewidth = 98;
          settings.spriteheight = 98;
          settings.width = 105;
          this._super(me.GUI_Object, "init", [315, 290, settings]);
          this.z = 4;
          this.alpha = 0.3;
        },
        onClick: function(){
          me.input.triggerKeyEvent(me.input.KEY.X, true);
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
          me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
          me.input.triggerKeyEvent(me.input.KEY.C, false);
        },
        onRelease: function(){
          me.input.triggerKeyEvent(me.input.KEY.X, false);
        }
      })));

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y){
          var settings = {}
          settings.image = "button";
          settings.spritewidth = 98;
          settings.spriteheight = 98;
          settings.width = 105;
          this._super(me.GUI_Object, "init", [385, 230, settings]);
          this.z = 4;
          this.alpha = 0.3;
        },
        onClick: function(){
          me.input.triggerKeyEvent(me.input.KEY.C, true);
          me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
          me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
          me.input.triggerKeyEvent(me.input.KEY.X, false);
        },
        onRelease: function(){
          me.input.triggerKeyEvent(me.input.KEY.C, false);
        }
      })));
    }

    // // // //
    // // // //
    // START THE FALLERS

    var initFall = function(){
      if(!me.state.isPaused()){
        // remove unavailable tiles
        h.tilesToUseXs = new Array();
        for(i = 0; i < h.floorTileXs.length; i++){
          if(h.availableTiles[i] == 1) h.tilesToUseXs.push(h.floorTileXs[i])
        }
        // select a random floor tile x coordinate
        var tileIndex = h.random(0, h.tilesToUseXs.length-1);
        var newX = h.tilesToUseXs[tileIndex];
        // calculate index on the whole floor
        for(i=0;i<h.floorTileXs.length;i++)
          if(h.floorTileXs[i] == newX) var indexOnFloor = i;
        // determine if this one should be a fixer
        var floorCracked = false;
        for(i=0;i<h.brokenTiles.length;i++)
          if(h.brokenTiles[i] == 1) floorCracked = true;
        var fallerSettings = {};
        if(floorCracked){
          fixOneIfZero = h.random(0,5);
          fixAllIfZero = h.random(0,10);
          if(fixOneIfZero == 0) fallerSettings.fixone = true;
          if(fixAllIfZero == 0) fallerSettings.fixall = true;
        }
        // create a new faller accordingly
        var faller = new game.FallerEntity(newX-(24), -24, fallerSettings);
        faller.floorTileIndex = indexOnFloor;
        me.game.world.addChild(faller,5);
        // make tile unavailable (this reverts if the faller gets collected)
        h.availableTiles[indexOnFloor] = 0;
      }
    }

    // Build floor
    for(i = 0; i < h.xBound; i+= h.blockWidth){
      var tile = new me.Sprite (i, h.yBound-h.blockHeight, me.loader.getImage("floor_tile"));
      me.game.world.addChild(tile, 3);
    }


    // start randomly spawning fallers every 2 second
    var fall = function(){
      // speed up the game according to score
      initFall();
      // calculate next fall start
      var score = game.data.score
      // make speeding up incremental
      // peaks at 1500
      // decrements on steps of 50
      // goes like 2000, 1950, 1900...
      var nextCallAt = 0;
      if(score >= 0 && score < 100){ nextCallAt = 2000-(score*5); }
      // starts at 1500, peaks at 1000
      // decrements on steps of 5
      // goes like 1450, 1445, 1440...
      if(score >= 100 && score < 1000){ nextCallAt = 1500-(score/2) }
      // starts at 1000
      // decrements on steps of 2
      // goes like 900, 898, 896...
      if(score >= 1000){ nextCallAt = 1000-(score/5); }
      currentSpeed = nextCallAt;
      // cap the min speed at 300
      if(nextCallAt <= 300) nextCallAt = 300;
      // console.log("fall initiated with next coming after "+nextCallAt);
      h.fallTimer = setTimeout(fall,nextCallAt);
    };

    fall();
  },


  /**
  * action to perform when leaving this screen (state change)
  */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
  }
});
