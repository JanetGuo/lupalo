from django.http import HttpResponseRedirect,HttpResponse
from django.template import Context, loader
from django.shortcuts import render, render_to_response, get_object_or_404, get_list_or_404
from django.template import RequestContext
from models import Member, Room, Game, Move, Player
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from social_auth.models import UserSocialAuth
from django.utils import simplejson

from django import forms
import facebook
import time

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
    m = Member(user_name='Cliff')
    m.save()
    m = Member(user_name='Eve')
    m.save()
    return HttpResponseRedirect( reverse('lupalo.views.login') ) # Redirect after POST
 

def logout(request):
    """Logs out user"""
    auth_logout(request)
    return HttpResponseRedirect('/')



def login(request):

    try:
    	fp = open( 'tmp.4.log', 'w' ) 
    	print >> fp, request
    	request_str = ( request.GET.get('request') )
    	request_to  = ( request.GET.get('to') )
    	print >> fp, "request string", request_str
    	print >> fp, "request to", request_to
    except:
        pass
 
    return HttpResponseRedirect('login.html')


def requestpage(request):
    return HttpResponseRedirect('requestpage.html')


def handlefbrequestcallback(request):
    fp = open( 'tmp.3.log', 'w' ) 
    print >> fp, request
    request_str   = ( request.GET.get('request') )
    request_to    = ( request.GET.get('to') )
    #request_from  = ( request.GET.get('from') )
    request_id    = ( request.GET.get('id') )
    request_from  = request.session['fb_id']
 
    #if request_to:
    #   request_to = int(request_to.encode('ascii'))

    #if request_from:
    #   request_from = int(request_from.encode('ascii'))

    #if request_id:
    #   request_id = int(request_id.encode('ascii'))

    print >> fp, "request id", request_id
    print >> fp, "request string", request_str
    print >> fp, "request to", request_to
    print >> fp, "request from", request_from
    print >> fp, "request fb id", request.session['fb_id']

    try:
    	m_to   = Member.objects.get(fb_id=request_to)
    except: 
	# need to make member    	
        m_to   = Member(fb_id=request_to)
  
    try: 
        m_from = Member.objects.get(fb_id=request_from)
    except:
	# need to make member    	
        m_from = Member(fb_id=request_from)

    # name is set
    gamename = "%s_%s_%s" % ( request_from, request_to, time.asctime(time.gmtime()) ) 
    r = Room(name=gamename)
    r.fb_request_id = request_id
    r.save()

    g = Game(room=r)
    # game name and room name duplicated 
    g.name = gamename
    g.save()

    p = Player(game=g,turn=0)
    p.member = m_from
    p.save()

    # TODO assumes two player game - generalize
    p = Player(game=g,turn=1)
    p.member = m_to
    p.save()

    #return HttpResponseRedirect('requestpage.html')
    return HttpResponseRedirect( reverse('lupalo.views.lupalo') ) # Redirect after POST
     


"""
http://developers.facebook.com/docs/guides/games/

{
  "id": "REQUEST_OBJECT_ID", 
  "application": {
    "name": "APP_DISPLAY_NAME", 
    "canvas_name": "APP_NAME",  // This is identical to the app namespace
    "namespace": "APP_NAMESPACE", 
    "id": "APP_ID"
  },
  "message": "Check out this Awesome Request!", 
  "created_time": "2012-01-24T00:43:22+0000", 
  "type": "apprequest"
}


FB.init({
  appId  : APP_ID,
  oauth  : true,
  frictionlessRequests : true
});



DELETE https://graph.facebook.com/[<REQUEST_OBJECT_ID>_<USER_ID>]?
      access_token=[USER or APP ACCESS TOKEN]


http://apps.facebook.com/lupalos/?fb_source=notification&request_ids=498806153470899%2C420518948003647%2C468380609869198%2C480898968611609%2C125369080947456%2C295658720538648%2C484305994936466%2C542536345763327%2C445643072140315%2C380192692059321%2C256606191129620%2C439865522717952%2C442078432495701%2C209845679147487%2C445160802196674%2C375751765836993%2C422370454479228&ref=notif&app_request_type=user_to_user&notif_t=app_request

"""

@login_required(login_url='/login/')
def loggedin(request,**kwargs):
  
    fp = open( 'tmp.2.log', 'w' )
	
    try:
        request_ids = request.session['fbrequests']
	print >> fp, request_ids
	print >> fp, "====================================="
    except:
        pass
 
    print >> fp, request.method
    print >> fp, request.user.first_name
    print >> fp, request.user.last_name
    print >> fp, request.user.username
    print >> fp, request.user.id
    print >> fp, request.user
 
    print >> fp,'A',[ x for x in UserSocialAuth.objects.filter(user=request.user.id).all()]
    print >> fp,'B',[ x for x in UserSocialAuth.objects.all()]
    print >> fp,'C',[ x for x in UserSocialAuth.objects.filter(provider='facebook',user=request.user.id).order_by('-id')]
    instance = UserSocialAuth.objects.filter(provider='facebook',user=request.user.id).order_by('-id')[0]
    #instance = UserSocialAuth.objects.filter(provider='facebook').get(user=request.user.id).order_by('-id')[0]
    print >> fp, instance
    print >> fp, instance.tokens

    graph   = facebook.GraphAPI(instance.tokens["access_token"])
    profile = graph.get_object("me")
    friends = graph.get_connections("me", "friends")
    print >> fp, profile
    print >> fp, profile['id']
    print >> fp, friends
    fb_id = profile['id']
    request.session['fb_id'] = fb_id

    #graph.put_object("me","apprequests",message="Lup",redirect_uri="http://www.lupalo.com/foo/login/facebook")
    #graph.put_object("me","apprequests",to="100004397774234",message="Lup",redirect_uri="http://www.lupalo.com/foo/login/facebook")

    # TODO check if member exists with the same fb id
    try:
        #m = Member.objects.get(user_name=request.user.id)
        m = Member.objects.get(user_name=request.user.username)
    except Member.DoesNotExist:
        m = None

    if m == None:
        try:
            m = Member.objects.get( fb_id=request.session['fb_id'] )
            m.user_name = request.user.username
            m.save()
        except Member.DoesNotExist:
            m = None
  
    if m == None:
         m       = Member( user_name = request.user.username )
         m.fb_id = request.session['fb_id'] 
         m.save()

    #===== test 
    #   move this to side bar function 
    return render_to_response('requestpage.html')
    #=========



    #return HttpResponseRedirect(reverse('lupalo.views.requestpage'))

    if True:
    #if request.method == 'POST': # If the form has been submitted...
	#form = ContactForm(request.POST) # A form bound to the POST data

	#print >> fp, "validating"
	#print >> fp, form.is_valid()
	#print >> fp, form.errors

	#if form.is_valid():
	if True:
            #user = form.cleaned_data['user']
            #user = request.user.id
            user = request.user.username

	    t        = time.gmtime()
	    name     = time.asctime(t)
	    gamename = time.asctime(t)

            #gamename = form.cleaned_data['room']           
            #newgame  = form.cleaned_data['newgame']           
            newgame  = False        

	    print >> fp, "New Game", newgame

	    if newgame == True:
		Room.objects.all().delete()
	    	r = Room(name=name)
	    	r.save()
	    	Game.objects.all().delete()
	    	g = Game(name=name,room=r)
	    	g.save()
	    	r = Room(name=gamename)
	    	r.save()
	    	g = Game(name=name,room=r)
	    	g.save()

	    else:

	    	r = Room(name=gamename)
	    	g = Game(name=name,room=r)

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
		
	    print >> fp, "Player turn:", p.turn 
 
            request.session['player_id'] = p.turn

            return HttpResponseRedirect( reverse('lupalo.views.lupalo') ) # Redirect after POST
            #return render(request, 'polls/login.html', {
            #   'form': form,
            #})
    else:

        form = ContactForm() # An unbound form
   

    fp.close()
 
    #m = Member.objects.get(user_name=request.POST['username'])
    #request.session['member_id'] = m.id

    return render(request, 'foyer.html', {
        'form': form, 'user':request.user.first_name 
    })



def simple(request):    
    """Simple chat room demo, it is not attached to any other models"""
    # get the chat instance that was created by the fixture, pass the id to the template and you're done!    
    #return render_to_response('polls/simple.html', { 'game_id':Game.objects.get(id=1).id,'user_id':Room.objects.get(id=1).id })
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id } )
    print "--------------"
    print "player id", request.session['player_id']
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id, 'player_id':request.session['player_id'] }, context_instance=RequestContext(request)  )
    #return render_to_response('polls/simple.html', { 'room_id':Room.objects.get(id=1).id } )
    return render_to_response('simple.html', { 'room_id':Room.objects.get(id=1).id, 'player_id':1 } )



def recieve(request):

    print "Receive Hello"
 
    try:
        #offset = int(post['lastmove'])
        offset = int( request.GET.get('lastmove') )
    except:
        offset = 0

    single_ip_test = True

    if ( single_ip_test == True ):
        user_id    = ( request.GET.get('member_id') )
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



def gamehistory(request):
    """
    Returns list of ongoing games for user.
    """
 
    single_ip_test = True

    if ( single_ip_test == True ):
        user_id    = request.GET.get('member_id')
    else:    
	user_id    = request.session['member_id']

    fp = open( 'tmp.hist.txt', 'w' )
    print >> fp, "hist" 
    print >> fp, user_id 

    try: 
	m  = Member.objects.get(user_name=user_id)
        p  = Player.objects.get(member=m)
    except:
    	return HttpResponse( simplejson.dumps( { "yourmove": -1 } ), mimetype='application/javascript' )

    try:
        players = get_list_or_404(Player, game=p.game)
    except:
        players = None

    m = players[0].member
    names = [ m.user_name ]
	
    print >> fp, "member", m, "player", names	
    fp.close()


def lupalo(request):
    to_json = {
        "key1": "value1",
        "key2": "value2"
    }

    #fp = open( 'tmp.lup.log', 'w' )
    #print >> fp, request.session['game_id']
    #fp.close()

    request.session['start_game'] = float("%0.2f" % time.time())
    user_id   = request.session['member_id']
    game_id   = request.session['game_id']
    player_id = request.session['player_id']
    m         = Member.objects.get(id=user_id)
 
    ret = HttpResponse(simplejson.dumps(to_json), mimetype='application/json')

    #return render_to_response('polls/simple.html', {'user_id': user_id, 'game_id':game_id } )
    return render_to_response('simple.html', {'game_id':game_id, 'player_id':player_id, 'user_name':m.user_name } )
    #return render_to_response('polls/simple.html', {'game_id':game_id, 'player_id':1 } )



def initplayers(request):

    print "Init Players" 
    print request
    user_id   = ( request.GET.get('member_id') )
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
    	    user_id    = ( request.GET.get('member_id') )
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
