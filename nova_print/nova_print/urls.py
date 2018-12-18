from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('emacs_api.urls')),
    path('admin/', admin.site.urls),
]
