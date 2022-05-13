class Game {
  constructor() {
    this.resettile= createElement("h2");
    this.resetbtn= createButton("");
  }


  getState(){
    var gameStateRef= database.ref("gameState");
    gameStateRef.on("value",function(data){
      gameState= data.val()
    });
  }

  updateState(state){
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
   
    player = new Player();

    playerCount= player.getCount();
    form = new Form();
    form.display();
    player1= createSprite(width/2+700,height-500);
    player1.addImage("playerone",player_left1);
    player1.scale=0.9;

    player2= createSprite(width/2-700,height-500);
    player2.addImage("playertwo",player_left2);
    player2.scale=0.5;

    players=[player1,player2];
    
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resettile.html("Reset the Game");
    this.resettile.class("resetText");
    this.resettile.position(width/2+500, height/2-350);
    this.resetbtn.class("resetButton");
    this.resetbtn.position(width/2+550, height/2-400);
  }

  play() {
    this.handleElements();
    this.handleResetGame();
   

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
     // console.log(courtImg.positionX);
      image(courtImg, 0 ,0,width,height);

      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls(){
   
    // player.positionY= mouseY
    // player.update();

    if(keyIsDown("UP_ARROW")){
      player.positionY+=5;
      console.log(player.positionY);
      player.updateState();
    }
    }

    handleResetGame(){
      this.resetbtn.mousePressed(()=>{
        database.ref("/").set({
          playerCount:0,
          gameState:0,
          players:{},
        });
        window.location.reload();
      })
    }
   
 }
