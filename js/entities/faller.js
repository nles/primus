/*-------------------
  a faller entity
  -------------------- */
game.FallerEntity = me.Entity.extend({
  /* -----
     constructor
     ------ */
  init: function(x, y, settings) {
    this.fixall = false;
    this.fixone = false;

    if(settings.fixall){
      settings.image = "faller_fixall";
      this.fixall = true;
    } else if(settings.fixone){
      settings.image = "faller_fixone";
      this.fixone = true;
    } else {
      settings.image = "faller";
    }

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
    //
    this.floorTileIndex = 0;
    this.collected = false;

    // add shape to the entitity for collisions
    this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
  },

  update: function(dt) {
    // destroy object to reduce memory use, if it falls too far
    if(this.pos.y > 500) me.game.world.removeChild(this);

    this.body.vel.y = 0.5;

    // check & update movement
    this.body.update(dt);

    // break the floor when we hit it
    if(!this.body.falling){
      var fallSpotX = this.pos.x
      var horizontalTileNum = fallSpotX/h.blockWidth
      //play the cracking sound effect
      me.audio.play("cracking");
      var crack = new game.FloorCrackEntity(fallSpotX, (h.blockHeight*h.verticalBlocks)-(h.blockHeight*2), {});
      h.floorCracks[horizontalTileNum] = crack;
      me.game.world.addChild(crack,5);
      // mark tile broken
      h.brokenTiles[horizontalTileNum] = 1
      // add new solid tile from below current
      h.blockMovementOnFloor(horizontalTileNum);
      // remove from game
      me.game.world.removeChild(this);
    }

    // check collisions
    var res = me.game.world.collide(this);
    if (res) {
      // remove on collision
      // me.game.world.removeChild(this);
      // Player dying from a faller hit
      if (res.obj.type == "player" && !this.collected) {
        h.resetRound();
        me.audio.stopTrack();
        me.audio.play("death");
        me.state.change(me.state.GAMEOVER);
      }
      // Player collecting the faller
      if (res.obj.type == "collector" && !this.collected) {
        this.collected = true;
        res.obj.forceReturn = true;
        // remove when hit with a visible collector
        if(res.obj.renderable.getOpacity() != 0){
          // play collection sound
          me.audio.play("shootingobjects");
          // add score on each catch depending on height
          if(this.pos.y < 60) game.data.score += 120;
          else if (this.pos.y < 120) game.data.score += 40;
          else if (this.pos.y < 200) game.data.score += 20;
          else game.data.score += 10;
          // add to score on each catch
          //game.data.score = this.pos.y;
          // make floor available if we collect the faller
          h.availableTiles[this.floorTileIndex] = 1;
          // fix a broken floor tile closest to the player
          if(this.fixone){
            h.fixClosestFloorTile();
          }
          if(this.fixall){
            for(var i=0;i<h.brokenTiles.length;i++){
              var brokenCount = 0;
              for(i=0;i<h.brokenTiles.length;i++)
              if(h.brokenTiles[i] == 1) brokenCount++;
              var fixedCount = 0;
              var fixerInterval = setInterval(function(){
                h.fixClosestFloorTile();
                fixedCount++;
                if(fixedCount >= brokenCount) clearInterval(fixerInterval)
              },200);
            }
          }

          me.game.world.removeChild(this);
        }
      }
    }

    // update animation
    this._super(me.Entity, 'update', [dt]);
    return true;

    // else inform the engine we did not perform
    // any update (e.g. position, animation)
    return false;
  }

});
