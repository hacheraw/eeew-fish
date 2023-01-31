import { CST } from "../CST";
import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }

  init() {

  }

  preload() {
    this.load.image("bg_menu", "/assets/menu.jpg");
    this.load.image("btn_pescar", "/assets/pescar.png");
    this.load.image("btn_aparejos", "/assets/aparejos.png");
    this.load.image("btn_rendirse", "/assets/rendirse.png");

    // Sprites
    ["attack", "death", "fish", "hook", "hurt", "idle", "row", "walk"].forEach(action => {
      this.load.spritesheet(`fisherman_${action}`, `/assets/sprites/fisherman_${action}.png`, {
        frameHeight: 48,
        frameWidth: 48
      });
    });

    // Music
    this.load.audio("menu_music", "/assets/sounds/menu.mp3");

    // Loading bar
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x253933
      }
    });
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
      console.log(percent);
    });

    this.load.on("complete", () => {
      console.log("Carga completa");
    });
  }

  create() {
    this.add.image("bg_menu");
    this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
  }
}
