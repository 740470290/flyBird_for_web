// 变量池，保存游戏中的所有变量

export class DataStore{
    constructor(){
        console.log('创建了一个变量池');
        this.map = new Map();
    }
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    // 存
    put(key,val){
        this.map.set(key,val);
        return this;
    }
    // 取
    get(key){
        return this.map.get(key);
    }
    // 销毁数据
    destroy(){
        for(let val of this.map.values()){
            val = null;
        }
    }
}