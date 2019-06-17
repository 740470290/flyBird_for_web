import { DataStore } from "../base/DataStore.js";

export class Score{
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.scoreNumber = 0;
        this.addScore = true;
    }
    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#de335e';
        this.ctx.fillText(
            this.scoreNumber,
            this.dataStore.canvas.width/2,
            this.dataStore.canvas.height/20);
    }
}