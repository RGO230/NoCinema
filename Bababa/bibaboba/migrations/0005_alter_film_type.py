# Generated by Django 4.0.5 on 2022-06-23 16:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bibaboba', '0004_type_alter_film_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, related_name='type_name', to='bibaboba.type'),
        ),
    ]
