{% extends "../components/layout.swig" %}

{% block main %}
    <h1>manager</h1>
    {% if user %}
        <p>hello, {{ user }}</p>
    {% else %}
        <p>
            <a href="/manager/sign-in">登录</a>或<a 
                href="/manager/sign-up">注册</a>
        </p>
    {% endif %}
{% endblock %}
