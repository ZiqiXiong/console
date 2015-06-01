# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0004_auto_20150601_0324'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='helper_text',
            field=models.TextField(null=True),
            preserve_default=True,
        ),
    ]
