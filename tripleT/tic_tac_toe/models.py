from django.db import models

# Create your models here.
class games(models.Model):
    game_id = models.CharField(max_length=100)
    win_id = models.CharField(max_length=100)
    los_id = models.CharField(max_length=100)
    fp_wins = models.JSONField(default=list)
    sp_wins = models.JSONField(default=list)
    num_of_games = models.IntegerField(default=0)
    first_to = models.IntegerField(default=1)