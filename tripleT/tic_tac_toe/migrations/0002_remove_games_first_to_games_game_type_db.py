# Generated by Django 5.1.2 on 2024-12-05 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tic_tac_toe', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='games',
            name='first_to',
        ),
        migrations.AddField(
            model_name='games',
            name='game_type_db',
            field=models.JSONField(default=list),
        ),
    ]
