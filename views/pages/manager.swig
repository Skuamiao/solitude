{% extends "../components/layout.swig" %}

{% block main %}
    {% if user %}
        <p>hello, {{ user }}</p>
    {% endif %}
    <div>manager</div>
{% endblock %}
