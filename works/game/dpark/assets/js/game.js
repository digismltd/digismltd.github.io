var Game = {
  BOOT: 'BOOT',
  RELOAD: 'RELOAD',
  INIT: 'INIT',
  HOME: 'HOME',
  GAME: 'GAME',
  PLAY: 'PLAY',
  GIFT: 'GIFT',
  OVER: 'OVER',
  LAST: 'LAST'
};
// ***** INIT GAME.BOOT
Game.BootState = function (game) {
  Game.world_margin = 0;
  Game.shake = null;
};
Game.BootState.prototype = {
  preload: function () {
    console.log('- game.boot preload')
    Game.state = Game.BOOT
    this.stage.backgroundColor = '#000000'

    // PRELOAD BACKGROUND
    this.load.image('introBackground100', './assets/game/1000/intro_background_100.jpg')

    this.load.image('homeBackground100', './assets/game/2000/home_background_100.jpg')
    this.load.image('homeForegroundCloud', './assets/game/2000/home_foreground_cloud.png')
    this.load.image('homeForegroundFlare1', './assets/game/2000/home_foreground_flare01.png')
    this.load.image('homeForegroundFlare2', './assets/game/2000/home_foreground_flare02.png')
    this.load.image('homeForegroundWave', './assets/game/2000/home_foreground_wave.png')
    this.load.image('homeForeground100', './assets/game/2000/home_foreground_100.png')

    this.load.image('gameBackground100', './assets/game/3000/game_background_100.jpg')

    this.load.image('playBackground100', './assets/game/4000/play_background_100.jpg')
    this.load.image('playForegroundDoor', './assets/game/4000/play_foreground_door.png')
    this.load.image('playForegroundRocks', './assets/game/4000/play_foreground_rocks.png')
    this.load.image('playSpriteKnob', './assets/game/4000/play_sprite_knob.png')
    this.load.image('playSpriteCapsule', './assets/game/4000/play_sprite_capsule.png')

    this.load.image('giftBackground100', './assets/game/5000/gift_background_100.jpg')
    this.load.image('giftBackgroundLight', './assets/game/5000/gift_background_light.png')
    this.load.image('giftSpriteCapsule', './assets/game/5000/gift_sprite_capsule.png')
    this.load.image('giftForegroundScroll', './assets/game/5000/gift_foreground_scroll.png')

    this.load.image('overBackground100', './assets/game/6000/over_background_100.jpg')

    this.load.image('brand_chicco', './assets/game/logo/chicco.png')
    this.load.image('brand_chowtaifook', './assets/game/logo/chowtaifook.png')
    this.load.image('brand_fullhousekitchen', './assets/game/logo/fullhousekitchen.png')
    this.load.image('brand_hallmark', './assets/game/logo/hallmark.png')
    this.load.image('brand_ingridmillet', './assets/game/logo/ingridmillet.png')
    this.load.image('brand_mizone', './assets/game/logo/mizone.png')
    this.load.image('brand_puremassage', './assets/game/logo/puremassage.png')
    this.load.image('brand_trendyland', './assets/game/logo/trendyland.png')
    this.load.image('brand_verdee', './assets/game/logo/verdee.png')
  },
  create: function () {
    console.log('- game.boot create')
    var _this = this

    // CONFIG LAYOUT
    // REF: http://www.rocketshipgames.com/blogs/tjkopena/2014/10/fullscreen-scaling-in-phaser/
    // REF: http://mightyfingers.com/tutorials/advanced/simple-scaling-and-fullscreen/
    _this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    _this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    _this.scale.pageAlignHorizontally = true
    _this.scale.pageAlignVertically = true
    // _this.scale.setScreenSize(true)
    _this.scale.refresh()

    // CONFIG PHYSICS ENGINE
    _this.physics.startSystem(Phaser.Physics.ARCADE)
    _this.world.enableBody = true

    // CONFIG KEYBOARD
    _this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR])
    // CONFIG INPUT
    _this.input.maxPointers = 1 // SINGLE TOUCH

    // LOAD PLUGIN
    // var shake = new Phaser.Plugin.Shake(this)
    Game.shake = _this.game.plugins.add(new Phaser.Plugin.Shake(this))

    // SET IMAGES
    _this.add.image(_this.world.centerX, _this.world.centerY, 'introBackground100')
    .anchor.set(0.5)

    // GLOBAL INPUT LISTENER
    _this.game.input.keyboard.addCallbacks(this, null, null, function (char) {
      // console.log('[GLOBALHIT ' + char + ']')
      if (char === '-') { // RESIZE DOWN WORLD
        if (Game.world_margin < 100) {
          Game.world_margin++
          $('#app').css('margin', Game.world_margin + '%')
        }
      } else if (char === '=') { // RESIZE UP WORLD
        if (Game.world_margin > 0) {
          Game.world_margin--
          $('#app').css('margin', Game.world_margin + '%')
        }
      // } else if (char === '0') { // RESET WORLD SIZE
      //   Game.world_margin = 0
      //   $('#app').css('margin', Game.world_margin + '%')
      } else if (char === '0') {
        _this.game.scale.startFullScreen() // USE FULLSCREEN
      }
    })

    _this.state.start(Game.INIT) // ===> INIT
  }
};

// ***** INIT GAME.INIT
Game.ReloadState = function (game) {};
Game.ReloadState.prototype = {
  create: function () {
    console.log('- game.reload create')
    this.state.start(Game.INIT) // ===> INIT
  }
}

Game.InitState = function (game) {};
Game.InitState.prototype = {
  create: function () {
    console.log('- game.init create')
    var _this = this

    // SET IMAGES
    _this.add.image(_this.world.centerX, _this.world.centerY, 'introBackground100')
    .anchor.set(0.5)

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // INPUT LISTENER
    _this.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { // HIT S GOTO GAME
      _this.input.keyboard.removeKey(Phaser.Keyboard.ENTER) // PREVENT DUPLICATE CLICK
      console.log('[HIT SPACEBAR]')
      _this.state.start(Game.HOME) // ===> HOME
    })
  }
};

// ***** INIT GAME.HOME
Game.HomeState = function (game) {
  this._foregroundCloud = null
}
Game.HomeState.prototype = {
  create: function () {
    console.log('- game.home create');
    var _this = this
    Game.state = Game.HOME

    // SET IMAGES
    var background100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'homeBackground100')
    background100.anchor.set(0.5)
    // REF: http://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
    _this._foregroundCloud = _this.add.tileSprite(0, _this.game.height - _this.cache.getImage('homeForegroundCloud').height, _this.game.width, _this.cache.getImage('homeForegroundCloud').height, 'homeForegroundCloud')
    var foregroundFalre1 = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'homeForegroundFlare1')
    foregroundFalre1.anchor.set(0.5)
    var foregroundFalre2 = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'homeForegroundFlare2')
    foregroundFalre2.anchor.set(0.5)
    var foregroundWave = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'homeForegroundWave')
    foregroundWave.anchor.set(0.5)
    var foreground100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'homeForeground100')
    foreground100.anchor.set(0.5)

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // RUN ANIMATION
    _this.add.tween(foregroundFalre1).to({ alpha: 0.5 }, 1000, Phaser.Easing.Linear.None, true, 0, 2500) // FADEIN/FADEOUT
    _this.add.tween(foregroundFalre2).to({ alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true, 0, 5000) // FADEIN/FADEOUT

    var waveTween = _this.add.tween(foregroundWave).to({ y: foregroundWave.y + 25 }, 2500, Phaser.Easing.Linear.InOut, true, 1000) // MOVEDOWN/MOVEUP
    waveTween.yoyo(true, 100)
    waveTween.repeat()

    // INPUT LISTENER
    _this.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { // HIT S GOTO GAME
      _this.input.keyboard.removeKey(Phaser.Keyboard.ENTER) // PREVENT DUPLICATE CLICK
      console.log('[HIT ENTER]')
      _this.state.start(Game.GAME) // ===> GAME
    }, this)
  },
  update: function () {
    // RUN ANIMATION LOOP
    this._foregroundCloud.tilePosition.x -= 0.5
  }
};

// // ***** INIT GAME.GAME
Game.GameState = function (game) {
}
Game.GameState.prototype = {
  create: function () {
    console.log('- game.game create');
    var _this = this
    Game.state = Game.GAME

    // SET IMAGES
    var background100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'gameBackground100')
    background100.anchor.set(0.5)

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // START HERE, RUN ANIMATION
    _this.add.tween(background100).to({ alpha: 0.5 }, 500, Phaser.Easing.Linear.None) // FADEIN
    _this.add.tween(background100.scale).to({ x: 1.5, y: 1.5, alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 1000) // ZOOMOUT
    .onComplete.add(function () {
      _this.state.start(Game.PLAY) // ===> PLAY
    }, this)
  }
}

// // ***** INIT GAME.PLAY
Game.PlayState = function (game) {
}
Game.PlayState.prototype = {
  create: function () {
    console.log('- game.play create');
    var _this = this
    Game.state = Game.PLAY

    // SET IMAGES
    var background100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'playBackground100')
    background100.anchor.set(0.5)
    var capsuleSprite = _this.add.sprite(_this.world.centerX + 30, _this.world.centerY, 'playSpriteCapsule')
    capsuleSprite.anchor.set(0.5)
    var foregroundDoor = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'playForegroundDoor')
    foregroundDoor.anchor.set(0.5)
    var foregroundRocks = _this.add.image(_this.world.centerX, _this.world.centerY, 'playForegroundRocks')
    foregroundRocks.anchor.set(0.5)
    var knobSprite = _this.add.sprite(_this.world.centerX + 5, _this.world.centerY, 'playSpriteKnob')
    knobSprite.anchor.set(0.5)

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // CONFIG
    _this.physics.enable(capsuleSprite, Phaser.Physics.ARCADE)
    capsuleSprite.body.collideWorldBounds = true

    _this.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { // HIT SPACE TO CONTINUE
      _this.input.keyboard.removeKey(Phaser.Keyboard.ENTER)
      console.log('[HIT ENTER]')
      _this.add.tween(knobSprite).to({ angle: 90 }, 500, Phaser.Easing.Linear.None, true) // ROTATE RIGHT
      .onComplete.add(function () {
        capsuleSprite.body.gravity.y = 2500
        capsuleSprite.body.bounce.y = 0.2
        _this.add.tween(knobSprite).to({ angle: 180 }, 1500, Phaser.Easing.Linear.None, true) // ROTATE RIGHT
        .onComplete.add(function () {

// SAVE GIFT TO DB
          // app.saveGift(function () {
          //   _this.state.start(Game.GIFT) // ===> GIFT
          // })
          localStorage.removeItem('NEXTGIFT') // KILL NEXT ITEM
          localStorage.setItem('GIFT', JSON.stringify(app.data.gift)) // SAVE LAST ITEM

          _this.state.start(Game.GIFT) // ===> GIFT

        }, this)
      }, this)
    }, this)
  }
}

// // ***** INIT GAME.GIFT
Game.GiftState = function (game) {
}
Game.GiftState.prototype = {
  create: function () {
    console.log('- game.gift create');
    var _this = this
    Game.state = Game.GIFT

    // SET IMAGES
    var background100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'giftBackground100')
    background100.anchor.set(0.5)
    var backgroundLight = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'giftBackgroundLight')
    backgroundLight.anchor.set(0.5)
    var capsuleSprite = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'giftSpriteCapsule')
    capsuleSprite.anchor.set(0.5)
    var foregroundScroll = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'giftForegroundScroll')
    foregroundScroll.anchor.set(0.5)
    foregroundScroll.scale.set(0) // HIDE

    var hasBrand = (app.data.gift.brand !== undefined);

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // ADD TEXT ON GIFT
    var name = 'THANK YOU';
    var giftText = _this.add.text(Math.floor(foregroundScroll.x + foregroundScroll.width / 2), Math.floor(foregroundScroll.y + foregroundScroll.height / 2) + ((hasBrand) ? 192 : 0), name, {
      font: '48px Arial',
      fontWeight: 'bold',
      fill: '#ffffff',
      wordWrap: false,
      align: 'center'
    })
    giftText.anchor.set(0.5)
    giftText.scale.set(0) // HIDE

    // START HERE
    Game.shake.shake(20, capsuleSprite) // SHAKE
    _this.add.tween(capsuleSprite).to({ alpha: 0 }, 1, Phaser.Easing.Linear.None, true, 1500) // FADEIN
    .onComplete.add(function () {
      // RUN ANIMATION
      _this.add.tween(backgroundLight).to({ angle: 90 }, 5000, Phaser.Easing.Linear.None, true) // ROTATE
      // .repeat(10) // TODO: ANIMATION SLOW DOWN SYSTEM?

// SAVE GIFT TO DB (MAY BE FAILED)
      // app.saveGift()
      // localStorage.removeItem('NEXTGIFT') // KILL NEXT ITEM
      // localStorage.setItem('GIFT', JSON.stringify(app.data.gift)) // SAVE LAST ITEM

      foregroundScroll.scale.set(1) // SHOW
      giftText.scale.set(1) // SHOW

      if (hasBrand) {
        var brandSprite = _this.add.sprite(_this.world.centerX, _this.world.centerY - 40, 'brand_' + app.data.gift.brand)
        brandSprite.anchor.set(0.5)
      }

      _this.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { // HIT S GOTO OVER
        _this.input.keyboard.removeKey(Phaser.Keyboard.ENTER)
        console.log('[HIT ENTER]')
        _this.state.start(Game.OVER) // ===> OVER
      }, this)
    })
  }
}

// ***** INIT GAME.OVER
Game.OverState = function (game) {
}
Game.OverState.prototype = {
  create: function () {
    console.log('- game.over create');
    var _this = this
    Game.state = Game.OVER

    // SET IMAGES
    var background100 = _this.add.image(_this.world.centerX, _this.world.centerY, 'overBackground100')
    background100.anchor.set(0.5)

    // ADD LICENSE TEXT
    var licenseText = _this.add.text(_this.world.width, _this.world.height - 80, localStorage.getItem('LICENSE'), {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: false
    })
    licenseText.x = _this.world.width - licenseText.width - 140

    // START HERE
    _this.add.tween(background100).to({ alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true, 3000) // FADEIN
    .onComplete.add(function () {
      // this.state.start(Game.HOME) // ===> HOME
      // window.location.reload() // ===> RELOAD WINDOW <===
      _this.state.start(Game.RELOAD) // ===> RELOAD
    })
  }
}
