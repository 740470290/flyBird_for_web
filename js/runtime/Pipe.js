import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


export class Pipe extends Sprite{
    constructor(img,top){
        const x = DataStore.getInstance().canvas.width;
        super(img,0,0,img.width,img.height,x,0,img.width,img.height);
        this.top = top;
        this.speed = 2; // 移动速度
    }
    draw(){
        this.x = this.x - this.speed;
        super.draw();
    }
}








