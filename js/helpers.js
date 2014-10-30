h = {
  blockWidth: 24,
  blockHeight: 24,
  verticalBlocks: 25,
  horizontalBlocks: 20
}

h['yBound'] = h.verticalBlocks * h.blockHeight,
h['xBound'] = h.horizontalBlocks * h.blockWidth,

h['random'] = function(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

h['floorgrid'] = function(){
  floor = new Array();
  for(var i = h.blockWidth; i <= h.horizontalBlocks*h.blockWidth; i+= h.blockWidth){
    floor.push(i);
  }
  return floor;
}
