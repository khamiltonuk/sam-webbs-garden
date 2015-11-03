var loadState = {
    preload: function () {
        var progressBar, loadingLabel, fontStyle;
        fontStyle = {font: '30px Arial', fill: '#ffffff'};
        loadingLabel = game.add.text(game.world.centerX, 150,
             'loading...', fontStyle);
        loadingLabel.anchor.setTo(0.5, 0.5);

        progressBar = game.add.sprite(game.world.centerX, 250,
            'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        //Controls
        game.load.image('jumpButton', 'assets/images/jumpButton.png');
        game.load.image('rightButton', 'assets/images/rightButton.png');
        game.load.image('leftButton', 'assets/images/leftButton.png');

        //Images
        game.load.image('flowerBed1', 'assets/images/flower-bed-2.png');
        game.load.image('flowerBed2', 'assets/images/flower-bed-2.png');
        game.load.image('flowerBed3', 'assets/images/flower-bed-3.png');
        game.load.image('flowerBed4', 'assets/images/flower-bed-4.png');
        game.load.image('flowerBed5', 'assets/images/flower-bed-5.png');
        game.load.image('flowerBed6', 'assets/images/flower-bed-6.png');
        game.load.image('coin', 'assets/images/coin.png');
        game.load.image('enemy', 'assets/images/enemy.png');
        game.load.image('flowers', 'assets/images/flowers.png');
        game.load.image('house', 'assets/images/house.png');
        game.load.image('background', 'assets/images/soil.png');





        game.load.spritesheet('player', 'assets/images/player2.png', 20, 20);
        game.load.spritesheet('mute', 'assets/images/muteButton.png', 28, 22);

        // Audio
        //game.load.audio('coin', ['assets/audio/coin.ogg', 'assets/audio/coin.mp3']);
        //game.load.audio('dead', ['assets/audio/dead.ogg', 'assets/audio/dead.mp3']);

        //game.load.audio('music', ['assets/audio/music.ogg', 'assets/audio/music.mp3']);


    },
    create: function () {
        //game.state.start('menu');
        game.state.start('play');
    }
};
