# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0008_auto_20150602_1753'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='helper_text',
            field=models.TextField(blank=True, null=True),
            preserve_default=True,
        ),
    ]
