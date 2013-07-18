from urllib import urlencode
from urllib2 import Request

from django.utils import simplejson

from social_auth.backends.google import GoogleOAuth2
from social_auth.utils import dsa_urlopen


TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'


def refresh_token(user_social_auth):
    client_id, client_secret = GoogleOAuth2.get_key_and_secret()
    params = {'grant_type': 'refresh_token',
              'client_id': client_id,
              'client_secret': client_secret,
              'refresh_token': user_social_auth.extra_data['refresh_token']}
    request = Request(TOKEN_URI, data=urlencode(params), headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    })

    try:
        response = simplejson.loads(dsa_urlopen(request).read())
    except (ValueError, KeyError):
        # Error at response['error'] with possible description at
        # response['error_description']
        pass
    else:
        # Keys in response are: access_token, token_type, expires_in, id_token
        user_social_auth.extra_data['access_token'] = response['access_token']
        user_social_auth.save()

