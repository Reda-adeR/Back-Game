from django.db import models

# Create your models here.
class games(models.Model):
    fp_id = models.CharField(max_length=100)
    sp_id = models.CharField(max_length=100)
    fp_wins = models.JSONField(default=list)
    sp_wins = models.JSONField(default=list)
    num_of_games = models.IntegerField(default=0)
    first_to = models.IntegerField(default=1)