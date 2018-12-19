from django.db import models
from django.contrib.auth.models import User

class Document(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    theme_color = models.CharField(max_length=6)
    toc = models.BooleanField()
    org = models.TextField()
