# from django.shortcuts import render
# from rest_framework import viewsets
# from .models import Machine
# from .serializers import MachineSerializer


# class MachineViewSet(viewsets.ModelViewSet):
#     queryset = Machine.objects.all()
#     serializer_class = MachineSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Machine
from .serializers import MachineSerializer
from django.utils import timezone
from django.shortcuts import get_object_or_404

class MachineListCreateAPIView(APIView):
    def get(self, request):
        status_filter = request.query_params.get('status')
        machines = Machine.objects.all()
        if status_filter:
            machines = machines.filter(status=status_filter)
        serializer = MachineSerializer(machines, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MachineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MachineDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Machine, pk=pk)

    def get(self, request, pk):
        machine = self.get_object(pk)
        serializer = MachineSerializer(machine)
        return Response(serializer.data)

    def patch(self, request, pk):
        machine = self.get_object(pk)
        serializer = MachineSerializer(machine, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        machine = self.get_object(pk)
        machine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
