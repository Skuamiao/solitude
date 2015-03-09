<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    {% block style %}{% endblock %}
</head>
<body>
    {% include "header.swig" %}
    <div>
        {% block aside %}{% endblock %}
        {% block main %}{% endblock %}
    </div>
    {% include "footer.swig" %}
</body>
</html>
