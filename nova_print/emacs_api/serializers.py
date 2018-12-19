from django.contrib.auth.models import User, Group
from rest_framework import serializers
from emacs_api.models import Document


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('pk', 'author', 'toc', 'title', 'subtitle', 'org', 'theme_color')
