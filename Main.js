import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Director } from "./js/Director.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";
// 游戏的主程序，初始化整个游戏过程中的数据
export class Main{
    constructor(){
        console.log('游戏主程序:Main.js');
      this.canvas = document.getElementById('canvas');
        // this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        // const img = new Image();
        // img.src = './res/background.png';
        // img.onload = ()=>{
        //     ctx.drawImage(img,0,0,img.width,img.height);
        // }
        // 调用资源加载器
        const loader = new ResourceLoader();
        loader.onloaded(map => this.onResourceLoader(map));
        
    }
    onResourceLoader(map){
        // console.log(map);
        // 将初始化的数据保存进变量池
        // 不使用put保存的原因：put保存的是游戏时的数据，游戏结束后会销毁
        // 这些数据在游戏结束后不销毁
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.playMusic();
        // const api = new WxAPI();
        // api.getSysinfo();
        // api.getWxUser();
        // api.sendHttp();
        // api.socket();
        // api.download();
        // new Background().draw();
        // 画获取用户信息按钮
        /* const button = wx.createUserInfoButton({
          type: 'text',
          text: '获取用户信息',
          style: {
            left: 10,
            top: 76,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: '#ff0000',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
          }
        }) */
        /* button.onTap((res) => {
          // button.destroy();
          // console.log(res)
          if(res.userInfo){
            button.destroy();
            api.getWxUser();
            this.init();
          }
        }) */
        this.init();
      this.registEvent();
    }
    // 游戏的初始化
    init(){
        // 修改游戏结束的状态
        this.director.isGameOver = false;
        this.dataStore
                .put('background',new Background())
                .put('land',new Land())
                .put('pipes',[])
                .put('birds',new Birds())
                .put('startButton',new StartButton())
                .put('score',new Score())
        
        
        this.director.createPipes();
        this.director.run();
    }
    playMusic(){
      const music = wx.createInnerAudioContext();
      music.src = './audio/bgm.mp3';
      music.autoplay = true;
      music.loop = true;
    }

    registEvent(){
        this.canvas.addEventListener('touchstart',e=>{
          // wx.onTouchStart(e => {
            if(this.director.isGameOver){
                // 游戏结束了，点击重新开始
                this.init();
            }else{
                // 游戏未结束，点击小鸟向上
                this.director.birdsUp();
            }
            
        })
    }

}