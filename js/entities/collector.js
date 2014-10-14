/*-------------------
 a collector entity
 (thing that collects the stuff falling down)
-------------------- */
game.CollectorEntity = me.Entity.extend({

  /* -----
  constructor
  ------ */
  init: function(x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);

    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(5, 5);

    this.alwaysUpdate = true;
  },

  /* -----
  update the position of the collector
  ------ */
  update: function(dt) {
    if (me.input.isKeyPressed('shoot')) {
      // move the collector left-up or right-up
      // according to where player is moving
      if(game.mainPlayer.movingRight){
        // when moving right
        this.body.vel.x += this.body.accel.x
        this.body.vel.y -= this.body.accel.y
      } else {
        // when moving left
        this.body.vel.x -= this.body.accel.x
        this.body.vel.y -= this.body.accel.y
      }
    } else {
      // return the collector to follow the player
      clctrX = this.pos.x // collector x
      playrX = game.mainPlayer.pos.x // player x
      if(playrX > clctrX) this.body.vel.x += 1
      if(playrX < clctrX) this.body.vel.x -= 1
    }

    // check & update the movement
    this.body.update(dt);
    // update animation
    this._super(me.Entity, 'update', [dt]);
    return true;
  }
});
