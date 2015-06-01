from django.shortcuts import render
from django.http import HttpResponse
import json
from console.models import Folder
# Create your views here.

def index(request):
    return render(request,'index.html')

def welcome(request):
    folder = Folder.objects.get(name="ZQ's Website")
    data = folder_content(folder)
    return HttpResponse(json.dumps(data), content_type='application/json')

def article(request,pk):
    return

def image(request,pk):
    return

def change_dir(request):
    folder = Folder.objects.get(name=request.GET.get('destination'))
    data = folder_content(folder)
    return HttpResponse(json.dumps(data), content_type='application/json')

#helper functions
def article_to_file(article):
    obj = dict()
    obj['title'] = article.title
    obj['url'] = article.get_url()
    return obj

def folder_to_file(folder):
    obj = dict()
    obj['name'] = folder.name
    return obj

def folder_content(folder):
    folders = folder.folder_set.all()
    articles = folder.article_set.all()
    photos = folder.photo_set.all()
    data = dict()
    data['new_files'], data['new_folders'],data['text'] = [], [], folder.helper_text
    for f in folders:
        data['new_folders'].append(folder_to_file(f))
    for a in articles:
        data['new_files'].append(article_to_file(a))
    for p in photos:
        data['new_files'].append(article_to_file(p))
    return data

