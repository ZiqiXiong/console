# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0009_auto_20150616_0542'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='parent',
            field=models.ForeignKey(null=True, to='console.Folder', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='photo',
            name='parent',
            field=models.ForeignKey(null=True, to='console.Folder', blank=True),
            preserve_default=True,
        ),
    ]
