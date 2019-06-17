import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class DownPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage('pipeDown');
        super(img,top);
    }
    draw(){
        let gap = DataStore.getInstance().canvas.height/5;
        this.y = this.top + gap;
        super.draw();
    }
}

