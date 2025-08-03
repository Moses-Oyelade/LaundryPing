from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import Machine
from .serializers import MachineSerializer

class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all().order_by('name')
    serializer_class = MachineSerializer

    @action(detail=True, methods=['post'])
    def toggle_in_use(self, request, pk=None):
        machine = self.get_object()
        machine.in_use = not machine.in_use
        machine.status = 'in_use' if machine.in_use else 'available'
        machine.save()
        return Response(MachineSerializer(machine).data)

    @action(detail=True, methods=['post'])
    def start_timer(self, request, pk=None):
        machine = self.get_object()
        duration = request.data.get('duration')

        if not duration or not isinstance(duration, int):
            return Response({'error': 'Valid duration in seconds is required.'}, status=status.HTTP_400_BAD_REQUEST)

        machine.in_use = True
        machine.status = 'in_use'
        machine.start_time = timezone.now()
        machine.duration = duration
        machine.save()

        return Response(MachineSerializer(machine).data)
