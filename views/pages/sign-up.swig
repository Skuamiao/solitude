{% extends "../components/layout.swig" %}

{% block main %}
    {% if signInfo && !signInfo.succeeded %}
        <p>{{ signInfo.msg }}</p>
    {% endif %}
    {% include "../components/form.sign-up.swig" %}
{% endblock %}
