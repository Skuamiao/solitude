<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
</head>
<body>
    {% include "components/header.swig" %}

    {% block main %}{% endblock %}

    {% include "components/footer.swig" %}
</body>
</html>
