/*-------------------
 a player entity
-------------------- */
game.PlayerEntity = me.Entity.extend({
  /* -----
  constructor
  ------ */
  init: function(x, y, settings) {
    settings.width = h.blockWidth;
    settings.height = 96;
    settings.spritewidth = 96;
    settings.spriteheight = 96;
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(3, 15);
    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    this.allowMovingLeft = true
    this.allowMovingRight = true
    this.movingRight = false;
    this.movingLeft = false;
    this.shooting = false;
  },

  /* -----
  update the players position
  ------ */
  update: function(dt) {
    var _t = this
    // check collisions
    var res = me.game.world.collide(this);
    var inCrackFromLeft = false;
    var inCrackFromRight = false;
    var hasCollector = false;

    this.body.vel.x = 0;
    var leftPressed = me.input.isKeyPressed('left');
    var rightPressed = me.input.isKeyPressed('right');
    if(leftPressed && !rightPressed && this.allowMovingLeft) {
      this.movingLeft = true;
      this.movingRight = false;
      // flip the sprite on horizontal axis
      this.flipX(true);
      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
    }
    if (rightPressed && !leftPressed && this.allowMovingRight) {
      this.movingLeft = false
      this.movingRight = true
      // unflip the sprite
      this.flipX(false);
      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;
    }

    // jumping disabled
    /*
    if (me.input.isKeyPressed('jump')) {
      // make sure we are not already jumping or falling
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
      }
    }
    */

    if(this.shooting) {
      this.allowMovingRight = false;
      this.allowMovingLeft = false;
    } else {
      this.allowMovingRight = true;
      this.allowMovingLeft = true;
    }

    // check & update player movement
    this.body.update(dt);

    // update animation if necessary
    if (this.body.vel.x!=0 || this.body.vel.y!=0) {
      // update object animation
      this._super(me.Entity, 'update', [dt]);
      return true;
    }

    // else inform the engine we did not perform
    // any update (e.g. position, animation)
    return false;
  }
});
