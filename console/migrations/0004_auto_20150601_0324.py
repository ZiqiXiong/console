# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0003_auto_20150601_0302'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photo',
            old_name='caption',
            new_name='title',
        ),
    ]
