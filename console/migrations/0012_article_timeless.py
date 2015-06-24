# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0011_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='timeless',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
