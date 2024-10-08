# Generated by Django 5.1.1 on 2024-10-10 15:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fololimo', '0005_region_city_region_subcounty'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='type',
            field=models.CharField(choices=[('farmer', 'Farmer'), ('agrovet', 'Agrovet')], default='farmer', max_length=100),
        ),
        migrations.CreateModel(
            name='Farm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('size', models.FloatField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fololimo.client')),
            ],
        ),
    ]
