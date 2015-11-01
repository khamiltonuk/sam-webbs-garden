//Reseach jetpack;
var playState = {
    playerDie: function () {

        if (!this.player.alive) {
            return;
        }
        this.player.kill();
        this.deadSound.play();

        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 600, null, 15);

        if( this.lives > 0 ){
            this.lives -= 1;
            this.livesLabel.text = 'lives: ' + this.lives;
            this.player.reset(game.world.centerX, game.world.centerY);

        } else {
            game.time.events.add(1000, this.startMenu, this);

        }
        //this.music.stop();
    },
    startMenu: function () {
        game.state.start('menu');
    },
    updateCoinPosition: function () {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, // Top row
            {x: 60, y: 140}, {x: 440, y: 140}, // Middle row
            {x: 130, y: 300}, {x: 370, y: 300} // Bottom row
        ];

        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x === this.coin.x){
                coinPosition.splice(i,1);
            }
        };

        // _.remove(coinPosition, function(obj){
        //     return cur
        // });

        this.coin.scale.setTo(1,1);

        var newPosition = coinPosition[
            game.rnd.integerInRange(0, coinPosition.length - 1)];

        this.coin.reset(newPosition.x, newPosition.y);
    },
    takeCoin: function (player, coin) {
        this.coinSound.play();
        this.coin.scale.setTo(0,0);

        this.updateCoinPosition();
        //game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();
        game.global.score += 5;
        game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 50).to({x: 1, y: 1}, 150) .start();
        this.scoreLabel.text = 'score: ' + game.global.score;
    },
    movePlayer: function () {

        if (this.cursor.left.isDown || this.moveLeft ) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown || this.moveRight ) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
        }
        if (this.cursor.up.isDown) {
            this.jumpPlayer();
        }
    },
    addMobileInputs: function () {
        this.jumpButton = game.add.sprite(350, 247, 'jumpButton')
        this.jumpButton.inputEnabled = true;
        this.jumpButton.alpha = 0.3;
        this.jumpButton.events.onInputDown.add(this.jumpPlayer, this );

        //Move variables
        this.moveLeft = false;
        this.moveRight = false;


        this.leftButton = game.add.sprite(50, 247, 'leftButton')
        this.leftButton.inputEnabled = true;
        this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
        this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this);
        this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
        this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
        this.leftButton.alpha = 0.3;

        this.rightButton = game.add.sprite(130, 247, 'rightButton')
        this.rightButton.inputEnabled = true;
        this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this);
        this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this);
        this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
        this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
        this.rightButton.alpha = 0.3;
    },
    jumpPlayer: function () {
        if (this.player.body.touching.down) {
            this.jumpSound.play();
            this.player.body.velocity.y = -320;
        }
    },
    addEnemy: function () {
        var enemy = this.enemies.getFirstDead();
        if(!enemy){
            return;
        }
        // if ( enemy.index % 0  === 0 ) {
        //     enemy.body.gravity.y = 10000;
        //     enemy.body.velocity.x = 300 * Phaser.Math.randomSign();
        // } else {
            enemy.body.gravity.y = 500;
            enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        // }
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },
    createWorld: function () {

    },
    create: function () {

        this.lives = 3;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.music = game.add.audio('music');
        //this.music.loop = true;
        //this.music.play();
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');

        this.player = game.add.sprite(game.world.centerX, game.world.centerY,'player');
        this.player.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;

        //this.player.body.setSize(20, 20, -5, 0)

        if (!game.device.desktop) {
            this.addMobileInputs();
        }

        //
        //this.player.animations.add('right',[1,2], 8, true);
        //this.player.animations.add('left',[3,4], 8, true);

        // Add coins
        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);

        // Display Score
        var fontStyle = {font: '18px Arial', fill: '#ffffff'};
        this.livesLabel = game.add.text(200, 30, 'lives: 3 ', fontStyle );

        this.scoreLabel = game.add.text(30, 30, 'score: 0', fontStyle );
        game.global.score = 0;

        // Add enemies
        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.enemies.createMultiple(10, 'enemy');
        this.nextEnemy = 0;

        //Walls
        this.walls = game.add.group();
        this.walls.enableBody = true;
        game.add.sprite(0, 0, 'flowerBed1', 0, this.walls); // left
        game.add.sprite(480, 0, 'flowerBed2', 0, this.walls); // right
        game.add.sprite(0, 0, 'flowerBed3', 0, this.walls); // top left
        game.add.sprite(300, 0, 'flowerBed4', 0, this.walls); // top right
        game.add.sprite(0, 320, 'flowerBed5', 0, this.walls); // bottom left
        game.add.sprite(300, 320, 'house', 0, this.walls); // bottom right

        game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
        game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);

        this.walls.setAll('body.immovable', true);

        this.cursor = game.input.keyboard.createCursorKeys();

        this.createWorld();


    },
    update: function () {
        //called every 60 times per second
        //this.sprite.angle += 1;

        if ( this.nextEnemy < game.time.now ) {
            var start = 4000,
                end = 1000,
                score = 100;
            var delay = Math.max(start - ( start - end )* game.global.score/score, end);
            this.addEnemy();

            this.nextEnemy = game.time.now + delay;
        }


        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        this.movePlayer();

        if(!this.player.inWorld){
            this.playerDie();
        }
    }
}
