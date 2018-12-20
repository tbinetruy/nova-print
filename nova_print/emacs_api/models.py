from django.db import models
from django.contrib.auth.models import User

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.author.id, filename)

class Figure(models.Model):
    title = models.CharField(max_length=50,  blank=True)
    image = models.FileField(upload_to=user_directory_path)

class Document(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    images = models.ForeignKey(Figure, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    theme_color = models.CharField(max_length=6)
    toc = models.BooleanField()
    org = models.TextField()


