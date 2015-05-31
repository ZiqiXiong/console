from django.conf.urls import patterns, include, url
from console import views

urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^connect/$',views.welcome,name='welcome')
)