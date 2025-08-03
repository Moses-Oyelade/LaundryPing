from rest_framework import serializers
from .models import Machine

class MachineSerializer(serializers.ModelSerializer):
    time_left = serializers.IntegerField(read_only=True)
    status_label = serializers.CharField(read_only=True)

    class Meta:
        model = Machine
        fields = [
            'id',
            'name',
            'status',
            'in_use',
            'start_time',
            'duration',
            'last_updated',
            'in_use_since',
            'last_used',
            'time_left',
            'status_label',
        ]
