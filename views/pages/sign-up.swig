{% extends "../components/layout.swig" %}

{% block main %}
    {% if signInfo && !signInfo.succeeded %}
        <p>{{ signInfo.msg }}</p>
    {% endif %}
    {% include "../components/manager.sign-up.swig" %}
{% endblock %}
