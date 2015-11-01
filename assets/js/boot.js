var bootState = {

    preload: function(){
        game.load.image('progressBar', 'assets/images/flower-bed-6.png');
    },
    create: function(){
        game.state.backgroundColor = '#000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (!game.device.desktop) {

            document.body.style.background = '#000';

            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.minWidth = 250;
            game.scale.minHeight = 170;
            game.scale.maxWidth = 1000;
            game.scale.maxHeight = 680;

            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            game.scale.setScreenSize(true);
        }
        game.state.start('load');
    },

};
