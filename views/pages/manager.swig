{% extends "../components/layout.swig" %}

{% block main %}
    <h1>manager</h1>
    {% include "../components/manager.nav.swig" %}
    {% include "../components/manager.info.swig" %}
    {% parent %}
{% endblock %}
