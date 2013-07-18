from django.db import models
from django.utils import timezone

# Create your models here.

from django.db import models

class Member(models.Model):
    user_name     = models.CharField(max_length=200,null=True)
    fb_first_name = models.CharField(max_length=200,null=True)
    fb_last_name  = models.CharField(max_length=200,null=True)
    fb_id         = models.CharField(max_length=200,null=True)
    #fb_id         = models.IntegerField(null=True)

class Poll(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    poll = models.ForeignKey(Poll)
    choice = models.CharField(max_length=200)
    votes = models.IntegerField()

    def __unicode__(self):
        return self.choice

class Room(models.Model):
    name    = models.CharField(max_length=200)
    comment = models.TextField(blank=True, null=True)

    def add_player(self, user):
        self.players.add( Member.objects.get(user_name=user) )

class Game(models.Model):
    room  = models.ForeignKey(Room)
    name  = models.CharField(max_length=200)

    def place_tile(self,player,cell,tile,rotation):
 	m = Move(game=self,player=player,cell=cell,tile=tile,rotation=rotation)

class Player(models.Model):
    """
    attach member to game via player
    """
    game   = models.ForeignKey(Game)
    member = models.ForeignKey(Member,null=True)
    turn   = models.PositiveIntegerField(blank=True,null=True)
 

class Move(models.Model):
    game     = models.ForeignKey(Game)
    player   = models.PositiveIntegerField(blank=True,null=True)
    cell     = models.PositiveIntegerField(blank=True,null=True) 
    tile     = models.PositiveIntegerField(blank=True,null=True) 
    rotation = models.PositiveIntegerField(blank=True,null=True) 
    turnsInHand = models.PositiveIntegerField(blank=True,null=True) 
    loops    = models.PositiveIntegerField(blank=True,null=True)
 
    def last_move_id(self):
        '''Return last message sent to room'''
        m = Move.objects.filter(game=self).order_by('-pk')
        if m:
            return m[0]
        else:
            return 0

#p = Poll(question="What's new?", pub_date=timezone.now())
#p.save()
#p = Poll.objects.get(pk=1)
#p.choice_set.create(choice='Not much', votes=0)
#p.choice_set.create(choice='The sky', votes=0)
#c = p.choice_set.create(choice='Just hacking again', votes=0)
#p.save()

#Room.objects.all().delete()
#r = Room(name='testroom')
#r.save()

#Game.objects.all().delete()
#game = Game(name='testgame')
#game.save()

#Member.objects.all().delete()

#print Member.objects.all()
#m = Member(user_name='cliff')
#m.save()
#m = Member(user_name='alex')
#m.save()
