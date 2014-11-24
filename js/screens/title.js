game.TitleScreen = me.ScreenObject.extend({
  /**
  *  action to perform on state change
  */
  onResetEvent: function() {

    // add background image (doesn't currently exist)
    me.game.world.addChild(
            new me.Sprite (
                0,0,
                me.loader.getImage('background')
            ),
            1
        );
    //add a start button
    me.game.world.addChild(new (me.GUI_Object.extend ({
	// constructor
	init:function (x, y){
    	    var settings = {}
      	    settings.image = "button";
      	    settings.spritewidth = 100;
      	    settings.spriteheight = 50;
      	    // super constructor
      	    this._super(me.GUI_Object, "init", [480/2-50, 380/2-25, settings]);
      	    // define the object z order
      	    this.z = 4;
   	},

   	// output something in the console
   	// when the object is clicked
   	onClick:function (event){
      	    console.log("clicked!");
	    // start game
      	    me.state.change(me.state.PLAY);
      	    return true;
   	}
  })));

  },


  /**
  * action to perform when leaving this screen (state change)
  */
  onDestroyEvent: function() {
    ; // TODO
  }
});
