from django.http import HttpResponseRedirect,HttpResponse
from django.template import Context, loader
from django.shortcuts import render, render_to_response, get_object_or_404
from django.template import RequestContext
from polls.models import Choice, Poll, Member, Room, Game, Move
from django.core.urlresolvers import reverse
from django.utils import simplejson
from time import time

from django import forms

class ContactForm(forms.Form):
    user = forms.CharField(max_length=100)

def login(request):
    if request.method == 'POST': # If the form has been submitted...
        form = ContactForm(request.POST) # A form bound to the POST data

	if form.is_valid():
            user = form.cleaned_data['user']
            
            rfile = open( '/Users/bioapple/Lupalo/tmp.txt', 'w' )
            print >> rfile, user
            rfile.close() 
            
            m = Member.objects.get(user_name=user)
            request.session['member_id'] = m.id

            return HttpResponseRedirect( reverse('polls.views.lupalo') ) # Redirect after POST
            #return render(request, 'polls/login.html', {
            #   'form': form,
            #})
    else:
        form = ContactForm() # An unbound form
    
    #m = Member.objects.get(user_name=request.POST['username'])
    #request.session['member_id'] = m.id

    return render(request, 'polls/login.html', {
        'form': form,
    })

 
def index(request):
    latest_poll_list = Poll.objects.all().order_by('-pub_date')[:5]
    return render_to_response('polls/index.html', {'latest_poll_list': latest_poll_list})


def detail(request, poll_id):
    p = get_object_or_404(Poll, pk=poll_id)
    return render_to_response('polls/detail.html', {'poll': p},
                               context_instance=RequestContext(request))

def simple(request):    
    """Simple chat room demo, it is not attached to any other models"""
    # get the chat instance that was created by the fixture, pass the id to the template and you're done!    
    return render_to_response('polls/simple.html', {'chat_id':Room.objects.get(id=1).id})

def lupalo(request):
    to_json = {
        "key1": "value1",
        "key2": "value2"
    }

    request.session['start_game'] = float("%0.2f" % time())

    #rfile = open( '/Users/bioapple/Lupalo/tmp.txt', 'a' )
    ret = HttpResponse(simplejson.dumps(to_json), mimetype='application/json')
    #ret = HttpResponse( "Hi" , mimetype='application/json')
    #ret = HttpResponse("Text only, please.", content_type="text/plain")
    #print >> rfile, request 
    #print >> rfile, "Hello"
    #print >> rfile, "%4.2f" % ( request.session.get('start_game') )

    #rfile.close()

    return render_to_response('polls/simple.html', {'id': 1} )
    #return render_to_response('polls/lupalo.html', {'poll': 1}, context_instance=RequestContext(request))
    #return render_to_response('polls/detail.html', {'poll': 1, 'chat_id':Room.objects.get(id=1).id},context_instance=RequestContext(request))

def send(request):
    '''
    Expects the following POST parameters:
    member_id
    message
    '''
    p = request.POST
    #r = Room.objects.get(id=int(p['chat_room_id']))
    #r.say(request.user, p['message'])
    return HttpResponse(p)


def results(request, poll_id):
    p = get_object_or_404(Poll, pk=poll_id)
    return render_to_response('polls/results.html', {'poll': p})

def vote(request, poll_id):
    p = get_object_or_404(Poll, pk=poll_id)
    try:
        selected_choice = p.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the poll voting form.
        return render_to_response('polls/detail.html', {
            'poll': p,
            'error_message': "You didn't select a choice.",
        }, context_instance=RequestContext(request))
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls.views.results', args=(p.id,)))



if __name__ == "__main__":
    lupalo('test')
