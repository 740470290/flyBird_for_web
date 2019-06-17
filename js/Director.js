import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

// 导演类，控制游戏的逻辑

export class Director{
    constructor(){
        // 获取变量池
        this.dataStore = DataStore.getInstance();

    }
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }
    // 创建水管
    createPipes(){
        const minTop = this.dataStore.canvas.height/8;
        const maxTop = this.dataStore.canvas.height/2;
        const top = Math.random()*(maxTop-minTop)+minTop;
        const pipes = this.dataStore.get('pipes');
        pipes.push(new UpPipe(top));
        pipes.push(new DownPipe(top));
    }

    // 点击屏幕，小鸟向上运动一段距离
    birdsUp(){
        for(let i=0;i<3;i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }
    // 判断小鸟与某个水管是否撞击
    isStrike(bird,pipe){
        let strike = true;
        if(
            bird.right < pipe.left ||
            bird.bottom < pipe.top ||
            bird.left > pipe.right ||
            bird.top > pipe.bottom
        ){
            strike = false;
        }
        return strike;
    }

    // 判断游戏是否还活着(小鸟有没有撞上去)
    check(){
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pipes = this.dataStore.get('pipes');
        const score = this.dataStore.get('score');

        // 判断小鸟有没有撞上天花板或地板
        if(birds.birdsY[0]<0 || birds.birdsY[0]+birds.birdsHeight[0]>land.y){
            // console.log('撞上了');
            // 撞上了，说明游戏结束了
            this.isGameOver = true;
            return ;
        }
        // 构建小鸟的盒子模型
        const birdBorder = {
            top: birds.birdsY[0],
            right: birds.birdsX[0] + birds.birdsWidth[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0]
        }
        // 每一个水管的模型
        for(let i=0;i<pipes.length;i++){
            const pipe = pipes[i];
            const pipeBorder = {
                top: pipe.y,
                right: pipe.x + pipe.width,
                bottom: pipe.y + pipe.height,
                left: pipe.x
            }
            // 判断小鸟与水管是否撞击
            if(this.isStrike(birdBorder,pipeBorder)){
                // 撞上了
                this.isGameOver = true;
                return ;
            }
        }
        // 判断是否加分
        if(birds.birdsX[0]>pipes[0].x+pipes[0].width && score.addScore){
            score.scoreNumber++;
            score.addScore = false; // 关闭加分
            // 震动
         
        }
    }

    // 游戏运行的方法
    run(){
        this.check();
        if(!this.isGameOver){ // 游戏正在运行
            this.dataStore.get('background').draw();
            const pipes = this.dataStore.get('pipes');
            // 删除出界的水管
            if(pipes[0].x<=-pipes[0].width&&pipes.length==4){
                pipes.shift();
                pipes.shift();
                this.dataStore.get('score').addScore = true; // 开启加分 
            }
            
            // 判断水管的位置，决定是否创建一组新的水管
            if(pipes[0].x<=this.dataStore.canvas.width/2-pipes[0].width&&pipes.length==2){
                this.createPipes();
            }
            
            for(let i=0;i<pipes.length;i++){
                pipes[i].draw();
            }
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('score').draw();
            requestAnimationFrame(()=>this.run());
        }else{ // 游戏结束了
            this.dataStore.get('background').draw();
            this.dataStore.get('pipes').forEach(function(p){
              p.draw()
            })
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('startButton').draw();
            // 销毁数据
            this.dataStore.destroy();
        }
    }
}