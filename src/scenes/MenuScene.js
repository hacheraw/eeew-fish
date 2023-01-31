import { CST } from "../CST";
import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    });
  }

  init(data) {
    console.log(data);
    console.log("I GOT IT");
  }

  preload() {

  }

  create() {
    const canvasCenterX = this.game.renderer.width / 2;
    const canvasCenterY = this.game.renderer.height / 2;
    const btnPescarCenter = this.textures.get("btn_pescar").getSourceImage().width / 2;
    const btnAparejosCenter = this.textures.get("btn_aparejos").getSourceImage().width / 2;
    const btnRendirseCenter = this.textures.get("btn_rendirse").getSourceImage().width / 2;

    this.add.image(canvasCenterX, canvasCenterY, "bg_menu").setDepth(0);
    const playBtn = this.add.image(canvasCenterX + btnPescarCenter, 120, "btn_pescar").setDepth(1);
    const optionsBtn = this.add.image(canvasCenterX + btnAparejosCenter, 200, "btn_aparejos").setDepth(1);
    const exitBtn = this.add.image(canvasCenterX + btnRendirseCenter, 260, "btn_rendirse").setDepth(1);

    const selectSprite = this.add.sprite(canvasCenterX, canvasCenterY, "fisherman_idle").setDepth(2);
    selectSprite.setVisible(false);

    const playerKeys = {
      attack: {
        frameRate: 6,
        repeat: -1,
        frames: 6
      },
      death: {
        frameRate: 6,
        repeat: 1,
        frames: 6
      },
      fish: {
        frameRate: 4,
        repeat: -1,
        frames: 4
      },
      hook: {
        frameRate: 6,
        repeat: 1,
        frames: 6
      },
      hurt: {
        frameRate: 2,
        repeat: 1,
        frames: 2
      },
      idle: {
        frameRate: 4,
        repeat: -1,
        frames: 4
      },
      row: {
        frameRate: 4,
        repeat: -1,
        frames: 4
      },
      walk: {
        frameRate: 4,
        repeat: -1,
        frames: 6
      }
    };

    // Animación del personaje
    Object.keys(playerKeys).forEach((key) => {
      this.anims.create({
        key,
        frameRate: playerKeys[key].frameRate,
        repeat: playerKeys[key].repeat,
        frames: this.anims.generateFrameNumbers(`fisherman_${key}`, {
          frames: [...Array(playerKeys[key].frames).keys()]
        })
      });
    });

    // Botones
    [playBtn, optionsBtn, exitBtn].forEach(btn => {
      btn.setInteractive();

      btn.on("pointerover", () => {
        selectSprite.x = btn.x - (btn.width / 2) - selectSprite.width;
        selectSprite.y = btn.y;
        selectSprite.setVisible(true);
        selectSprite.play("idle");
      });
      btn.on("pointerout", () => {
        selectSprite.setVisible(false);
      });
      btn.on("pointerup", () => {

      });
    });
  }
}
