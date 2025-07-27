# from django.urls import path, include
# from rest_framework.routers import DefaultRouter 
# from .views import MachineViewSet

# router = DefaultRouter()
# router.register(r'machines', MachineViewSet)


# urlpatterns = [
#     path('', include(router.urls))
# ]

from django.urls import path
from .views import MachineListCreateAPIView, MachineDetailAPIView

urlpatterns = [
    path('machines/', MachineListCreateAPIView.as_view(), name='machine-list-create'),
    path('machines/<int:pk>/', MachineDetailAPIView.as_view(), name='machine-detail'),
]



# curl -X POST http://localhost:8000/api/machines/ \
#      -H "Content-Type: application/json" \
#      -d '{"name": "Dryer 1", "status": "in_use"}'
