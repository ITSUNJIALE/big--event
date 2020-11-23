$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);
    //统一为有权限的接口设置`headers`请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
          Authorization: localStorage.getItem('token') || ''
        }
      }
      // 统一挂载 complete 回调函数;不论成功还是失败，最终都会调用 complete 回调函数
      options.complete = function (res){
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
          // 强制清空 token
          localStorage.removeItem("token");
          // 强制跳转到登录页面
          location.href = "/login.html";
        }
      }

})