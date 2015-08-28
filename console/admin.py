from django.contrib import admin
from console.models import Article, Folder,Photo
from django.db import models
from django import forms
# Register your models here.

admin.site.register(Folder)
admin.site.register(Photo)
admin.site.register(File)

class ArticleAdmin(admin.ModelAdmin):
    formfield_overrides = { models.TextField: {'widget': forms.Textarea(attrs={'class':'ckeditor'})}, }
    list_display = ['title', 'content', 'parent','date']

    class Media:
        css = {
            "all": ("ckeditor.css",)
        }
        js = ('ckeditor/ckeditor.js',)

admin.site.register(Article, ArticleAdmin)