# Generated by Django 4.0.5 on 2022-06-23 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bibaboba', '0005_alter_film_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='synopsis',
            field=models.CharField(max_length=1500, verbose_name='SYNOPSIS'),
        ),
    ]
