from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('emacs_api.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('user-auth/', include('rest_framework_social_oauth2.urls')),
]
