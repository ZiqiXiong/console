from django.shortcuts import render
from django.http import HttpResponse
import json
# Create your views here.

def index(request):
    return render(request,'index.html')

def welcome(request):
    data = dict()
    data['text'] = "Hello! I am Ziqi Xiong, and this is my personal website. You can explore this website by using " \
                   "basic Linux commands. Type 'help' for instructions."
    return HttpResponse(json.dumps(data), content_type='application/json')