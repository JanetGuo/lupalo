from django.http import HttpResponseRedirect,HttpResponse
from django.template import Context, loader
from django.shortcuts import render, render_to_response, get_object_or_404, get_list_or_404
from django.template import RequestContext
#from polls.models import Member, Room, Game, Move, Player
from django.core.urlresolvers import reverse
from django.utils import simplejson
from time import time

from django import forms

EMPTYBOARD = -1

class ContactForm(forms.Form):
    user     = forms.CharField(max_length=100)
    room     = forms.CharField(max_length=100)
    newgame  = forms.BooleanField(required=False)

def login(request):
    #if request.method == 'POST': # If the form has been submitted...
    #form = null   
    #form = ContactForm(request.POST) # A form bound to the POST data
    #return render(request, 'lupalo/login.html', {'form': form })
    return render(request, 'login.html')

def test(request):
    return render(request, 'test.html')


