from django.urls import path
from .views import *

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
