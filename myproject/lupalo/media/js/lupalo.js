var WIDTH; 					        // Width of the canvas
var HEIGHT; 					    // Height of the canvas
var CANVAS_RIGHT = 500;
var CANVAS_LEFT = 9;
var CANVAS_TOP = 9;
var CANVAS_BOTTOM = 500;
var INTERVAL = 10; 				    // Interval between redrawing of canvas (ms)
var BOARD_TOP  = 320;
var BOARD_LEFT = 275;
var WAITTIME   = 50000;

//var TILE_RADIUS = 20;                // The radius of the rounded edges of the tiles
var TILE_RADIUS = 16;                // The radius of the rounded edges of the tiles
var TILE_WIDTH  = TILE_RADIUS;               // The width of each tile
var TILE_HEIGHT = TILE_RADIUS;               // The height of each tile
var TILE_TOTAL_WIDTH;               // The total width of each tile
var TILE_TOTAL_HEIGHT;              // The total height of each tile

var ROTATETILE_X  = TILE_RADIUS;
var ROTATETILE_Y  = 0.5*ROTATETILE_X;
var ROTATE_RADIUS = TILE_RADIUS;

var FIXTILE_X  = null;
var FIXTILE_Y  = null;
var FIX_RADIUS = 0.75*TILE_RADIUS;


// var SCORE_FILL_ON  = '#00FF00';
// var SCORE_FILL_OFF = '#FF0000';
var SCORE_FILL_ON  = '#000000';
var SCORE_FILL_OFF = '#000000';
var TILE_FILL = '#F8D9A3';          // The background color of each tile
// var TILE_BG_FILL = ['#FFFFFF','#000000','#AA0000','#0000DD']; // The background color of selected tiles
// var TILE_FG_FILL = ['#FFFFFF','#000000','#AA0000','#0000DD']; // The foreground color of tiles

//var TILE_BG_FILL = ['#B300FF','#00B881','#CCFF00','#CC3300']; // The foreground color of tiles
//var TILE_FG_FILL = ['#B300FF','#00B881','#CCFF00','#CC3300']; // The foreground color of tiles

var TILE_BG_FILL = ['#FFFFFF','#00B881','#CCFF00','#CC3300']; // The foreground color of tiles
var TILE_FG_FILL = ['#FFFFFF','#00B881','#CCFF00','#CC3300']; // The foreground color of tiles


//var TILE_BG_FILL = ['rgba(255,255,255,0.1)','rgba(20,120,70,0.1)','rgba(180,70,35,0.1)','rgba(120,20,160,0.1)']
//var TILE_FG_FILL = ['rgba(255,255,255,0.9)','rgba(20,120,70,0.9)','rgba(180,70,35,0.9)','rgba(120,20,160,0.9)']

var TILE_STROKE = '#000000';        // The border color of each tile
//var TILE_SELECTED_BG_FILL = ['#FFFFFF','#000000','#AA0000','#0000DD']; // The background color of selected tiles
var TILE_SELECTED_BG_FILL = ['#B300FF','#00B881','#CCFF00','#CC3300']; // The foreground color of tiles
var TILE_SELECTED_FILL = '#00FF00'; // The background color of selected tiles

var TILE_SELECTED_BG_FILL = ['rgb(255,255,255)','rgb(20,120,70)','rgb(180,70,35)','rgb(120,20,160)']
var TILE_SELECTED_FILL = ['rgb(255,255,255)','rgb(20,120,70)','rgb(180,70,35)','rgb(120,20,160)']

var TILE_PLACED_FILL = '#AAFFAA';   // The background color of selected tiles
// var TILE_PLACED_BG_FILL = ['#EEEEEE','#AAAAAA','#FF8888','#8888DD']; 
var TILE_PLACED_BG_FILL = ['#000000','#000000','#000000','#000000']; 
//var TILE_PLACED_BG_FILL = ['rgba(255,255,255,0.1)','rgba(20,120,70,0.9)','rgba(180,70,35,0.9)','rgba(120,20,160,0.1)']

var CELL_BG_FILL       = '#F2F0F7';   // The background color of selected cells
var CELL_BG_FILL       = 'rgba( 50,50,50, 0.1 )';
var CELL_SELECTED_FILL = '#9E9AC8';   // The background color of non-selected cells
var CELL_INFEAS_FILL   = 'rgba(  50,  50,  50, 0.6 )';   // The background color of infeasible cells
var CELL_FEAS_FILL     = 'rgba(  50,  50,  50, 0.1 )';   // The background color of infeasible cells

var NOTCONFIRMED    = -1;

var STATUS_FEAS     = 0;
var STATUS_INFEAS   = 1;
var STATUS_SELECTED = 2;


// The background color of selected tiles
var TILE_TEXT_FILL = '#000000';     // The color of the text on the tile
var SQRT3 = Math.sqrt(3.0);

var TILE_INNERRADIUS = TILE_RADIUS * SQRT3/2.0;                // The radius of the rounded edges of the tiles

var canvas;                         // Reference to the canvas element
var ctx;                            // Reference to the context used for drawing
var isDragging = false;             // Indicating whether or not the user is dragging a tile
var isRotating = false;             // Indicating whether or not the user is rotating a tile
var fixTile    = false;
var rotateTile = false;

var ROTATE = 1;
var FIX    = 2;

var mouseX; 					    // Current mouse X coordinate
var mouseY;                         // Current mouse Y coordinate
var lastMouseX = 0;                 // The last seen mouse X coordinate
var lastMouseY = 0;                 // the last seen mouse Y coordinate
var changeInX;                      // The difference between the last and current mouse X coordinate
var changeInY;                      // The difference between the last and current mouse Y coordinate

var redrawCanvas = false;           // Indicates whether or not the canvas needs to be redrawn	
var wait_before_recieve = false;   


var plyrs = null;                  // Player information
var brd = null;                     // Board status
var moveRecord = [];		    // Stores moves by all players

var CELL_RADIUS = 30;               // Radius of cell on board for moving tiles 
//var cellInBoard = [];
//var ncells = cellInBoard.length;
var cells = [];
var offX;                            // Indicates that the mouse has moved off the canvas
									// on the x axis
var offY;                            // Indicates that the mouse has moved off the canvas
									// on the y axis

var statusMessage;
var statusMessage1;

var GAMEID;
var PLAYERID;

//var playerNames   = [];
//var playerTurns   = [];
//var plyrs.playersInGame = 2;		    // Players in game SET ON INITIALIZATION
var neededScore   = [240,120,90,60];     // this is different for different numbers of players 
var TILE_POINTS   = 3;
var MAXBASENUMBER = 7;		    // maximum number of base arcs in score calculation
var playerColors  = [[0,1],[2,3]];  // Colors associated with players
var bgColors      = {0:[1,2],1:[0,3],2:[3,1],3:[2,0]};
var tilesInPlay   = [[],[]];        // Stores all tiles currently on the canvas
var tiles         = [];        // Stores all tiles inclusing those belonging to other players. 	

var turnsInHand;

function aob(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}


function updateFeasTilesAndCells( cell, tileList ){

	// generate a list of cells surrounding cell in two rings
	var cellList = [];
	for( var i = 0; i < 6; i++ ){
		if ( cell.adj[i] != null ){
		var ncell = brd.cellLookup[ cell.adj[i] ];

			cellList.push( ncell );
	
			if(  ncell.adj[(i+5)%6] != null ){
				var scell = brd.cellLookup[ ncell.adj[(i+5)%6] ];
				cellList.push(scell);
			}

			if (  ncell.adj[i] != null ){
				var scell = brd.cellLookup[ ncell.adj[i] ];			
				cellList.push(scell);
			}

			if ( ncell.adj[(i+1)%6] != null ){
				var scell = brd.cellLookup[ ncell.adj[(i+1)%6] ];	
				cellList.push(scell);
			}

		}
	}

	console.log( 'cells to check in update' );
	for ( var i = 0; i < cellList.length; i++ ){
		console.log( cellList[i] );
	}

	// test feasiblibity in these cells
	for ( var icell = 0; icell < cellList.length; icell++ ){
		var tcell  = cellList[icell];
		for ( var i = 0; i < 4; i++ ){
			for ( var itile = 0; itile < tileList[i].length; itile++ ){
				var tile     = tileList[i][itile];
				var idx_cell = $.inArray( tcell, tile.feasibleCells );
				var idx_tile = $.inArray( tile,  tcell.feasibleTiles );
				if ( (idx_cell != -1) && ( idx_tile != -1 ) ){ 
					if ( rotateToNextFeasible(tcell,tile,false) == false ){
						tile.feasibleCells.splice(idx_cell,1);
  						tcell.feasibleTiles.splice(idx_tile,1);
						tile.infeasibleCells.push( tcell );
  						tcell.infeasibleTiles.push( tile );
					}
				}
			}
		}
	}

}



function initFeasTilesAndCells( tileList, cellList ){



	for ( var i = 0; i < 4; i++ ){
		for ( var itile = 0; itile < tileList[i].length; itile++ ){
			var tile = tileList[i][itile];
			for ( var icell = 0; icell < cellList.length; icell++ ){
				var cell = cellList[icell]; 
				if ( checktile( brd, cell, tile ) == true  || rotateToNextFeasible(cell,tile,false) == true ){
					tile.feasibleCells.push(cell);
					cell.feasibleTiles.push(tile);
				}else{
					tile.infeasibleCells.push(cell);
					cell.infeasibleTiles.push(tile);
				}	
			}
		}
	}
}




// Object to represent each tile in the game
function HexTile(id,fg,bg,arc0,arc1,rot) {
	this.id        = id;
	this.bg        = bg;
	this.fg        = fg;
	this.x         = 0;
	this.y         = 0;
	this.xo        = 0;
	this.yo        = 0;
	this.ix        = null;
	this.iy        = null;
	this.rotation  = rot;   // rotation relative to the original orientation
	this.value     = 0;
	this.selected  = false; // tile selected 
	this.placed    = false; // tile set

	this.feasibleCells = [];
	this.infeasibleCells = [];
 
	this.arcList   = [];     // current arc list
	this.arcListOrig  = []; // original arc list
	// this.arcList  = [arc0,arc1];
	this.edge     = [null,null,null,null,null,null];   // current edge list
	
	if ( arc0 != null ){
		ix  = [ (6 + arc0[0]+rot)%6, (6 + arc0[1]+rot)%6 ];
		ixs = [ Math.min(ix[0],ix[1]), Math.max(ix[0],ix[1]) ];
		this.arcList.push( ixs );
		this.arcListOrig.push( ixs );
		this.edge[ixs[0]] = ixs[1];
		this.edge[ixs[1]] = ixs[0];
	}

	if ( arc1 != null ){
		ix =  [ (6 + arc1[0]+rot)%6, (6 + arc1[1]+rot)%6 ];
		ixs = [ Math.min(ix[0],ix[1]), Math.max(ix[0],ix[1]) ];
		this.arcList.push( ixs );
		this.arcListOrig.push( ixs );
		this.edge[ixs[0]] = ixs[1];
		this.edge[ixs[1]] = ixs[0];
	}

}


// Object to represent move 
function Move(id,player,tile,cell,rot) {
	this.id       = id;
	this.player   = player;
	this.tile     = tile;
	this.rotation = rot;
	this.cell     = cell;
}


// Object to represent each cell in the game
function Cell() {
	this.id = -1;
	this.x  =  0;
	this.y  =  0;
	this.ix =  0;
	this.iy =  0;
	this.occupied = null;
	this.selected = false;
	// define neighbours
	this.adj = [null,null,null,null,null,null];
	this.feasibleTiles = [];
	this.infeasibleTiles = [];
	// this.up        = null;
	// this.upright   = null;
	// this.downright = null; 
	// this.down      = null;
	// this.downleft  = null;
	// this.upleft    = null;
}

// TODO complete
function score(brd){

	console.log( '=================>>>>>>>>>><<<<<<<<<<==================' );
	console.log( '=================>>>>>>>>>><<<<<<<<<<==================' );
	console.log( '=================>>>>>>>>>><<<<<<<<<<==================' );
	
	var newLoops = 0;	
	var arcsToBeTested = {};

	console.log( "score function" );
	// compile list of all arcs on board
	var tilesdown = [0,0,0,0];
	
	for ( var k = 0; k < brd.cellInBoard.length; k++ ){
		
		var cell = brd.cellInBoard[k];
		// console.log( 'cell: %d %d', cell.ix, cell.iy );

		if ( cell.occupied != null ){
			var tile = cell.occupied;
			tilesdown[tile.fg] += 1;

			console.log( 'tile: %d %d', tile.id, cell.id );
			var tmp = {};
			arcsToBeTested[tile.id] = tmp;
			for ( var i = 0; i < tile.arcList.length; i++ ){
				var arc = tile.arcList[i]; 
				arcsToBeTested[tile.id][i] = true;

				if ( tile.edge[arc[0]] != arc[1] ){
					// alert( "arc err" +  pos + ' ' + arc[0] + ' ' + tile.edge[arc[0]], arc[1] );
					console.log( "arc err: %d %d %d ", arc[0], tile.edge[arc[0]], arc[1] );
				} else {
					console.log( "arc ok: %d %d %d ", arc[0], tile.edge[arc[0]], arc[1] );
				}	
			}
		}
	}

	// score tiles on board 
	brd.score = [0,0,0,0];
	for (var k = 0; k < plyrs.playersInGame; k++ ){
		for (var j = 0; j < playerColors[k].length; j++ ) { 
			brd.score[k] += TILE_POINTS * tilesdown[ playerColors[k][j] ];
		}	
	}


	var keys  = Object.keys( arcsToBeTested );

	console.log( "number of tiles on board: %d", keys.length );

	for ( var i = 0; i < keys.length; i++ ){
	
		var tile = brd.tileLookup[keys[i]];
		console.log( 'cell ix %d', tile.ix );
		var cell = brd.cellLookup[ [tile.ix,tile.iy] ];
		console.log( '-> %d', i );
		console.log( 'looking up tile  %d %d', i,      keys[i] );
		console.log( 'tile position    %d %d', tile.x, tile.y  );
		console.log( 'cell position    %d %d', cell.x, cell.y  );
	
		var arckeys = Object.keys( arcsToBeTested[ keys[i] ] );
		console.log( 'number of arcs on tile %d : %d', i, arckeys.length );

		for ( var j = 0; j < arckeys.length; j++ ){
	
			console.log( '============ New Arc ==================' );
			console.log( 'arc keys %d %d', keys[i], arckeys[j] );
			console.log( '=======================================' );
	
			var arc = tile.arcList[j];	
			var count = [0,0,0,0];
	
			if ( arcsToBeTested[keys[i]][j] == true ){

				count[tile.fg] += 1;

				var ttile = tile;
				console.log( 'next tile: %d %d', ttile.x, ttile.y );
				var iedge = arc[0];

				if ( cell.adj[ ttile.edge[iedge] ] != null ){
					var ncell  = brd.cellLookup[ cell.adj[ ttile.edge[iedge] ] ];
					console.log( 'edge from %d to %d', iedge, ttile.edge[iedge] );
				}else{
					var ncell  = null;
					console.log( 'no neighbouring cell' );
				}	

				//var ncell = brd.cellLookup[ cell.adj[ ttile.edge[iedge] ] ];
		
				if ( ncell != null ){	
					var ntile = ncell.occupied;
					arcsToBeTested[tile.id][j] = false;
				} else {
					var ntile = null;
				}

				while ( ( ntile != null ) && ( ntile.edge[ (ttile.edge[iedge] + 9)%6 ] != null ) ){

					console.log( "loop trace: %d, %d, %d, %d, %d, %d" % arc[0], arc[1], ttile.id, iedge, ttile.edge[iedge], ntile.id );
					iedge = (ttile.edge[iedge] + 9)%6;
					var ttile = ntile;

					console.log( 'edge from %d to %d', iedge, ttile.edge[iedge] );
	// print ( tile.pos == ttile.pos), ( iedge == arc[0] )

					if ( ( ttile != null ) && ( ttile.id == tile.id ) && ( iedge == arc[0] ) ){

						console.log( "==== LOOP FOUND ! ====" );
						newLoops += 1;

						var tot =  0;
						
						for ( var k = 0; k < 4; k++ ){
							tot += count[k];
						}

						for ( var k = 0; k < plyrs.playersInGame; k++ ){
							for ( var i = 0; i < playerColors[k].length; i++ ){
								brd.score[k] += count[ playerColors[k][i] ]*Math.min( MAXBASENUMBER, tot ); 
							}
						}

						ntile = null;
						console.log( "total counts: %d", tot );
						console.log( "counts: %d, %d, %d, %d", count[0], count[1], count[2], count[3] );
						console.log( "scores: %d, %d, %d, %d", score[0], score[1], score[2], score[3] );

					} else{

						count[ttile.fg] += 1;
						for ( var iarc = 0; iarc < ttile.arcList.length; iarc++ ){ 
							if ( (ttile.arcList[iarc][0] == iedge ) || (ttile.arcList[iarc][1] == iedge ) ){ 
								arcsToBeTested[ttile.id][iarc] = false;
							}
						}

						ncell = brd.cellLookup[ ncell.adj[ttile.edge[iedge]] ];
						ntile = ncell.occupied;
					}
				}
			}
		}
	}
		
	return newLoops;
} 







// TODO: complete this function 
function checktile(b,cell,tile){

	//var cell = b.cellLookup[tile.cellid];
	for ( var i = 0; i < 6; i++ ){

		var arcEnd = tile.edge[i];
		if ( cell.adj[i] != null ){
			var ncell  = b.cellLookup[ cell.adj[i] ];
		}else{
			var ncell  = null;
		}	

		// alert( i + ' ' + cell.adj[i] + ' ' + ncell.ix + ' ' + ncell.iy );
		if ( arcEnd != null ){

			// open edges cannot be on edges of the board
			if ( ncell == null ){
				return false;
			} else {
				tileN = ncell.occupied;
				if ( tileN != null ){
					if ( tileN.edge[(i + 9)%6] == null ){
						return false;
					} else if ( ( tile.fg != tileN.fg ) && ( tile.bg != tileN.fg) ){ 
						return false;
					}
				} else {
					var colList = [tile.fg];
					for ( j = 0; j < 6; j++ ){
						if ( b.cellLookup[ ncell.adj[j] ] != null ){
		
							// TODO find cell then determine if occupied
							var scell = b.cellLookup[ ncell.adj[j] ];
	
							if ( scell.occupied != null ){
								tileS = scell.occupied;
							} else {
								tileS = null;
							}

							if ( ( tileS != null ) && ( tileS.edge[(j + 9)%6] != null ) ){
								var iflag = false;
								for ( var icol = 0; icol < colList.length; icol++ ){ 
									if ( tileS.fg == colList[icol] ){
										iflag = true;
									}
								}
								if ( iflag == false ){
									colList.push( tileS.fg );
								}
							}
						}
					}

					if ( colList.length > 2 ){
						return false;
					}
				}
			}

		} else {
			// closed edge 
	
			if ( ncell != null ){
				tileN = ncell.occupied;
				if ( ( tileN  != null ) && ( tileN.edge[(i + 9)%6] != null ) ) {
					return false;
				}
			}
		}
	}
	return true;

}				



// Object to represent each tile in the game
function Tile() {
	this.x = 0;
	this.y = 0;
	this.letter = '';
	this.value = 0;
	this.selected = false;
}

//function init(id) {
// come to this after login
// function retrieves list of games in play and controls 
// which board to represent
function init_init_lupalo( fb_id ) {
       	var data = { fb_id: fb_id };
	USERID = fb_id;
	console.log( "fb_id: %s", data.fb_id );
        //alert( "Your user id is " + USERID );
        $.getJSON( '/gamehistory/', data, gamehistory );
}

function gamehistory( data ){
     var datastr=JSON.stringify(data);
     //alert( data['on'] );

     $('#onturn ul li').remove()
     $('#offturn ul li').remove()

     $.each(data.on,function(key,val){
     	// alert( "Games " + val[0]['fb_id'] + val[1]['fb_id']  );
     	// alert( "Games " + name + val );
	console.log( 'adding', name + val);
        // $('#posts ul').prepend('<a href="' + 'http://www.google.com' + '">ajax</a>' + '<li>' + key + '</li>' );
	//$('<a href="' + 'http://www.google.com' + '">ajax</a>' ).bind( 'click', { fb_id_list: [ val[0]['fb_id'], val[1]['fb_id'] ], game_id: key }, init_lupalo ) ) ) ;
        $('#onturn ul').prepend( $('<li>' + val[0]['first_name'] + ' and ' + val[1]['first_name'] + ' started on ' + key + '</li>').bind( 'click', { fb_id_list: [ val[0]['fb_id'], val[1]['fb_id'] ], game_id: key }, init_lupalo ) );
        //$('#posts li').bind('click', { fb_id_list: val, game_id: key }, init_lupalo );
	//var linkvar = ;	
     })


     $.each(data.off,function(key,val){
     	// alert( "Games " + val[0]['fb_id'] + val[1]['fb_id']  );
     	// alert( "Games " + name + val );
        // $('#posts ul').prepend('<a href="' + 'http://www.google.com' + '">ajax</a>' + '<li>' + key + '</li>' );
	//$('<a href="' + 'http://www.google.com' + '">ajax</a>' ).bind( 'click', { fb_id_list: [ val[0]['fb_id'], val[1]['fb_id'] ], game_id: key }, init_lupalo ) ) ) ;
        $('#offturn ul').prepend( $('<li>' + val[0]['first_name'] + ' and ' + val[1]['first_name'] + ' started on ' + key + '</li>').bind( 'click', { fb_id_list: [ val[0]['fb_id'], val[1]['fb_id'] ], game_id: key }, init_lupalo ) );
        //$('#posts li').bind('click', { fb_id_list: val, game_id: key }, init_lupalo );
	//var linkvar = ;	
     })


} 


function retrievegame( data ){
     // data contains:
     // 		fb_id_list: list of Facebook ids of players in game
     //		game_id:    id of game

     tilesInPlay = [[],[]];   // Stores all tiles currently on the canvas
     tiles       = [];        // Stores all tiles inclusing those belonging to other players. 	

     // Setup the cell arrays
     initCells();

     // Stop player from playing a turn until all data has been retrieved and verified.
     turnsInHand = 0;

     for ( var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
         for ( var k = 0; k < playerColors[iplayer].length; k++ ){
             for ( var i = 0; i < brd.tileset[ playerColors[iplayer][k] ].length; i++ ){
                 tiles.push( brd.tileset[ playerColors[iplayer][k] ][i] );
             }
          }
     }

     USERNAME = ''; // TODO
     // TODO var data = { evt.data.member_id: USERNAME };

     var y = 0;
     var x = 0;
     var k = 0;

     // place tiles on side
     for (var j = 0; j < playerColors[ PLAYERID ].length; j++ ) { 
         for (var i = 0; i < brd.tileset[ playerColors[PLAYERID][j] ].length; i++) { 
             k  = (brd.tileset[ playerColors[PLAYERID][j]][i]).id;
             theta = 2.0 * Math.PI * k / ( playerColors[ PLAYERID ].length * brd.tileset[ playerColors[PLAYERID][j] ].length ); 
             x = BOARD_LEFT + ( 2.5 + 2 * brd.n ) * TILE_INNERRADIUS * Math.cos(theta);
             y = BOARD_TOP  - TILE_INNERRADIUS + ( 2.5 + 2 * brd.n ) * TILE_INNERRADIUS * Math.sin(theta);
             // y  = TILE_TOTAL_HEIGHT + i*1.1*TILE_TOTAL_HEIGHT;
             // x  = 0.8*WIDTH + j*1.1*TILE_TOTAL_WIDTH;
             addHexTile( x, y, k );
             // k += 1;
         }
     }

     if ( data.length > 0 ){ 
         //alert( "retrieve" + data );
         $.each(data,function(i,val){
     	    //alert( "Games " + val.cell + ' ' + val.tile + ' ' +  val.rotation + ' ' + val.player + ' ' + val.turnsInHand );
     	    synctile( val );
         })
     }else{
         // player 0 starts
         if ( PLAYERID == 0 ){
            turnsInHand = 1;
         }else{
            turnsInHand = 0;
         }
     }

     //waitingForPlayersToJoin();
     score(brd);
     needsRedraw();
     draw();

} 


//function init_lupalo( game_id,  player_id, user_name ) {
function init_lupalo( evt ) {

	// evt contains:
	// 	fb_id_list: list of Facebook ids of players in game
	//	game_id:    id of game
	
	//alert( "fb id " + evt.data.fb_id_list[0] );
	//alert( "fb id " + evt.data.fb_id_list[1] );

	TILE_TOTAL_WIDTH  = 2*TILE_RADIUS;
	TILE_TOTAL_HEIGHT = 2*TILE_RADIUS;

	canvas = document.getElementById('canvas');
	HEIGHT = canvas.height;
	WIDTH = canvas.width;
	ctx = canvas.getContext('2d');

	// Set the global text properties for the text drawn on the letters
	ctx.font = '20px sans-serif';
	ctx.textBaseline = 'top';		

	// Set how often the draw method will be called
	setInterval(draw, INTERVAL);

	// Wire up the mouse event handlers
	canvas.onmousedown = mouseDown;
	canvas.onmouseup   = mouseUp;	            

	//var data = { game_id: evt.data.game_id, fb_id_list: evt.data.fb_id_list };

     	GAMEID   = evt.data.game_id;
     	// TODO retrieve data here
     	// USERID   = user_id
     	// TODO set correct USERID and PLAYERID 
     	// USERID set by init_init_lupalo
     	// player id is the turn order of the playing in this game
     	// player id should be consistent with the position of the player in fb_id_list 
    	// and also with the database record
     	PLAYERID = -1; 
     	for ( var iplayer = 0; iplayer < evt.data.fb_id_list.length; iplayer++ ){
		//alert( evt.data.fb_id_list[iplayer] + ' ' + USERID );
		if ( evt.data.fb_id_list[iplayer] == USERID ){
			PLAYERID = iplayer;
			break;
		}
	}

        // player identities need to be reinitialized 
        plyrs = new Players(); 
	alert( 'GAMEID: ' + GAMEID + 'Your PLAYERID is: ' + PLAYERID ); 
	waitingForPlayersToJoin();
	$.getJSON('/retrievegame/', evt.data, retrievegame );	
	get_moves();

}


function xmlhttpPost(strURL,pos) {
	var xmlHttpReq = false;
	var self = this;
	// Mozilla/Safari
	if (window.XMLHttpRequest) {
		self.xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject) {
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	self.xmlHttpReq.open('POST', strURL, true);
	// self.xmlHttpReq.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded');
	self.xmlHttpReq.setRequestHeader( 'Content-Type', 'application/json');	
	self.xmlHttpReq.onreadystatechange = function() {
		if (self.xmlHttpReq.readyState == 4) {
			//updatepage( "Hello");
			updatepage(self.xmlHttpReq.responseText);
			//alert( [ "success:", self.xmlHttpReq.responseText ] );
		}
	}
	//updatepage(getquerystring());
	self.xmlHttpReq.send(getquerystring(pos));
}

//function getquerystring() {
//	var form     = document.forms['f1'];
//	var word = form.word.value;
//	qstr = 'w=' + escape(word);  // NOTE: no '?' before querystring
//	return qstr;
//}

function getquerystring(pos) {
	var jsonobj = {
		"moveid":      pos[0],
		"cellid":      pos[1],
		"tileid":      pos[2],
		"rot":         pos[3],
		"turnsInHand": pos[4],
		"loops"    :   pos[5],
		"fb_id":       pos[6],
		"player_id":   pos[7],
		"game_id":     pos[8]
		}

	var jsonstr=JSON.stringify(jsonobj)

	return jsonstr;
}

function updatepage(data){
	//alert( data.playerids );
	//statusMessage  = str;
	//statusMessage1 = "Hello";
        //$.ajax({
        //    url: "",
        //    context: document.body,
        //    success: function(s,x){
        //    $(this).html(s);
        //}});
	//wait_before_recieve = false;
	//init_init_lupalo(USERID);
	moveRecord[-1].id = data.id;
       	var udata = { fb_id: USERID };
        $.getJSON( '/gamehistory/', udata, gamehistory );
}

function displayStatus(ctx,statusMessage){
	ctx.font="15px Arial";
	ctx.fillText(statusMessage, 300, 500 );
	ctx.fillText(statusMessage1,300, 580 );
}	

function displayScore(ctx,score){
	if ( plyrs.playerNames.length == plyrs.playersInGame ){
		ctx.font='20px Arial';
		var turnstr = '';
		if ( turnsInHand == 1 ){	
			//turnstr = turnstr + 'Your turn: ' + turnsInHand + ' tile.' ;
			turnstr = '*';
		}else if( turnsInHand > 1 ){
			turnstr = '**';
		}else{		
			turnstr = '';
		}
		for ( var k = 0; k < plyrs.playersInGame; k++ ){
			//var str = playerNames[k] + ': ' + ( neededScore[plyrs.playersInGame] - score[k] );
			var str = plyrs.playerNames[k] + ': ' + ( score[k] );
			// TODO determine who is on 
			if ( ( turnsInHand > 0 ) && ( k == PLAYERID ) ){
				ctx.fillStyle = SCORE_FILL_ON;
			}else{
				ctx.fillStyle = SCORE_FILL_OFF;
			}

			if ( k == PLAYERID ){
				ctx.fillText( str + turnstr, 0.15*( CANVAS_LEFT + CANVAS_RIGHT ),  CANVAS_TOP + (k)*2*INTERVAL  );
			}else{
				ctx.fillText( str, 0.15*( CANVAS_LEFT + CANVAS_RIGHT ),  CANVAS_TOP + (k)*2*INTERVAL  );
			}
		}
	}
}

function rotateToNextFeasible(cell,tile,dorotation){
	rotateHexTile(tile,1);
	var k = 1; 
	while ( ( checktile(brd,cell,tile) == false ) && ( k < 6 ) ){
		rotateHexTile(tile,1);
		k = k+1;
	}

	var fstatus = checktile(brd,cell,tile); 
	// rotate back to the start 
	if ( dorotation == false ){
		rotateHexTile(tile,6-k);
	}
		
	return fstatus; 
}

function rotateHexTile(tile,rot){

	tile.rotation = ( tile.rotation + rot )%6;
	tile.edge = [null,null,null,null,null,null];
	for ( k = 0; k < tile.arcList.length; k++ ){

		if ( tile.arcList[k] != null ){
			var arc     = tile.arcList[k];
			var newarc  = [(6 + arc[0]+rot)%6,(6 + arc[1]+rot)%6]; 
 
			arc[0] = Math.min(newarc[0],newarc[1]);
			arc[1] = Math.max(newarc[0],newarc[1]);
			tile.arcList[k]   = arc;
			tile.edge[arc[0]] = arc[1];
			tile.edge[arc[1]] = arc[0];
		}
	}
}

// used to synchronize tiles 
// rotates starting from original orientation 
function rotateHexTileFromOrigin(tile,rot){

	tile.rotation = ( rot )%6;
	tile.edge = [null,null,null,null,null,null];
	for ( k = 0; k < tile.arcListOrig.length; k++ ){

		if ( tile.arcListOrig[k] != null ){
			var arc     = tile.arcListOrig[k];
			var newarc  = [(6 + arc[0]+rot)%6,(6 + arc[1]+rot)%6]; 
 
			arc[0] = Math.min(newarc[0],newarc[1]);
			arc[1] = Math.max(newarc[0],newarc[1]);
			tile.arcListOrig[k]   = arc;
			tile.edge[arc[0]] = arc[1];
			tile.edge[arc[1]] = arc[0];
		}
	}
}




function initHexTiles() {

	// Create a new tile object for each letter and value above
	for ( var j = 0; j < 1; j++ ){ //4
		for ( var i = 0; i < 5 ; i++ ){ //12
			var tile = new HexTile;
			tile.rotation = 0
			tile.value = 0
			tile.id    = i;			
			tile.bg    = 1;
			tile.arcList = [];

			// put all s in a function 
			var arc1 = [0,1];
			var arc2 = [2,3];

			if (arc1.length > 0){
				ix  = [ (6 + arc1[0]+tile.rotation)%6, (6 + arc1[1]+tile.rotation)%6 ];
				ixs = [ Math.min(ix[0],ix[1]), Math.max(ix[0],ix[1]) ];
				tile.arcList.push( ixs );
				// tile.edge[ixs[0]] = ixs[1];
				// tile.edge[ixs[1]] = ixs[0];
			}
			if (arc2.length > 0){
				ix = [ (6 + arc2[0]+tile.rotation)%6, (6 + arc2[1]+tile.rotation)%6 ];
				ixs = [ Math.min(ix[0],ix[1]), Math.max(ix[0],ix[1]) ];
				tile.arcList.push( ixs );
				// tile.edge[ixs[0]] = ixs[1];
				// tile.edge[ixs[1]] = ixs[0];
			}

			// Add the tile to the tiles array
			tiles.push(tile);
		}
	}
	
}



function initCells() {
	//var k = 0;
	//for ( var i = 0; i < 3; i++ ){
		// for ( var j = 0; j < 3; j++ ){
			// var cell = new Cell;
			// cell.x = 100*i;
			// cell.y = 100*j;
			// cell.id = k;
			// cell.occupied = false;
			// cellInBoard.push(cell);
			// k += 1;
		// }
	// }
	brd = new Board();
	initFeasTilesAndCells( brd.tileset, brd.cellInBoard );
}


function Players(){
	this.playerNames   = [];
	this.playerTurns   = [];
	this.playersInGame = 2;		    // Players in game SET ON INITIALIZATION
}

function Board(){

	this.score = [];
	for ( var i = 0; i < plyrs.playersInGame; i++ ){
		this.score.push( 0 );
	}

	this.trial = false; // when a tile is placed on the board but not set trial is set to true	

	this.UP        = 0;
	this.UPRIGHT   = 1;
	this.DOWNRIGHT = 2;
	this.DOWN      = 3;
	this.DOWNLEFT  = 4;
	this.UPLEFT    = 5;

	this.tilegeomset = [ [[0,1]], 	
	[[0,2]], 
	[[0,3]], 
	[[0,1],[2,3]],
	[[0,1],[3,4]], 
	[[0,1],[2,4]], 
	[[0,1],[3,5]], 
	[[0,1],[2,5]], 
	[[0,2],[3,5]], 
	[[0,2],[1,3]], 
	[[0,2],[1,4]], 
	[[0,3],[1,4]] ]; 

        this.n = 7;
	this.loops = 0;
        var SCALE  = TILE_RADIUS;
        var yshift = SCALE*1.5*SQRT3/3.0; 
        var xshift = SCALE*1.5;
        var rowlen = [];

        for (var i = 0; i < this.n; i++){
            rowlen.push(i);
        }

	for (var i = 0; i < this.n-1; i++){
        	rowlen.push( (this.n-2) );
        	rowlen.push( (this.n-1) );
	}

        for (var i = (this.n-2); i > -1; i--){
            rowlen.push(i);
        }
	
        this.arcList       = [];
	this.cellInBoard   = [];
	this.cellLookup    = {};

        var k = 0;
        for (var i = 0; i < rowlen.length; i++ ){
		var l = rowlen[i];
                for ( var j = -l; j < l+1; j += 2 ){
               		var ix = j;
                    	var iy = ( i - 2*this.n + 1);
                    	var x = BOARD_LEFT + ix * xshift;
                    	var y = BOARD_TOP  + iy * yshift;
		     	var cell = new Cell;
		      	cell.ix = ix;
		      	cell.iy = iy;
		      	cell.x  = x;
		      	cell.y  = y;
		      	cell.id = k;
		      	cell.occupied = null;
		      	this.cellInBoard.push(cell);
		      	k += 1;
		}
	}


	this.tileLookup = {};
	this.tileset = [];
	var id = 0;
	for ( var i = 0; i < 4; i++ ){
		this.tileset[i] = [];
		//for ( var j = 0; j < 4; j++ ){
		for ( var bg = 0; bg < bgColors[i].length; bg++ ){
			j = bgColors[i][bg];
			// TODO tile sets will be different for 2,3,4 player games 
			if ( i != j ){
				for ( var k = 0; k < this.tilegeomset.length; k++ ){
					var pattern = this.tilegeomset[k];
					if ( pattern.length == 2 ){
						arc0 = [pattern[0][0],pattern[0][1]];
						arc1 = [pattern[1][0],pattern[1][1]];
					}else{
						arc0 = [pattern[0][0],pattern[0][1]];
						arc1 = null;					}

					var tile = new HexTile(id,i,j,arc0,arc1,0);
					
					this.tileset[i].push(tile);

					this.tileLookup[id] = tile;
					id += 1;	
				}
			}
		}
	}



	for ( var i = 0; i < rowlen.length; i++ ){
		var l = rowlen[i];
		for ( var j = -l; j < (l+1); j += 2 ){
			var ix = j;
			var iy = (i-2*this.n+1);
			var x = ix * this.xshift;
			var y = iy * this.yshift;
		}
	}


	for ( var i = 0; i < this.cellInBoard.length; i++ ){
		var cell = this.cellInBoard[i];
		var ix = cell.ix;
		var iy = cell.iy;
		this.cellLookup[[ix,iy]] = cell;
	}

	
	for ( var i = 0; i < this.cellInBoard.length; i++ ){
		var cell = this.cellInBoard[i];
		var ix = cell.ix;
		var iy = cell.iy;
		// this.cellLookup[[ix,iy]] = cell;

		for ( var j = 0; j < this.cellInBoard.length; j++ ){
			if ( ( ix == this.cellInBoard[j].ix ) && ( iy-2 == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.DOWN] = [ix,iy-2];
			}  
		if ( ( ix == this.cellInBoard[j].ix ) && ( iy+2 == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.UP] = [ix,iy+2];
			}
	
			if ( ( (ix-1) == this.cellInBoard[j].ix ) && ( (iy-1) == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.DOWNLEFT] = [ix-1,iy-1];
			}
			
			if ( ( (ix+1) == this.cellInBoard[j].ix ) && ( (iy-1) == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.DOWNRIGHT] = [ix+1,iy-1];
			}
		
			if ( ( (ix-1) == this.cellInBoard[j].ix ) && ( (iy+1) == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.UPLEFT] = [ix-1,iy+1];
			}

			if ( ( (ix+1) == this.cellInBoard[j].ix ) && ( (iy+1) == this.cellInBoard[j].iy ) ){
				this.cellInBoard[i].adj[this.UPRIGHT] = [ix+1,iy+1];
			}
		}
	}


}


// Adds a random tile to the canvas at the given coordinates
function addHexTile(x, y, i ) {
	// Get a random number the be used to index into
	// the tiles array
	//var index = Math.floor(Math.random() * tiles.length);

	// Remove the random tile from the array and
	// set its location
	//var tile = tiles.splice(index, 1)[0];

	console.log( 'Adding tile ' + i );
	var tile = tiles[i];
	tile.x = x;
	tile.y = y;

	tile.xo = x;   // off board placement
	tile.yo = y;   // off board placement 

	// Add the tile to the tilesInPlay array and
	// indicate taht the canvas needs to be redrawn
	tilesInPlay[PLAYERID].push(tile);
	needsRedraw();
	//draw();

}


// Indicate that the canvas needs to be redrawn
function needsRedraw() {
	redrawCanvas = true;
}

// Draw the various objects on the canvas
function draw() {
	// Only draw the canvas if it is not valid
	if (redrawCanvas){ 
		clear(ctx);


		var img=new Image();
		img.src="/media/js/paper.jpg";
		ctx.drawImage(img,0,0);

		// now draw the cell positions 
		for (var i = 0; i < brd.cellInBoard.length; i++) {
		     drawHexTile(ctx, brd.cellInBoard[i], STATUS_FEAS );
		}

		// find selected cell
		selectedcell = findSelectedCell();

		if (selectedcell != null ){
		     drawHexTile(ctx, selectedcell, STATUS_SELECTED );
		}	

		// find selected tile
		selectedtile = findSelectedTile();
		if ( selectedtile != null ){
			for ( var i = 0; i < selectedtile.infeasibleCells.length; i++ ){
				// TODO separate code for selected tile in last argument 
				drawHexTile( ctx, selectedtile.infeasibleCells[i], STATUS_INFEAS  );
			} 
		}

		// draw the placed tiles 
		for (var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
			for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
				if (tilesInPlay[iplayer][i].placed == true){
					drawHexTile(ctx, tilesInPlay[iplayer][i], null );
				}
			}
		}

		if ( selectedcell == null ){

			// draw the unselected tiles first so they appear under the selected tiles
			//for (var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
				//for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
				iplayer = PLAYERID;
				for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
					if (!tilesInPlay[iplayer][i].selected)
						drawHexTile(ctx, tilesInPlay[iplayer][i], null );
				}
			//}

			// now draw the selected tiles so they appear on top of the unselected tiles
			//for (var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
				iplayer = PLAYERID;
				for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
					if (tilesInPlay[iplayer][i].selected){
						drawHexTile(ctx, tilesInPlay[iplayer][i], null);
					}			
				}
			//}

		}
		else{

			for (var i = 0; i < selectedcell.feasibleTiles.length; i++) {
				var idx_tile = $.inArray( selectedcell.feasibleTiles[i], tilesInPlay[PLAYERID] );
				if ( idx_tile != -1 ){	
					drawHexTile(ctx, selectedcell.feasibleTiles[i], null);
				}
			}

		}	

		// display status			
		//displayStatus(ctx,statusMessage);

		// display status
		//alert( 'display score' + brd.score + plyrs.playerNames );	
		displayScore(ctx,brd.score);
		drawFixButton(ctx);
		drawRotateButton(ctx);

		// Indicate that the canvas no longer needs to be redrawn
		redrawCanvas = false;
	}
}

function drawFixButton(context){
        var img = new Image();
	if ( brd.trial == true && FIXTILE_X != null ) {
		img.src = "/media/images/play_alt.png";
		context.drawImage( img, FIXTILE_X - FIX_RADIUS - TILE_RADIUS*1.5, FIXTILE_Y - FIX_RADIUS - TILE_RADIUS*SQRT3, 2*FIX_RADIUS, 2*FIX_RADIUS );
	}
}

function drawRotateButton(context){
        var img = new Image();
	if ( brd.trial == true && FIXTILE_X != null ) {
		img.src = "/media/images/RotateAnti.jpg";
		context.drawImage( img, FIXTILE_X - FIX_RADIUS + TILE_RADIUS*1.5, FIXTILE_Y - FIX_RADIUS - TILE_RADIUS*SQRT3, 2*FIX_RADIUS, 2*FIX_RADIUS );
	}
}

// Draw a single tile using the passed in context
function drawHexTile(context, tile, stat ) {
	// Draw the tile with rounded corners

	keys = Object.keys(tile);
        if ( 'rotation' in aob( keys ) ){
		context.beginPath();
        	context.moveTo( tile.x + TILE_RADIUS*Math.cos( (tile.rotation + 0)*Math.PI/3.0 ), tile.y + TILE_RADIUS*Math.sin( ( tile.rotation + 0 )*Math.PI/3.0 ) );
		for ( var i = 1; i < 6; i++ ) {
        		context.lineTo( tile.x + TILE_RADIUS*Math.cos( (tile.rotation + i)*Math.PI/3.0 ), tile.y + TILE_RADIUS*Math.sin( ( tile.rotation + i )*Math.PI/3.0 ) );
		}
		context.closePath();
		context.strokeStyle = TILE_STROKE;
		context.stroke();	            


	}else{

		context.beginPath();
        	context.moveTo( tile.x + TILE_RADIUS*Math.cos( (0)*Math.PI/3.0 ), tile.y + TILE_RADIUS*Math.sin( (0)*Math.PI/3.0 ) );
		for ( var i = 1; i < 6; i++ ) {
        		context.lineTo( tile.x + TILE_RADIUS*Math.cos( (i)*Math.PI/3.0 ), tile.y + TILE_RADIUS*Math.sin( (i)*Math.PI/3.0 ) );
		}
		context.closePath();


		switch( stat ){
		case STATUS_FEAS:
			context.fillStyle = CELL_FEAS_FILL;
			break;
		case STATUS_INFEAS:
			context.fillStyle = CELL_INFEAS_FILL;
			break;
		case STATUS_SELECTED:
			context.fillStyle = CELL_SELECTED_FILL;
			break;
		default:
			context.fillStyle = CELL_BG_FILL;
			break;
		}

		// context.fillStyle = (tile.selected ? CELL_SELECTED_FILL : CELL_BG_FILL );

		// Draw the border around the tile
		context.strokeStyle = TILE_STROKE;
		context.stroke();	            
		context.fill();

	}

	// Fill the tile background depending on whether or not
	// the tile is selected or not
	keys = Object.keys(tile);
        if ( 'placed' in aob( keys ) ){
		if ( tile.placed == true ) {
			context.fillStyle = TILE_PLACED_BG_FILL[tile.bg];
		}
		else if ( tile.selected == true ){
			context.fillStyle  = TILE_SELECTED_BG_FILL[tile.bg];
			context.shadowColor="black";
			context.shadowBlur=1.0*TILE_RADIUS;
		}else{
			context.fillStyle  = TILE_BG_FILL[tile.bg];
		}
		context.fill();
		context.shadowColor = null;
		context.shadowBlur  = null;
	}          	            

        if ( 'fg' in aob( keys ) ){
		for ( var k = 0; k < tile.arcList.length; k++ ){
			if ( tile.arcList[k] != null ){
				var arc = tile.arcList[k];
				var sideA = Math.min( arc[0], arc[1] );
				var sideB = Math.max( arc[0], arc[1] );
				if ( ( sideB - sideA == 1 ) || ( (6 - sideB + sideA ) % 6 == 1 ) ){
					TightArc( context, tile.x, tile.y, sideA, sideB, tile.fg, TILE_RADIUS );
				}
				if( ( sideB - sideA == 2 ) || ( (6 - sideB + sideA) % 6 == 2 ) ){
					LooseArc( context, tile.x, tile.y, sideA, sideB, tile.fg, TILE_RADIUS );
				}
				if( ( sideB - sideA == 3 ) || ( ( 6 - sideB + sideB) % 6 == 3 )  ){			
					StraightArc( context, tile.x, tile.y, sideA, sideB, tile.fg, TILE_RADIUS );
				}
			}
		}
	}

}



function TightArc( context, tx, ty, sideA, sideB, fg, scale ){	
	rH  = scale*2.00/2;
	rS  = scale*0.75/2;
	rL  = scale*1.25/2;

	// if ( Math.abs( sideA - sideB ) != 5 && Math.abs( sideA - sideB ) != 1 ){
	// 	raise AssertionError
	//}

	if ( sideA < sideB ){
		sideX = sideA;
	}
	if ( ( sideA == 0 ) && ( sideB == 5 ) ){
		sideX = sideB;
	}

        x = tx + rH * Math.cos( ( 1.0 - sideX )*Math.PI/3.0 );
        y = ty + rH * Math.sin( ( 1.0 - sideX )*Math.PI/3.0 );

        context.strokeStyle = TILE_FG_FILL[fg];
	context.fillStyle = TILE_FG_FILL[fg];
 	context.beginPath();
	context.arc( x, y, rL, Math.PI*( 3 - sideX )/3.0, Math.PI*( 5 - sideX )/3.0, false );
	context.arc( x, y, rS, Math.PI*( 5 - sideX )/3.0, Math.PI*( 3 - sideX )/3.0, true );
	context.lineWidth = 1;
        context.stroke();
	context.fill();
	context.closePath();

}	




function LooseArc( context, tx, ty, sideA, sideB, fg, scale ){

	// context.globalCompositeOperation = 'source-over';
        rH  = scale * 2.00/2;
        rSL = scale * 2.75/2;
        rLL = scale * 3.25/2;
        rS  = scale * 0.75/2;

        // if ( Math.abs( sideA - sideB ) != 4 && Math.abs( sideA - sideB ) != 2 ) ){
        //         raise AssertionError
	// }

        if ( sideA < sideB ){
                sideX = sideA + 1;
	}
        if ( ( sideA == 0 ) && ( sideB == 4 ) ){
                sideX = 5;
	}
        if ( ( sideA == 1 ) && ( sideB == 5 ) ){
                sideX = 0;
	}

        x = tx + SQRT3 * scale * Math.cos( ( 0.5 - sideX/3.0 )*Math.PI );
        y = ty + SQRT3 * scale * Math.sin( ( 0.5 - sideX/3.0 )*Math.PI );

        context.strokeStyle = TILE_FG_FILL[fg];
	context.fillStyle = TILE_FG_FILL[fg];
 	context.beginPath();
	context.arc( x, y, rLL, Math.PI*( 4 - sideX )/3.0, Math.PI*( 5 - sideX )/3.0, false );
	context.arc( x, y, rSL, Math.PI*( 5 - sideX )/3.0, Math.PI*( 4 - sideX )/3.0, true );
	context.lineWidth = 1;
        context.stroke();
	context.fill();
	context.closePath();
	
}


function StraightArc( context, tx, ty, sideA, sideB, fg, scale ){

	var rH  = (scale * SQRT3 )/ 2;
	var rW  = scale / 2 * 0.25;

	// if ( abs( sideA - sideB ) != 3 ):
	// 	raise AssertionError

	if ( sideA < sideB ){
		sideX = sideA;
	}

	var x   = rH * Math.cos( ( 0.5 - sideX/3.0 )*Math.PI );
	var dx  = rW * Math.cos( ( 1.0 - sideX/3.0 )*Math.PI );
	var y   = rH * Math.sin( ( 0.5 - sideX/3.0 )*Math.PI );
	var dy  = rW * Math.sin( ( 1.0 - sideX/3.0 )*Math.PI );

        context.strokeStyle = TILE_FG_FILL[fg];
	context.fillStyle   = TILE_FG_FILL[fg];
 	context.beginPath();
	context.moveTo( tx + x + dx, ty + y + dy );
	context.lineTo( tx + x - dx, ty + y - dy );
	context.lineTo( tx - x - dx, ty - y - dy );
	context.lineTo( tx - x + dx, ty - y + dy );
	context.lineTo( tx + x + dx, ty + y + dy );
	context.lineWidth = 1;
        context.stroke();
	context.fill();
	context.closePath();

}



// Clears the canvas
function clear(c) {
	c.clearRect(0, 0, WIDTH, HEIGHT);
}



function isFixingTileFromCoord( x, y ){
	
	//if (( ( x - FIXTILE_X - TILE_RADIUS*1.5 )*( x - FIXTILE_X - TILE_RADIUS*1.5  ) + ( y - FIXTILE_Y - TILE_RADIUS*1.5*SQRT3/3.0 )*( y - FIXTILE_Y - TILE_RADIUS*1.5*SQRT3/3.0 ) ) < FIX_RADIUS*FIX_RADIUS ){ 
	if (( ( x - ( FIXTILE_X - TILE_RADIUS*1.5 ))*( x - (FIXTILE_X - TILE_RADIUS*1.5 ) ) + ( y - (FIXTILE_Y - TILE_RADIUS*SQRT3 ))*( y - (FIXTILE_Y - TILE_RADIUS*SQRT3 ) ) ) < FIX_RADIUS*FIX_RADIUS ){ 
		return true;
	}else{
		return false;
	}

}



function isRotatingTileFromCoord( x, y ){
	
	if (( ( x - ( FIXTILE_X + TILE_RADIUS*1.5 ) )*( x - ( FIXTILE_X + TILE_RADIUS*1.5 ) ) + ( y - (FIXTILE_Y - TILE_RADIUS*SQRT3 ))*( y - (FIXTILE_Y - TILE_RADIUS*SQRT3 ) ) ) < FIX_RADIUS*FIX_RADIUS ){ 
		return true;
	}else{
		return false;
	}

}


function findCellFromCoord( x, y){
	
	for (var k = 0; k < brd.cellInBoard.length; k++) {
		var cell = brd.cellInBoard[k];
		// Determine if the cell was near
		if ( cell.occupied == null ){
			if (( ( x - cell.x )*( x - cell.x ) + ( y - cell.y )*( y - cell.y ) ) < TILE_INNERRADIUS*TILE_INNERRADIUS ){ 
				return cell;
			}
		}
	}
	return null;
}
	

function findTileFromCoord( x, y ){
	for ( var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
		for ( var i = 0; i < tilesInPlay[iplayer].length; i++) {
			var tile = tilesInPlay[iplayer][i];
			if ( tile.placed == false ){
				if (( ( x - tile.x )*( x - tile.x ) + ( y - tile.y )*( y - tile.y ) ) < TILE_INNERRADIUS*TILE_INNERRADIUS ){ 
					return tile;	
				}
			}
		}	
	}
	return null;

}


function findSelectedCell(){	
	for (var k = 0; k < brd.cellInBoard.length; k++) {
		var cell = brd.cellInBoard[k];
		if ( cell.selected == true ){
			return cell;
		}
	}
	return null;
}
	


function findSelectedTile(){
	for ( var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
		for ( var i = 0; i < tilesInPlay[iplayer].length; i++) {
			var tile = tilesInPlay[iplayer][i];
			if ( tile.selected == true ){
				return tile;	
			}
		}	
	}
	return null;

}

	

function mouseDown(e) {
	// Get the current mouse coordinates
	getMouse(e);
	tile = findTileFromCoord( mouseX, mouseY );
	cell = findCellFromCoord( mouseX, mouseY );

	if (brd.trial == true ){
		fixTile    = isFixingTileFromCoord( mouseX, mouseY );
		rotateTile = isRotatingTileFromCoord( mouseX, mouseY );

		if ( fixTile == true ){
			return;
		}else if ( rotateTile == true ){
			return;
		}else if ((tile != null) && (cell != null )){
			// TODO rotateToNextFeasible(cell,tile,true);
			return;
		}
	
	}

	// Test if mouse is in board region

	if ( tile == null ){
		if ( (cell != null) && (cell.occupied != null) ){
			cell = null;
		}
	}	

	if ( tile != null ){

		if ( tile.selected == true ){
			clearSelectedTiles();
			moveNonSelectedTilesOffBoard();	
		}else{
			clearSelectedTiles();
			moveNonSelectedTilesOffBoard();	
			tile.selected = true;
		}
		needsRedraw();

	}else if( cell != null ){

		if ( cell.selected == true ){
			clearSelectedCells();
		}else{
			clearSelectedCells();
			cell.selected = true;
		}
		needsRedraw();

	}

	return;
	// Test is mouse is in tile region

	// Indicate that the user is not dragging any tiles
	isDragging = false;

	// Check to see if the user has clicked a tile
	for (var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ){
		for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
			var tile = tilesInPlay[iplayer][i];
			if ( tile.placed == false ){
				// Calculate the left, right, top and bottom
				// bounds of the current tile
				var lefti   = tile.x + 0.25*TILE_TOTAL_WIDTH;
				var righti  = tile.x + 0.75*TILE_TOTAL_WIDTH;
				var topi    = tile.y + 0.25*TILE_TOTAL_HEIGHT;
				var bottomi = tile.y + 0.75*TILE_TOTAL_HEIGHT;

				var left   = tile.x;
				var right  = tile.x + TILE_TOTAL_WIDTH;
				var top    = tile.y;
				var bottom = tile.y + TILE_TOTAL_HEIGHT;

				// Determine if the tile was clicked
				if (( ( mouseX - tile.x )*( mouseX - tile.x ) + ( mouseY - tile.y )*( mouseY - tile.y ) ) < TILE_RADIUS*TILE_RADIUS ){ 
					
					// Indicate that the current tile is selected
					tilesInPlay[iplayer][i].selected = true;
					
					if (( ( mouseX - tile.x )*( mouseX - tile.x ) + ( mouseY - tile.y )*( mouseY - tile.y ) ) > 0.25*TILE_RADIUS*TILE_RADIUS ){ 

						cell = findCellFromCoord( tile.x, tile.y );
						if ( cell != null ){ 
							rotateToNextFeasible(cell,tile,true);
						} else {	
							rotateHexTile( tilesInPlay[iplayer][i], 1 );
						}
						//isRotating = true;
						//return;

					}else{
						
						isDragging = true;

						// Wire up the onmousemove event to handle the dragging
						canvas.onmousemove = mouseMove;
						//return;
					}

					needsRedraw();

				}else{

					tilesInPlay[iplayer][i].selected = false;
				
				}
			}
		}
	}

	// No tiles were clicked, make sure all tiles are not selected
	clearSelectedTiles();
}

function mouseMove(e) {


	//if (isRotating){
	//	getMouse(e);
	//	for (var i = 0; i < tilesInPlay.length; i++) {
	//		var tile = tilesInPlay[i];
	//		if (tile.selected) {	                   
	//			rotateHexTile( tilesInPlay[i], 1 );
	//		}
	//	}
	//	needsRedraw();
	//}
	
	// If the user is dragging a tile
	if (isDragging) {
		getMouse(e);

		// TODO this should be PLAYERID 
		for (var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++) {
			for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
				var tile = tilesInPlay[iplayer][i];

				// Only if the tile is selected do we want to drag it
				if (tile.selected) {	                   

					// Only move tiles to the right or left if the mouse is between the left and
					// right bounds of the canvas
					if (mouseX < CANVAS_RIGHT && mouseX > CANVAS_LEFT) {

						//for (var k = 0; k < brd.cellInBoard.length; k++) {
						//	var cell = brd.cellInBoard[k];
							// Determine if the cell was near
						//	if ( cell.occupied == null ){
						//		if (( ( mouseX - cell.x )*( mouseX - cell.x ) + ( mouseY - cell.y )*( mouseY - cell.y ) ) < CELL_RADIUS*CELL_RADIUS ){ 
						//			tile.x = cell.x;
						//			tile.y = cell.y;
						//		}
						//	}
						//}

						// Move the tile if it is not off the canvas
						// or if the mouse was off the canvas on the left or right
						// side before but has now come back onto the canvas
						if ((tile.x + TILE_TOTAL_WIDTH <= WIDTH && tile.x >= 0) || offX) {
							tile.x = tile.x + changeInX;
						}
					}	                   

					// Only move tiles up or down if the mouse is between the top and bottom
					// bounds of the canvas
					if (mouseY < CANVAS_BOTTOM && mouseY > CANVAS_TOP) {

						// Move the tile if the it is not off the canvas and the
						// or if the mouse was off the canvas on the top or bottom
						// side before but has not come back onto the canvas
						if ((tile.y >= 0 && tile.y + TILE_TOTAL_HEIGHT <= HEIGHT) || offY) {
							tile.y = tile.y + changeInY;
						}
					}
				}
			}
		}

		// Update the variables indicating whether or not the mouse in on the canvas
		offX = (mouseX > CANVAS_RIGHT || mouseX < CANVAS_LEFT)
		offY = (mouseY > CANVAS_BOTTOM || mouseY < CANVAS_TOP)

		needsRedraw();
	}
}



function mouseUp(e) {

	// Indicate that we are no longer dragging tiles and stop
	// handling mouse movement
	isDragging = false;
	document.onmousemove = null;

	tile = findSelectedTile();
	cell = findSelectedCell();
	if (( tile != null ) && ( cell != null )){

		if ( rotateTile == true ){
			rotateToNextFeasible(cell,tile,true);
			rotateTile     = false;	
		} else if ( fixTile == true ){
		
			wait_before_recieve = true;
			turnsInHand   -= 1;	
			brd.trial      = false;
			cell.occupied  = tile;
			cell.selected  = false;
			tile.placed    = true;
			tile.selected  = false;
			fixTile        = false;	
	
			document.onmousemove = null;
			needsRedraw();
	
			var move = new Move;

			updateFeasTilesAndCells( cell, brd.tileset );

			// TODO wait for id and update from database
			if ( moveRecord.length > 0 ){	
				//move.id = ( moveRecord[moveRecord.length-1] ).id + 1;
				move.id = NOTCONFIRMED;
			}else{
				move.id = NOTCONFIRMED;
			}
			move.tile   = tile.id;
			move.cell   = cell.id;
			move.player = PLAYERID; 
			moveRecord.push(move);
			var newLoops  = score(brd);
			console.log( 'New loops: ' + newLoops );

			// ==================================
			clearSelectedTiles();
			moveNonSelectedTilesOffBoard();	
			// ==================================
			console.log( 'turns in hand C:', turnsInHand );
			turnsInHand += newLoops - brd.loops;
			console.log( 'turns in hand D:', turnsInHand );
			brd.loops = newLoops;
			// TODO place and send
			var data = { moveid:move.id, cellid:cell.id, tileid:tile.id, rot:tile.rotation, turnsInHand:turnsInHand, loops:brd.loops, fb_id:USERID, player_id:PLAYERID, game_id:GAMEID }; 
			
			// TODO check return status before proceeding
			$.getJSON( '/send/', data, updatepage ).error( function(data){ alert('send failed') } );
			// xmlhttpPost("http://127.0.0.1:8000/polls/send/",[move.id,cell.id,tile.id,tile.rotation,turnsInHand,brd.loops,USERID,PLAYERID,GAMEID]); 

		// TODO mechanism for setting tile 
		} else if( ( checktile(brd,cell,tile) == true )  || ( rotateToNextFeasible(cell,tile,true) == true ) ){

			// cell.occupied  = tile;
			tile.ix = cell.ix;
			tile.iy = cell.iy;
			tile.x  = cell.x;
			tile.y  = cell.y;
			// TODO button 
			// tile.placed = true;
		        if ( turnsInHand > 0 ){	
				brd.trial = true;
				// TODO test and add rotate button
				FIXTILE_X = tile.x;
				FIXTILE_Y = tile.y;
			}
			document.onmousemove = null;
			needsRedraw();

		}else{
			brd.trial = false;
		}
	}else{
		brd.trial = false;
	}

	// Deselect all tiles
	// clearSelectedTiles();	
	needsRedraw();
}

function waitingForPlayersToJoin(){
    if ( plyrs.playerTurns.length < plyrs.playersInGame ){
    	var data = { fb_id: USERID, player_id: PLAYERID, game_id: GAMEID };
    	$.getJSON( '/initplayers/', data, syncplayers );
    	//setTimeout( "waitingForPlayersToJoin()", 5000 );
    }
}

function syncplayers( data ){
     console.log( "sync players" + data.playernames );
     for ( var k = 0; k < data.playernames.length; k++ ){
     	//playerNames[k] = data.playernames[k];
	plyrs.playerNames.push( data.playernames[k] );
     	//playerTurns[k] = data.playerids[k];
     	plyrs.playerTurns.push( data.playerids[k] );
     }
    //alert( "set player names " + plyrs.playerTurns.length + ' ' + plyrs.playersInGame + ' ' + plyrs.playerNames );
}

function get_moves() {

    if ( moveRecord.length > 0 ){
        lastmoveid = ( moveRecord[moveRecord.length-1] ).id;
    }else{
        lastmoveid = 0;
    }

    if ( ( turnsInHand == 0 ) && ( wait_before_recieve == false ) ){
        var data = { lastmove: lastmoveid, fb_id: USERID, player_id: PLAYERID, game_id: GAMEID };
        $.getJSON( '/recieve/', data, synctile );
    }
    //$.ajax({
    //    type: 'POST',
    //    data: { id: PLAYERID, gameid: GAMEID, lastmove: lastmoveid },
    //    url:'/polls/recieve/',
    //            dataType: 'json',
    //            success: function(data) {
//			alert( data.playerid, data.cellid, data.tileid, data.rotation )
			//alert( data.gameid, data.lastmove )
    //            }        
    //});
    // wait for next
    setTimeout( "get_moves()", WAITTIME);

}



function synctile( data ){
     // update single move on board from data retrieved from database
	
     console.log( "data.cell id: "  + data.cell );
     
     // TODO -1 is marker for empty board 
     if ( data.cell == -1 ){
	return;
     }

     var cell = brd.cellInBoard[data.cell];
     var tile = brd.tileLookup[data.tile];
     // var tile = tiles[data.tile];
     var rot  = data.rotation;

     console.log( "cell id: "  + cell.id + "tile id: " + data.tile + "player id:" + data.player + "my player id" + PLAYERID + "turns in hand:" + data.turnsInHand );

     // alert( 'sync' + data.tile )
     // statusMessage  = "last move" + data.cellid;

     statusMessage = "last move" + data.cell;	
     tile.x  = cell.x;
     tile.ix = cell.ix;
     tile.y  = cell.y;
     tile.iy = cell.iy;

     if ( moveRecord.length > 0 ){
        console.log( "tile id " + tile.id + " " + moveRecord[moveRecord.length-1].tile );
     }

     // if this if the first move in the game or if the current tile is not the same as the last recorded move
     // which would happen if the current player made the last move in the game
     if ( (moveRecord.length == 0) || (tile.id != moveRecord[moveRecord.length-1].tile) ){

	if ( cell.occupied != null ){
            alert( 'cell is already occupied' ); // this should not happen
	}

	rotateHexTileFromOrigin(tile,rot);
     	cell.occupied = tile;
     	tile.placed   = true;

	updateFeasTilesAndCells( cell, brd.tileset );
	// TODO check indexing and retrieval 
	tilesInPlay[data.player].push(tile);
     	// move = new Move( moveRecord.length, data.player, tile.id, cell.id, rot );
     	move = new Move( data.lastmove, data.player, tile.id, cell.id, rot );
     	moveRecord.push(move);
        brd.loops = data.loops;
	score(brd);
	console.log( 'turns in hand A:', turnsInHand );
	console.log( 'number in game:', plyrs.playersInGame, "last player:", data.player );
	// if the last player is the same as PLAYERID in this window then retrieve turnsInHand from retrieved data 
	if ( PLAYERID == data.player ){
		turnsInHand = data.turnsInHand;
	// if the last player has not more turns in the current player is next up the current player has a single turn in hand.
	} else if ( ( data.turnsInHand == 0 ) && ( ( ( ( plyrs.playersInGame + PLAYERID - data.player ) ) % plyrs.playersInGame ) == 1 ) ){
		turnsInHand = 1;	
	} else {
	// otherwise it is not the player's turn
		turnsInHand = 0;
	} 
	console.log( 'turns in hand B:', turnsInHand );
     	needsRedraw();

     }

}


function moveNonSelectedTilesOffBoard(){	
	for ( var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ) {
		for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
			var tile = tilesInPlay[iplayer][i];
			if ( tile.selected == false && tile.placed == false ){
				tilesInPlay[iplayer][i].x  = tile.xo;
				tilesInPlay[iplayer][i].ix = null;
				tilesInPlay[iplayer][i].y  = tile.yo;
				tilesInPlay[iplayer][i].iy = null;
			}
		}
	}
}


// Sets the tile.selected property to false for
// all tiles in play
function clearSelectedTiles() {
	for ( var iplayer = 0; iplayer < plyrs.playersInGame; iplayer++ ) {
		for (var i = 0; i < tilesInPlay[iplayer].length; i++) {
			tilesInPlay[iplayer][i].selected = false;
		}
	}
}


// Sets the tile.selected property to false for
// all tiles in play
function clearSelectedCells() {
	for (var k = 0; k < brd.cellInBoard.length; k++) {
		var cell = brd.cellInBoard[k];
		cell.selected = false;
	}	
}


// Sets mouseX and mouseY variables taking into account padding and borders
function getMouse(e) {
	var element = canvas;
	var offsetX = 0;
	var offsetY = 0;

	// Calculate offsets
	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}	

	// Calculate the mouse location
	mouseX = e.pageX - offsetX;
	mouseY = e.pageY - offsetY;

	// Calculate the change in mouse position for the last
	// time getMouse was called
	changeInX = mouseX - lastMouseX;
	changeInY = mouseY - lastMouseY;

	// Store the current mouseX and mouseY positions
	lastMouseX = mouseX;
	lastMouseY = mouseY;
}	
