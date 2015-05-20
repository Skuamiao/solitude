{% extends "layout.swig" %}

{% block main %}
    {% if !data.succeeded %}
        <p>{{ data.msg }}</p>
    {% endif %}
    {% include "components/manager.sign.up.swig" %}
{% endblock %}
