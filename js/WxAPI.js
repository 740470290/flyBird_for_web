export class WxAPI{

  // 获取手机基本信息
  getSysinfo(){
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
      }
    })
  }
  // 获取用户信息(微信登录的信息)需要先授权
  getWxUser(){
    wx.getUserInfo({
      success: function(res){
        console.log(res);
      },
      fail: function(err){
        console.log(err);
      }
    })
  }
  // 发送http请求
  sendHttp(){
    wx.request({
      url: 'http://localhost:4000',
      data:{name:'Jim',age:23},
      success: function(res){
        console.log(res.data);
      }
    })
  }
  // 使用socket链接
  socket(){
    wx.connectSocket({
      url: 'ws://127.0.0.1:4001',
      success: function(){
        console.log('连接成功');
      }
    });
    wx.onSocketOpen(function(){
      wx.sendSocketMessage({
        data: '这是客户端发送给服务器的数据',
        success: function(res){
          console.log(res);
        }
      });
      wx/wx.onSocketMessage(function(res){
        console.log(res);
      })
    })
    
  }


  // 下载文件
  download(){
    wx.downloadFile({
      // url:'http://www.xinhuanet.com/photo/2019-04/24/1210118339_15561138581241n.jpg',
      url:'http://127.0.0.1:4002',
      success: function(res){
        console.log(res);
        console.log(JSON.stringify(res));
        const path = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: function(re){
            console.log('保存成功');
          }
        })
      }
    })
  }


}