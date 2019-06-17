import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 地板

export class Land extends Sprite{
    constructor(){
        const img = Sprite.getImage('land');
        const y = DataStore.getInstance().canvas.height - img.height;
        super(img,0,0,img.width,img.height,0,y,img.width,img.height);
        this.landX = 0; // 地板的x坐标
        this.speed = 2; // 移动的速度
    }
    draw(){
        this.landX = this.landX + this.speed;
        if(this.landX>=this.srcW-DataStore.getInstance().canvas.width){
            this.landX = 0;
        }
        super.draw(this.img,0,0,this.srcW,this.srcH,-this.landX,this.y,this.width,this.height);
    }
}