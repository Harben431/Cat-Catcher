let game;

window.onload = function () {
    let config = {
        type: Phaser.AUTO,
        width: 1720,
        height: 900,
        scale: {
            mode: Phaser.Scale.FIT,     
            autoCenter: Phaser.Scale.CENTER_BOTH 
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [MenuScene, GameScene, WinScene, CreditScene]
    };

    game = new Phaser.Game(config);
};

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('menuBackground', 'images/bangkerohan.jpeg');
    }

    create() {
        this.add.image(0, 0, 'menuBackground').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(860, 80, 'VANcouver!', {
            fontFamily: 'Bangers',
            fontSize: '100px',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        createButton(this, 860, 200, 'PLAY', () => this.scene.start('GameScene'));
        createButton(this, 860, 300, 'CREDITS', () => this.scene.start('CreditScene'));
        createButton(this, 860, 400, 'QUIT', () => alert("You exited the game."));
    }
}

class CreditScene extends Phaser.Scene {
    constructor() {
        super("CreditScene");
    }

    preload() {
        this.load.image('credBackground', 'images/chad.jpg');
    }

    create() {
        this.add.image(0, 0, 'credBackground').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        createCreditBox(this, 860, 200, 'FULL NAME: ARGILLE JOHN HARVEY G. ATIENZA');
        createCreditBox(this, 860, 270, 'SECTION: A224');
        createCreditBox(this, 860, 340, 'PROGRAM: EMC');

        createButton(this, 860, 500, 'BACK', () => this.scene.start('MenuScene'));
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image('player', 'images/cor.png');
        this.load.image('goal', 'images/rblxx.png');
        this.load.image('background', 'images/road.jpg');
        this.load.audio('winSound', 'audio/horn.mp3');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.player = this.physics.add.sprite(250, 600, "player").setScale(0.5).setCollideWorldBounds(true);
        this.goal = this.physics.add.sprite(1500, 700, "goal").setScale(0.2);

        this.score = 0;
        this.textScore = this.add.text(50, 50, "Score: 0", {
            fontFamily: 'Bangers',
            fontSize: '60px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.winSound = this.sound.add('winSound', { volume: 0.5 });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.goal, this.WinGame, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.x -= 5;
            this.player.setFlipX(true);
        }
        if (this.cursors.right.isDown) {
            this.player.x += 5;
            this.player.setFlipX(false);
        }
        if (this.cursors.up.isDown) {
            this.player.y -= 5;
        }
        if (this.cursors.down.isDown) {
            this.player.y += 5;
        }
    }

    WinGame() {
        this.goal.disableBody(true, true);
        this.winSound.play();
        this.score += 100;
        this.textScore.setText("Score: " + this.score);
        this.scene.start('WinScene');
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image('winBackground', 'images/dab.png');
    }

    create() {
        this.add.image(0, 0, 'winBackground').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(860, 150, 'HONK HONK!', {
            fontFamily: 'Bangers',
            fontSize: '80px',
            fill: '#FFD700',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        createButton(this, 860, 300, 'RETRY', () => this.scene.start('GameScene'));
        createButton(this, 860, 400, 'MAIN MENU', () => this.scene.start('MenuScene'));
    }
}

function createButton(scene, x, y, text, callback) {
    const width = 300;
    const height = 70;

    const graphics = scene.add.graphics();
    graphics.fillStyle(0x000000, 0.6); 
    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, 20);

    const buttonText = scene.add.text(x, y, text, {
        fontSize: '40px',
        fill: '#FFD700',
        fontFamily: 'Bangers'
    }).setOrigin(0.5).setInteractive();

    buttonText.on('pointerdown', callback);
    buttonText.on('pointerover', () => buttonText.setStyle({ fill: '#FFFFFF' }));
    buttonText.on('pointerout', () => buttonText.setStyle({ fill: '#FFD700' }));
}

function createCreditBox(scene, x, y, text) {
    const width = 900;
    const height = 60;

    const graphics = scene.add.graphics();
    graphics.fillStyle(0x000000, 0.6); 
    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, 15);

    scene.add.text(x, y, text, {
        fontSize: '32px',
        fill: '#FFD700',
        fontFamily: 'Bangers'
    }).setOrigin(0.5);
}
