from django.conf.urls import patterns, include, url
import settings


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^polls/$', 'polls.views.index'),
    #url(r'^polls/(?P<poll_id>\d+)/$', 'polls.views.detail'),
    #url(r'^polls/(?P<poll_id>\d+)/results/$', 'polls.views.results'),
    url(r'^polls/simple/$', 'polls.views.simple'),    
    url(r'^polls/lupalo/$', 'polls.views.lupalo'),
    url(r'^polls/initplayers/$', 'polls.views.initplayers'),
    url(r'^polls/send/$', 'polls.views.send'),
    url(r'^polls/recieve/$', 'polls.views.recieve'),
    url(r'^polls/login/$', 'polls.views.login'),
    url(r'^polls/reset/$', 'polls.views.reset'),
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^polls/static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT})
    url( r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT} ),
    #url(r'^chat/', include('chat.jchat.urls')),
    #url(r'^chat/$',       'chat.views.index'  ),
    #url(r'^chat/simple$', 'chat.views.simple' ),
    #url(r'^chat/complex/(?P<id>\d)$', 'chat.views.complex' ),
    #url(r'^chat/accounts/login/', 'django.contrib.auth.views.login', {'template_name':'login.html'}),
    #url(r'^chat/static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT})


)
