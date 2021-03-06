import spotipy
from spotipy.oauth2 import SpotifyClientCredential

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

# searches for tracks be default
def search(query):
    res = spotify.search(query)
    print(type(res))
    return res["tracks"]["items"][0]
