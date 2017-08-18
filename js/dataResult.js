/**
 *  @Author：Easy
 *  @Data：2017-08-15
 *  @Last Modified by： Easy
 *  @Last Modified time： 2017-08-15 13：43
 */

// //起手式
// (function(root,factory,plug){
//   factory(jQuery,plug);
// })(this,function( jQuery, plug ){
//
// },"dataResult");//全局环境中，this指向Windows对象(传进了根作用域)   factory:工厂函数


(function(root,factory,plug){
  factory(jQuery,plug);
})(this,function( jQuery, plug ){
  //配置,并不是this中的属性,需要拓展属性. 默认配置优先，用户配置为覆盖
  var DEFAULT = {
    initEvent:"input",
    plugName:"dr"
  }

  //基础默认规则
  var RULES = {
    "regexp":function(data){
      return new RegExp(data).test(this.val());
    },
    "required":function(){
      return this.val();
    },
    "min-length":function(data){
      return  this.val().length >= data
    },
    "max-length":function(data){
      return  this.val().length <= data
    },
    "confirm":function(){
      var passElement = $(":password")[0];
      if(passElement.value=="" || this.value()!=passElement.value){
        return false;
      }else{
        return true;
      }
    },
  }

  // $.fn = jQuery.fn = jQuery.prototype
  $.fn[plug] = function(options){  //在jQuery原型中拓展dataResult方法,   options是在调用dataResult方法时，传入的自定义参数
    if(!this.is("form")){return}  //dom元素一定要是form才能使用本插件
    this.$file = this.find("input"); //找到input元素 并存储在当前对象的file属性中

    $.extend(this,DEFAULT,options);//将DEFAULT与option扩展入this属性中

    this.$file.on(this.initEvent,function(){  //获取this（触发方法的元素，element对象）有哪些配置，调用默认规则中的方法

      var _this = $(this)
      _this.siblings('p').remove();  //查找input元素是否有兄弟元素p，有则移除

      $.each(RULES,function(key,fn){  //key:键名 fn:键值
        var $fileName = _this.data(DEFAULT.plugName+"-"+key); //取键名对应的值
        var $message = _this.data(DEFAULT.plugName+"-"+key+"-message");
        if($fileName){
          var result = fn.call(_this,$fileName);//调用fn方法，并改变其中this的指向（传入啥指向啥）
          if(!result){//延伸：展示报错信息的方式，是否可以自定义？
            _this.after("<p style=\"font-size:10px; color:red\">"+$message+"</p>");
          }
        }
      })
    })
  }

  $.fn[plug].extendResult = function(options){
    $.extend(RULES,options)
  }

},"dataResult");//全局环境中，this指向Windows对象(传进了根作用域)   factory:工厂函数

//何种事件触发校验？input or blur？
