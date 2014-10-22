var helpers = {
  random: function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  floorgrid: function(){
    floor = new Array();
    for(var i = 24; i <= 20*24; i+= 24){
      floor.push(i);
    }
    return floor;
  }
}
