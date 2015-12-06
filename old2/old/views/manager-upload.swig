{% extends "layout.swig" %}

{% block main %}
    <h1>manager</h1>
    {% if msg %}
        <p>{{ msg }}</p>
    {% endif %}
    {% include "components/manager.upload.swig" %}
{% endblock %}
