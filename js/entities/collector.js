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

    this.type = "collector";
    this.alwaysUpdate = true;

    this.body.gravity = false;
    this.forceReturn = false;
    this.requireShootKeyRelease = false;
    this.shotsFired = 0;
  },

  /* -----
  update the position of the collector
  ------ */
  update: function(dt) {
    // below could be used to set a fixed position
    // (for example next to main character when triggering shoot...)
    var player = game.mainPlayer;
    var shootkeyPressed = me.input.isKeyPressed('shoot');
    var maxX = h.xBound-(36)
    var maxY = h.yBound-(h.blockHeight*2)
    if (shootkeyPressed && !this.forceReturn && !this.requireShootKeyRelease){
      if(!player.shooting){
        this.pos.x = player.pos.x;
        this.pos.y = player.pos.y;
        this.updateBounds();
        this.renderable.setOpacity(1);
        this.shotsFired++;
        player.shooting = true;
      }
      // move the collector left-up or right-up
      // according to where player is moving
      if(player.movingRight){
        this.pos.x += 10;
        this.pos.y -= 10;
	this.flipX(true);
      } else {
        this.pos.x -= 10;
        this.pos.y -= 10;
	this.flipX(false);
      }
      // back home when we hit a wall
      if(this.pos.x >= maxX || this.pos.x < 0 || this.pos.y <= 0) this.forceReturn = true;

    } else {
      var collectorIsBack = false;
      if(player.movingRight){
        this.pos.x -= 30;
        this.pos.y += 30;
	this.flipX(false);
        if(this.pos.x < player.pos.x) collectorIsBack = true;
      } else {
        this.pos.x += 30;
        this.pos.y += 30;
	this.flipX(true);
        if(this.pos.x > player.pos.x) collectorIsBack = true;
      }
      if(collectorIsBack){
        this.renderable.setOpacity(0);
        this.forceReturn = false;
        if(shootkeyPressed) this.requireShootKeyRelease = true;
        player.shooting = false;
        collectorIsBack = false;
      }
    }
    if(this.pos.x < 0) this.pos.x = 0;
    if(this.pos.x > maxX) this.pos.x = maxX;
    if(this.pos.y < 0) this.pos.y = 0;
    if(this.pos.y > maxY) this.pos.y = maxY;
    this.updateBounds();

    // check & update the movement
    this.body.update(dt);

    // update animation
    this._super(me.Entity, 'update', [dt]);
    return true;
  },
});

// tweening to invisible before destroy...
// (new me.Tween(this.renderable))
// .to({
    // alpha : 0
// }, 500)
// .onComplete((function () {
    // me.game.world.removeChild(this);
// }).bind(this))
// .start();
