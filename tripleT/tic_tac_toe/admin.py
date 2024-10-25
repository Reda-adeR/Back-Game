from django.contrib import admin

# Register your models here.
from .models import games

class GameAdmin(admin.ModelAdmin):
    list_display = ('fp_id', 'sp_id', 'fp_wins','sp_wins','num_of_games','first_to')  # Adjust as needed
    # search_fields = ('single_value',)

admin.site.register(games, GameAdmin)