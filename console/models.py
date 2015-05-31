from django.db import models
from datetime import datetime

# Create your models here.

class Section(models.Model):
    name = models.CharField(max_length=50)

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    section = models.ForeignKey(Section, related_name='articles')
    date = models.DateTimeField(default=datetime.now)

class Album(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField(default=datetime.now)

class Photo(models.Model):
    caption = models.CharField(max_length=200)
    date = models.DateTimeField(default=datetime.now)
    album = models.ForeignKey(Album,related_name='photos')