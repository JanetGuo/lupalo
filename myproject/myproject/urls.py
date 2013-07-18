from django.conf.urls import patterns, include, url
from django.views.generic.simple import redirect_to
from lupalo.facebookx import facebook_view
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'myproject.views.home', name='home'),
    # url(r'^myproject/', include('myproject.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    #url(r'^lupalo/(?P<fb_id>\w+)$', 'lupalo.views.lupalo'),
    url(r'^lupalo/$', 'lupalo.views.lupalo'),
    url(r'^fb/', facebook_view, name='lupalo'),
    #url(r'^login/$',  'lupalo.views.login'),
    url(r'^done/$', 'lupalo.views.loggedin'),
    url(r'^requestpage/$', 'lupalo.views.requestpage'),
    url(r'^handlefbrequest/', 'lupalo.views.handlefbrequestcallback', name='requestback'),
    url(r'^logged-in/$',   'lupalo.views.loggedin', name = 'done' ),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/successfully_logged_out/'}),
    url(r'^login/$', redirect_to, {'url':'fb'}),
    url(r'^reset/$',  'lupalo.views.reset'),
    url(r'^initplayers/$', 'lupalo.views.initplayers'),
    url(r'^send/$', 'lupalo.views.send'),
    url(r'^gamehistory/$', 'lupalo.views.gamehistory'),
    url(r'^recieve/$', 'lupalo.views.recieve'),
    url(r'^retrievegame/$', 'lupalo.views.retrievegame'),
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^polls/static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT})
    url( r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT} ),
    url(r'^foo/',include('social_auth.urls'),name='djangologin')

)
