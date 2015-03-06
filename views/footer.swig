{% block footer %}
    <footer>
        {% if date|date("Y") === "2015" %}
            {% set year = "2015" %}
        {% else %}
            {% set year = "2015 - " + date|date("Y") %}
        {% endif %}
        {{ year }} by sadhu
    </footer>
{% endblock %}
