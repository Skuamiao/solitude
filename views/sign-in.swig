{% extends "layout.swig" %}
{% block style %}
    <link href="/styl/sign-up.css" rel="stylesheet" >
{% endblock %}

{% block aside %}
    <div>aside</div>
{% endblock %}

{% block main %}
    {% include "form.sign-in.swig" %}
{% endblock %}
