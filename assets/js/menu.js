var menuState = {
    toggleSound: function () {
        game.sound.mute = ! game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    },
    create: function () {


        game.add.image(0, 0, 'background');
        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', 0);
        }
        if (game.global.score > localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', game.global.score);
        }
        if (game.sound.mute) {
            this.muteButton.frame = 1;
        }

        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;

        var nameLable = game.add.text(game.world.centerX, -50, 'Sam Webbs Garden',
            {font: '50px Geo', fill: '#ffffff' });
        nameLable.anchor.setTo(0.5, 0.5);

        var text = 'Score: ' + game.global.score + '\nBest score: ' + localStorage.getItem('bestScore');

        var scoreLable = game.add.text(game.world.centerX, game.world.centerY,
            text,
            { font: '25px Arial', fill: '#ffffff' });
        scoreLable.anchor.setTo(0.5, 0.5);

        var startText;

        if(game.device.desktop) {
            startText = 'press the up arrow key to start';
        } else {
            startText = 'touch the screen to start';
        }

        var startLabel = game.add.text(game.world.centerX, game.world.height - 80,
            startText,
            {font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(0.5, 0.5);

        var tween = game.add.tween(nameLable).to({y: 80 }, 1000).easing(Phaser.Easing.Bounce.Out).start();

        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);

        game.input.onDown.addOnce(this.start, this);
    },
    start: function() {
        game.state.start('play');
    }
}
