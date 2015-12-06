{% if user %}
    <p>hello, {{ user }}</p>
    <p><a href="/api/sign-out">退出</a></p>
{% else %}
    <p>
        <a href="/manager/sign-in">登录</a>或<a
            href="/manager/sign-up">注册(*)</a>
    </p>
{% endif %}
