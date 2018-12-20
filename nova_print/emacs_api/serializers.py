from django.contrib.auth.models import User, Group
from rest_framework import serializers
from emacs_api.models import Document, Figure


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class FigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Figure
        fields = ('pk', 'title', 'image')

class DocumentSerializer(serializers.ModelSerializer):
    images = FigureSerializer(many=True)
    class Meta:
        model = Document
        fields = ('pk', 'images', 'author', 'toc', 'title', 'subtitle', 'org', 'theme_color')
