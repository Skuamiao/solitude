{% extends "../components/layout.swig" %}

{% block main %}
    <h1>manager</h1>
    {% include "../components/manager.add.article.swig" %}
    {% if md %}
        <h2>preview</h2>
        <div>
            {{ md|safe }}
        </div>
    {% endif %}
{% endblock %}
