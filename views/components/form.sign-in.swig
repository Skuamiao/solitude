<form action="/api/sign-in" method="post">
    <div>
        <label for="email">email：</label>
        <input type="email" id="email" name="email" />
    </div>
    <div>
        <label for="pwd">密码：</label>
        <input type="password" id="pwd" name="pwd" />
    </div>
    <div>
        <input type="checkbox" value="1" name="dur" id="dur" /><label
                                                for="dur">2 周内自动登</label>
    </div>
    <div>
        <input type="submit" value="登录" /> <a href="/manager/sign-up">注册</a>
    </div>
</form>
