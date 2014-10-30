/*-------------------
 a collector entity
 (thing that collects the stuff falling down)
-------------------- */
game.FloorCrackEntity = me.Entity.extend({
  /* -----
  constructor
  ------ */
  init: function(x, y, settings) {
    // here instead of tiled
    settings.image = "floor_crack";
    settings.width = h.blockWidth;
    settings.height = h.blockHeight*2;
    settings.spritewidth = h.blockWidth;
    settings.spriteheight = h.blockHeight*2;
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
    // add shape to the entitity for collisions
    this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));

    this.type = "floor_crack";
    this.body.gravity = false;

    this.body.onCollision = function(res){
      if(res.a.name == "mainplayer"){
      }
    }
  }

});
