<form action="/api/sign-up" method="post">
    <div>
        <label for="email">* email：</label>
        <input type="email"
            id="email"
            maxlength="27" placeholder="最多 27 个字符" name="email" />
    </div>
    <div>
        <label for="pwd">* 密码：</label>
        <input type="password"
            id="pwd" minlength="6"
            maxlength="16" placeholder="6 到 16 个字符" name="pwd" />
    </div>
    <div>
        <label for="pwd2">* 确认密码：</label>
        <input type="password" 
            id="pwd2" minlength="6"
            maxlength="16" placeholder="6 到 16 个字符" name="pwd2" />
    </div>
    <div>
        <label for="name">称号：</label>
        <input type="text"
            id="name" maxlength="17" placeholder="最多 17 个字符" name="name" />
    </div>
    <div>
        <input type="submit" value="注册" /> <a href="/manager/sign-in">登录</a>
    </div>
</form>
