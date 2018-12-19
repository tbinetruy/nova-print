# Generated by Django 2.1.4 on 2018-12-19 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emacs_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='subtitle',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='document',
            name='theme_color',
            field=models.CharField(default='', max_length=6),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='document',
            name='toc',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
