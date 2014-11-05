/*-------------------
 a faller entity
-------------------- */
game.FallerEntity = me.Entity.extend({
  /* -----
  constructor
  ------ */
  init: function(x, y, settings) {
    // here instead of tiled
    settings.image = "faller";
    settings.width = h.blockWidth;
    settings.height = h.blockHeight;
    settings.spritewidth = h.blockWidth;
    settings.spriteheight = h.blockHeight;
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(3, 15);
    // update even when outside viewport
    this.alwaysUpdate = true;

    // add shape to the entitity for collisions
    this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
  },

  update: function(dt) {
    this.body.vel.y = 0.5;

    // check & update movement
    this.body.update(dt);

    // break the floor when we hit it
    if(!this.body.falling){
      var fallSpotX = this.pos.x
      var horizontalTileNum = fallSpotX/h.blockWidth
      var crack = new game.FloorCrackEntity(fallSpotX, (h.blockHeight*h.verticalBlocks)-(h.blockHeight*2), {});
      me.game.world.addChild(crack,5);

      // add new solid tile from below current
      var collisionLayer = me.game.currentLevel.getLayerByName("collision");
      collisionLayer.layerData[horizontalTileNum][23] = collisionLayer.layerData[horizontalTileNum][24]
      collisionLayer.layerData[horizontalTileNum][24] = null

      me.game.world.removeChild(this);
    }

    // check collisions
    var res = me.game.world.collide(this);
    if (res) {
      if (res.obj.type == "collector") {
        // add points depending on height when colliding with the collector
	if(this.pos.y < 300) game.data.score += 1200;
	else if (this.pos.y < 380) game.data.score += 400;
	else if (this.pos.y < 460) game.data.score += 200;
	else game.data.score += 100;
	}
      // remove on collision
      me.game.world.removeChild(this);
    }

    // update animation if necessary
    if (this.body.vel.x!=0 || this.body.vel.y!=0) {
      // update object animation
      this._super(me.Entity, 'update', [dt]);
      return true;
    }

    // else inform the engine we did not perform
    // any update (e.g. position, animation)
    return false;
  },

});
