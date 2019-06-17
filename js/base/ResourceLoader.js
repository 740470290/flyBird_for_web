// 资源加载器
import {Resources} from './Resources.js';

export class ResourceLoader{
    constructor(){
        this.map = new Map(Resources);
        // console.log(this.map);
        // 遍历map，将其value替换为图片对象
        for(let [key,val] of this.map){
            const img = new Image();
          // const img = wx.createImage();
            img.src = val;// 将map中的路径赋值给img的src属性
            // 将src替换原来的字符串
            this.map.set(key,img);
        }
    }
    // 定义一个资源加载完成的方法
    onloaded(callback){
        let count = 0; // 计数器，统计加载的数目
        for(let val of this.map.values()){
            val.onload = ()=>{
                count++;
                if(count>=this.map.size){
                    callback(this.map);
                }
            }
        }
    }

}