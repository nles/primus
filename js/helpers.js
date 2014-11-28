h = {
  blockWidth: 24,
  blockHeight: 24,
  verticalBlocks: 16,
  horizontalBlocks: 20
}

h['yBound'] = h.verticalBlocks * h.blockHeight,
h['xBound'] = h.horizontalBlocks * h.blockWidth,


h['initFloor'] = function(){
  floor = new Array();
  for(var i = h.blockWidth; i <= h.horizontalBlocks*h.blockWidth; i+= h.blockWidth){
    floor.push(i);
  }
  return floor;
}

// x coordinates of all floortiles
h['floorTileXs'] = new Array();
h['floorTileXs'] = h['initFloor']();

// x coordinates of available floortiles
h['tilesToUseXs'] = new Array();

// ones and zeros depending on whether the floor tile is available (can be assigned a faller) or not
h['availableTiles'] = new Array();
for(i=0;i<h['floorTileXs'].length;i++) h['availableTiles'].push(1);

// broken tiles the same way as before (these are really broken)
h['brokenTiles'] = new Array();
for(i=0;i<h['floorTileXs'].length;i++) h['brokenTiles'].push(0);

// reference to crack entities by tile number
h['floorCracks'] = new Object();

h['blockMovementOnFloor'] = function(tilenum){
  var collisionLayer = me.game.currentLevel.getLayerByName("collision");
  lastVerticalBlockIndex = h.verticalBlocks-1
  collisionLayer.layerData[tilenum][lastVerticalBlockIndex-1] = collisionLayer.layerData[tilenum][lastVerticalBlockIndex];
  collisionLayer.layerData[tilenum][lastVerticalBlockIndex] = null;
}

h['allowMovementOnFloor'] = function(tilenum){
  var collisionLayer = me.game.currentLevel.getLayerByName("collision");
  lastVerticalBlockIndex = h.verticalBlocks-1
  collisionLayer.layerData[tilenum][lastVerticalBlockIndex] = collisionLayer.layerData[tilenum][lastVerticalBlockIndex-1];
  collisionLayer.layerData[tilenum][lastVerticalBlockIndex-1] = null;
}

h['fixClosestFloorTile'] = function(){
  // get the closest broken floor tile
  var playerX = game.mainPlayer.pos.x
  var brokenXs = new Array();
  for(i = 0; i < h.brokenTiles.length; i++){
    if(h.brokenTiles[i] == 1){
      brokenXs.push(h.floorTileXs[i])
    }
  }
  var closest = h.closest(brokenXs,playerX)
  if(closest){
    var closestFloorTileNum = -1
    for(i=0;i<h.floorTileXs.length;i++)
      if(h.floorTileXs[i] === closest)
        closestFloorTileNum = i;

    var closestCrack = h.floorCracks[closestFloorTileNum];
    me.game.world.removeChild(closestCrack);
    // allow moving again
    h.allowMovementOnFloor(closestFloorTileNum);
    // mark tile unbroken && available
    h.brokenTiles[closestFloorTileNum] = 0;
    h.availableTiles[closestFloorTileNum] = 1;
    console.log("FIXED: "+closestFloorTileNum);
  }
}


h['random'] = function(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

h['closest'] = function(arr, num){
  if(arr.length == 0) return false;
  var curr = arr[0];
  var diff = Math.abs (num - curr);
  for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (num - arr[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = arr[val];
      }
  }
  return curr;
}
