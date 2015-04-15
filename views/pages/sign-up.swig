{% extends "../components/layout.swig" %}

{% block main %}
    {% if name %}
        <p>{{ name }} 可能已经注册过，可以直接登录。</p>
    {% endif %}
    {% include "../components/form.sign-up.swig" %}
{% endblock %}
