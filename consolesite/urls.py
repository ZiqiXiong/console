from django.conf.urls import patterns, include, url
from django.contrib import admin
from consolesite import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'consolesite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('console.urls')),
)

if settings.DEBUG:
    urlpatterns += patterns('',
                            url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT,
                            }),
    )