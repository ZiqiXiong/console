# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0010_auto_20150622_2311'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(default=datetime.datetime.now)),
                ('file', models.FileField(upload_to='archives/')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
