from rest_framework import serializers
from .models import Machine


class MachineSerializer(serializers.ModelSerializer):
    usage_duration_minutes = serializers.SerializerMethodField()

    class Meta:
        model = Machine
        fields = ['id', 'name', 'status', 'last_updated', 'in_use_since', 'last_used', 'usage_duration_minutes']

    def get_usage_duration_minutes(self, obj):
        return obj.get_usage_duration_minutes()
        