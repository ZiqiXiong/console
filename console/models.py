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

class Comment(models.Model):
    author = models.CharField(max_length=50)
    content = models.TextField()
    article = models.ForeignKey(Article,null=True,blank=True)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.author+"'s comment"


class Photo(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField(default=datetime.now)
    folder = models.ForeignKey(Folder)
    image = models.ImageField(upload_to='photo/')
    thumbnail = models.ImageField(upload_to='thumbs/',blank=True,null=True)

    def __str__(self):
        return self.title

    def get_url(self):
        return reverse('article',kwargs={'pk':self.id})

        # Adapted from http://snipt.net/danfreak/generate-thumbnails-in-django-with-pil/
    def create_thumbnail(self):

        if not self.image:
            return

        from io import BytesIO
        from PIL import Image
        from django.core.files.uploadedfile import SimpleUploadedFile
        import os

        THUMBNAIL_SIZE = (300,300)

        from mimetypes import MimeTypes
        mime = MimeTypes()
        mime_type = mime.guess_type(self.image.url)

        DJANGO_TYPE = mime_type
        if DJANGO_TYPE[0] == 'image/jpeg':
            PIL_TYPE = 'jpeg'
            FILE_EXTENSION = 'jpg'
        elif DJANGO_TYPE[0] == 'image/png':
            PIL_TYPE = 'png'
            FILE_EXTENSION = 'png'
        else:
            return

        r = BytesIO(self.image.read())
        fullsize_image = Image.open(r)
        image = fullsize_image.copy()

        image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

        temp_handle = BytesIO()
        image.save(temp_handle, PIL_TYPE)
        temp_handle.seek(0)

        suf = SimpleUploadedFile(os.path.split(self.image.name)[-1], temp_handle.read(), content_type=DJANGO_TYPE)
        self.thumbnail.save('{}_thumbnail.{}'.format(os.path.splitext(suf.name)[0], FILE_EXTENSION), suf, save=False)


    def save(self):
        self.create_thumbnail()
        super(Photo, self).save()

    def __str__(self):
        return self.image.url