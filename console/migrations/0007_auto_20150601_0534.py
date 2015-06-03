# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0006_auto_20150601_0353'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('author', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('date', models.DateTimeField(default=datetime.datetime.now)),
                ('article', models.ForeignKey(blank=True, to='console.Article', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='photo',
            name='image',
            field=models.ImageField(default=None, upload_to='photo/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photo',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to='thumbs/'),
            preserve_default=True,
        ),
    ]
