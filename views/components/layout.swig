<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
</head>
<body>
    {% include "header.swig" %}
    
    {% block main %}{% endblock %}
    
    {% include "footer.swig" %}
</body>
</html>
