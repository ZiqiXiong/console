# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0007_auto_20150601_0534'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='folder',
            new_name='parent',
        ),
        migrations.RenameField(
            model_name='photo',
            old_name='folder',
            new_name='parent',
        ),
    ]
