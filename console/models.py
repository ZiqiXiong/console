from django.db import models
from datetime import datetime
from django.core.urlresolvers import reverse

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', null=True, blank=True)
    helper_text = models.TextField(null=True)

    def __str__(self):
        return self.name



class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    folder = models.ForeignKey(Folder)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title

    def get_url(self):
        return reverse('article',kwargs={'pk':self.id})

class Photo(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField(default=datetime.now)
    folder = models.ForeignKey(Folder)

    def __str__(self):
        return self.title

    def get_url(self):
        return reverse('article',kwargs={'pk':self.id})