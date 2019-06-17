import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Birds extends Sprite{
    constructor(){
        const img = Sprite.getImage('birds');
        super(img,0,0,img.width,img.height,0,0,img.width,img.height);
        // 小鸟的宽34，高是24，上下边距10，左右边距9
        this.clippingX = [9,9+34+18,9+34+18+34+18]; // 每只小鸟剪裁的x坐标
        this.clippingY = [10,10,10]; // 剪裁的y坐标
        this.clippingWidth = [34,34,34]; // 剪裁的宽度
        this.clippingHeight = [24,24,24]; // 剪裁的高度
        const canvas = DataStore.getInstance().canvas; // 获取canvas
        const birdX = canvas.width/4; // 小鸟的x坐标
        this.birdsX = [birdX,birdX,birdX]; // 实际每只小鸟的x坐标
        const land = Sprite.getImage('land');
        const birdY = (canvas.height-land.height)/2; // 小鸟的y坐标
        this.birdsY = [birdY,birdY,birdY]; // 每只的y坐标
        this.birdsWidth = [34,34,34]; // 渲染的宽度
        this.birdsHeight = [24,24,24]; // 渲染的高度
        this.y = [birdY,birdY,birdY]; // 每只小鸟的实际y坐标
        this.step = 0; // 小鸟三种状态的切换
        this.count = 0; // 计数器
        this.time = 0; // 自由落体的时间
    }
    draw(){
        const speed = 0.2;
        this.count += speed;
        if(this.step>=2){
            this.count = 0;
        }
        this.step = Math.floor(this.count);
        // 自由落体运动
        const g = 0.98/3;
        const up = 30; // 向上的偏移量
        let offY = g*this.time*(this.time-30)/2;
        for(let i=0;i<3;i++){
            this.birdsY[i] = this.y[i] + offY;
        }
        this.time++;
        super.draw(
            this.img,this.clippingX[this.step],this.clippingY[this.step],
            this.clippingWidth[this.step],this.clippingHeight[this.step],
            this.birdsX[this.step],this.birdsY[this.step],
            this.birdsWidth[this.step],this.birdsHeight[this.step]
        )
    }
}