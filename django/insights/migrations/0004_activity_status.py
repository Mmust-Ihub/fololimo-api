# Generated by Django 5.1.1 on 2024-10-14 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insights', '0003_activity_delete_farms'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='status',
            field=models.CharField(choices=[('PENDING', 'pending'), ('COMPLETED', 'completed'), ('EXPIRED', 'expired')], default='PENDING', max_length=10),
        ),
    ]
