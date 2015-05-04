{% block footer %}
    <footer>
        {% set startYear = "2015" %}
        {% if date|date("Y") === startYear %}
            {% set duration = startYear %}
        {% else %}
            {% set duration = startYear + " - " + date|date("Y") %}
        {% endif %}
        sadness.me by sadhu, {{ duration }}
    </footer>
{% endblock %}
