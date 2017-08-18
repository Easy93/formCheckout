# formCheckout（表单元素校验插件）

校验表单元素，例如手机号码是否11位等
## 功能
对应在input元素中添加属性，已达到验证功能。   

option | info
---|---
data-dr-regexp | 正则表达式
data-dr-required=true | true/false，input值不能为空值
data-dr-min-length | number，input值的最小长度
data-dr-max-length | number，input值的最大长度
data-dr-confirm | true/false，一致性（用于确认密码输入框，默认与之前type="password"的input值做对比）
消息提示自定义，属性名为 消息对应属性名-message，例如：data-dr-regexp-message

## 使用与扩展
```
<form class="data">
  <div class="form-group">
    <label for="exampleInputEmail">验证邮箱</label>
    <input type="text" class="form-control" id="exampleInputEmail" placeholder="请输入合法邮箱"
      data-dr-regexp ="^\w+@\w+\.\w+$"
      data-dr-regexp-message="请输入合法的邮箱账号"
      data-dr-required = true
      data-dr-required-message="邮箱不能为空"
    >
  </div>
</form>
......
<script type="text/javascript">
    $(".data").dataResult(//initEvent:触发校验事件的方法，不传入默认为input，如不需传入initEvent属性，可直接写成$(".data").dataResult();
      {
        "initEvent":"blur",
      }
    );
    $.fn.dataResult.extendResult(//扩展方法，比如新增最大字符数，最小字符数等
      {
         "max-length":function(){
            return this.val().length <= data
            //this指带input对象，data为定义max-length属性时，传入的数字
         }
      }
    )
  </script>
```
