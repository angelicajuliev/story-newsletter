from rest_framework import views
from rest_framework.response import Response

from metrics.serializers import DashboardSerializer
from metrics.services import get_dashboard_data


class DashboardView(views.APIView):
    def get(self, request):
        serializer = DashboardSerializer(data=get_dashboard_data())
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=200)

class HealthCheckView(views.APIView):
    def get(self, request):
        return Response(status=200)
