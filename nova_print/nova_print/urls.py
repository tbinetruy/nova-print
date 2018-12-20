from django.contrib import admin
from django.urls import include, path

from rest_framework import routers
from emacs_api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'figures', views.FigureViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'nested-documents', views.NestedDocumentViewSet)

urlpatterns = [
    path('', include('emacs_api.urls')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('user-auth/', include('rest_framework_social_oauth2.urls')),
]
