from django.http import HttpResponseRedirect,HttpResponse
from django.template import Context, loader
from django.shortcuts import render, render_to_response, get_object_or_404, get_list_or_404
from django.template import RequestContext
from polls.models import Member, Room, Game, Move, Player
from django.core.urlresolvers import reverse
from django.utils import simplejson
from time import time

from django import forms

EMPTYBOARD = -1

class ContactForm(forms.Form):
    user     = forms.CharField(max_length=100)
    room     = forms.CharField(max_length=100)
    newgame  = forms.BooleanField(required=False)

def reset(request):

    Room.objects.all().delete()
    r = Room(name='testroom')
    r.save()
 
    Game.objects.all().delete()
    g = Game(name='testgame',room=r)
    g.save()
    
    Player.objects.all().delete()
    p = Player.objects.all()
    print "Total number of players: %d" % len(p) 
  
    Member.objects.all().delete()

    print "Hello"
    m = Member(user_name='cliff')
    m.save()
    m = Member(user_name='eve')
    m.save()
    return HttpResponseRedirect( reverse('polls.views.login') ) # Redirect after POST
 

def login(request):
   
    if request.method == 'POST': # If the form has been submitted...
        form = ContactForm(request.POST) # A form bound to the POST data

	if form.is_valid():
            user = form.cleaned_data['user']
            gamename = form.cleaned_data['room']           
            newgame  = form.cleaned_data['newgame']           

	    print "New Game", newgame

	    if newgame == True:
		Room.objects.all().delete()
	    	r = Room(name='testroom')
	    	r.save()
	    	Game.objects.all().delete()
	    	g = Game(name='testgame',room=r)
	    	g.save()


	    	r = Room(name=gamename)
	    	r.save()
	    	g = Game(name=gamename,room=r)
	    	g.save()

	    else:

	    	r = Room(name=gamename)
	    	g = Game(name=gamename,room=r)

 
	    m = Member.objects.get(user_name=user)
            request.session['member_id'] = m.id
            game = Game.objects.all()
            g = game[0]
            request.session['game_id'] = g.id
	    # TODO get room id from game
            r = g.room 
	    # TODO get player id from room
            #players = Player.objects.get(game=g)
            try:
                players = get_list_or_404(Player, game=g)
            except:
                players = None
 
            if players:
                turn = len(players) 
            else:
                turn = 0

            p = Player(game=g,turn=turn)
	    p.member = m
            p.save()
		
	    print "Player turn:", p.turn 
 
            request.session['player_id'] = p.turn

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
    #return render_to_response('polls/simple.html', { 'game_id':Game.objects.get(id=1).id,'user_id':Room.objects.get(id=1).id })
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id } )
    print "--------------"
    print "player id", request.session['player_id']
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id, 'player_id':request.session['player_id'] }, context_instance=RequestContext(request)  )
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id } )
    return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id, 'player_id':1 } )



def recieve(request):

    print "Receive Hello"
 
    try:
        #offset = int(post['lastmove'])
        offset = int( request.GET.get('lastmove') )
    except:
        offset = 0

    single_ip_test = True

    if ( single_ip_test == True ):
        user_id    = int( request.GET.get('member_id') )
    	player_id  = int( request.GET.get('player_id') )
    	game_id    = int( request.GET.get('game_id'  ) )
    else:    
	user_id    = request.session['member_id']
    	player_id  = request.session['player_id']
    	game_id    = request.session['game_id']

    print "Receive: user %d player %d game %d last move %d" % ( user_id, player_id, game_id, offset )
  
    try: 
    	g = Game.objects.get(id=game_id)
    	print "Receive: C"
   	m = Move.objects.filter(game=g).order_by('-id')[0]
    	print "Receive: D"
    	print "tile", m.tile
    	print "rotation", m.rotation
    	print "cell", m.cell
    	return HttpResponse( simplejson.dumps( {  "cell": m.cell, "tile": m.tile, "rotation": m.rotation, "player": m.player, "turnsInHand":m.turnsInHand, "loops":m.loops } ), mimetype='application/javascript' )
    except:
    	return HttpResponse( simplejson.dumps( { "cell": -1 } ), mimetype='application/javascript' )
    	#return HttpResponse( simplejson.dumps( { "cell": m.cell, "tile": m.tile, "rotation": m.rotation } ), mimetype='application/javascript' )


def lupalo(request):
    to_json = {
        "key1": "value1",
        "key2": "value2"
    }

    request.session['start_game'] = float("%0.2f" % time())
    user_id   = request.session['member_id']
    game_id   = request.session['game_id']
    player_id = request.session['player_id']
    m         = Member.objects.get(id=user_id)
 
    ret = HttpResponse(simplejson.dumps(to_json), mimetype='application/json')

    #return render_to_response('polls/simple.html', {'user_id': user_id, 'game_id':game_id } )
    return render_to_response('polls/simple.html', {'game_id':game_id, 'player_id':player_id, 'user_name':m.user_name } )
    #return render_to_response('polls/simple.html', {'game_id':game_id, 'player_id':1 } )



def initplayers(request):

    print "Init Players" 
    print request
    user_id   = int( request.GET.get('member_id') )
    player_id = int( request.GET.get('player_id') )
    game_id   = int( request.GET.get('game_id'  ) )

    print "User",   user_id
    print "Player", player_id
    print "Game",   game_id

    try:
 	g = Game.objects.get(id=game_id)
    	#players = Player.objects.get(game=g)
    except:
	pass
    	#players = None

    try:
        players = get_list_or_404(Player, game=g)
    except:
        players = None
   
    print type(players)
 
    if ( type(players) == type([]) ):
        print "Turns list"
	turns = []
	names = []
	for elem in players:
		m      = elem.member
        	print elem.turn, m.user_name
		turns += [ elem.turn ]
		names += [ m.user_name ]
    else:

    	print "Turns",  players.turn
	m = players.member
	names = [ m.user_name ]
        print "Member"
	turns = [ players.turn ]
  
    print "Player turns:",  turns
    print "Player names :", names

    return HttpResponse( simplejson.dumps( { "playerids": turns, "playernames": names } ), mimetype='application/javascript' )
 


def send(request):
    '''
    Expects the following POST parameters:
    member_id
    message
    '''
   
    # TODO modify for muti ip. Works from different IP addresses but not from same one
    single_ip_test = True

    if ( single_ip_test == False ):
    	user_id    = request.session['member_id']
    	player_id  = request.session['player_id']
    	game_id    = request.session['game_id']


    try:

    	moveid = int( request.GET.get('moveid') )
    	cellid = int( request.GET.get('cellid') )
    	tileid = int( request.GET.get('tileid') )
    	rot    = int( request.GET.get('rot')    )
    	turnsInHand = int( request.GET.get('turnsInHand') )
    	loops  = int( request.GET.get('loops') )

    	if ( single_ip_test == True ):
    	    user_id    = int( request.GET.get('member_id') )
    	    player_id  = int( request.GET.get('player_id') )
    	    game_id    = int( request.GET.get('game_id')   )


        #p = simplejson.loads(request.raw_post_data)
	#print p
    	#moveid = int( p['moveid'] )
    	#cellid = int( p['cellid'] )
    	#tileid = int( p['tileid'] )
    	#rot    = int( p['rot'] )
    	#turnsInHand = int( p['turnsInHand'] )
    	#loops  = int( p['loops'] )

    	#if ( single_ip_test == True ):
    	#    user_id    = int( p['member_id'] )
    	#    player_id  = int( p['player_id'] )
    	#    game_id    = int( p['game_id']   )

    except:
	cellid = EMPTYBOARD

    print "=================="
    print moveid
    print cellid
    print tileid
    print rot
    print turnsInHand
    print loops

    print "Send complete:", user_id, player_id, game_id
    
    g = Game.objects.get(id=game_id)
    m = Move( game=g, player=player_id, cell=cellid, tile=tileid, rotation=rot, turnsInHand=turnsInHand, loops=loops )
    #m = Move( game=g, player=101, cell=cellid, tile=101, rotation=101 )
    m.save() 
    #r.say(request.user, p['message'])
    #return HttpResponse(p)
    return HttpResponse( simplejson.dumps( { "playerids": player_id } ), mimetype='application/javascript' )
 






"""
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
"""


if __name__ == "__main__":
    lupalo('test')
