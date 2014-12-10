/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
  init: function() {
    // call the constructor
    this._super(me.Container, 'init');
    // persistent across level change
    this.isPersistent = true;
    // non collidable
    this.collidable = false;
    // make sure our object is always draw first
    this.z = Infinity;
    // give a name
    this.name = "HUD";
    // add our child score object
    if(game.data.settings === true){
      this.addChild(new game.HUD.SettingsItem(0, 0));
    } else if(game.data.gameover === false){
      this.addChild(new game.HUD.ScoreItem(0, 0));
    } else {
      this.addChild(new game.HUD.GameOverItem(0, 0));
    }
  }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
  /**
   * constructor
   */
  init: function(x, y) {
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // add font
    this.font = new me.BitmapFont("font", 16);
    this.font.set("right");
    // local copy of the global score
    this.score = -1;
    // make sure we use screen coordinates
    this.floating = true;
  },

  /**
   * update function
   */
  update : function () {
    // we don't do anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw : function (context) {
    this.font.draw (context, game.data.score, 470, 10);
  }
});

game.HUD.SettingsItem = me.Renderable.extend({
  // constructor
  init: function(x, y) {
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // add font
    this.font = new me.BitmapFont("font", 16);
    this.font.set("center");
    // local copy of the global score
    this.volume = game.data.volume;
    // make sure we use screen coordinates
    this.floating = true;
  },

  // update function
  update : function () {
    // we don't do anything fancy here, so just
    // return true if the volume has been updated
    if (this.volume !== game.data.volume) {
      this.volume = game.data.volume;
      game.data.volume;
      return true;
    }
    return false;
  },

  // draw the score
  draw : function (context) {
    this.font.draw (context, Math.round(game.data.volume*100), 240, 253);
    if(game.data.music === "primus1"){
      this.font.draw (context, "PRIMUS1", 240, 293);
    } else if(game.data.music === "primus2"){
      this.font.draw (context, "PRIMUS2", 240, 293);
    } else if(game.data.music === "primusstartmenu"){
      this.font.draw (context, "PRIMUSMENU", 240, 293);
    }
  }
});

game.HUD.GameOverItem = me.Renderable.extend({
  init: function(x, y) {
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    this.font = new me.BitmapFont("font", 16);
    this.font.set("center");
    this.floating = true;
  },

  update : function () {
    if (this.volume !== game.data.volume) {
      this.volume = game.data.volume;
      game.data.volume;
      return true;
    }
    return false;
  },

  draw : function (context) {
    this.font.draw (context, "GAME OVER", 240, 384/2-100);
    this.font.draw (context, "FINAL SCORE", 240, 384/2-40);
    this.font.draw (context, game.data.score, 240, 384/2);
  }
});
