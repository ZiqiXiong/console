from django.conf.urls import patterns, include, url
from console import views

urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^connect/$',views.welcome,name='welcome'),
                       url(r'^change_dir/$',views.change_dir,name='change_dir'),
                       url(r'^article/(?P<pk>\d+)/$',views.article,name='article'),
                       url(r'^image/(?P<pk>\d+)/$',views.image,name='image'),
)