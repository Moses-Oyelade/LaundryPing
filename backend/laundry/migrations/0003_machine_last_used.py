# Generated by Django 5.2.4 on 2025-07-27 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laundry', '0002_machine_in_use_since'),
    ]

    operations = [
        migrations.AddField(
            model_name='machine',
            name='last_used',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
