from django.shortcuts import render
from django.http import HttpResponse
import json
from console.models import Folder, Article, Photo
# Create your views here.

def index(request):
    return render(request,'index.html')

def welcome(request):
    folder = Folder.objects.get(name="ZQ's Website")
    data = folder_content(folder)
    return HttpResponse(json.dumps(data), content_type='application/json')

def article(request,pk):
    article = Article.objects.get(pk=pk)
    return render(request,'article_partial.html',{'article':article})

def image(request,pk):
    photo = Photo.objects.get(pk=pk)
    return render(request,'photo_partial.html',{'photo':photo})

def change_dir(request):
    folder = Folder.objects.get(name=request.GET.get('destination'))
    data = folder_content(folder)
    return HttpResponse(json.dumps(data), content_type='application/json')

#helper functions
def article_to_file(article, is_photo = False):
    obj = dict()
    obj['title'] = article.title
    obj['url'] = article.get_url()
    if is_photo:
        obj['icon'] ="<i class='fa fa-file-image-o'></i>"
    else:
        obj['icon'] ="<i class='fa fa-file-text-o'></i>"
    obj['type'] = article.__class__.__name__
    return obj

def folder_to_file(folder):
    obj = dict()
    obj['name'] = folder.name
    return obj

def folder_content(folder):
    folders = folder.folder_set.order_by('name')
    articles = folder.article_set.order_by('title')
    photos = folder.photo_set.order_by('title')
    data = dict()
    data['new_files'], data['new_folders'],data['text'] = [], [], folder.helper_text
    for f in folders:
        data['new_folders'].append(folder_to_file(f))
    for a in articles:
        data['new_files'].append(article_to_file(a))
    for p in photos:
        data['new_files'].append(article_to_file(p,True))
    return data

