# Generated by Django 4.2 on 2023-05-29 21:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='diagnostico',
        ),
        migrations.CreateModel(
            name='PatientDiagnosis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('diagnosis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.diagnosis', verbose_name='diagnóstico')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.patient', verbose_name='paciente')),
            ],
            options={
                'verbose_name': 'diagnóstico de paciente',
                'verbose_name_plural': 'diagnósticos de pacientes',
            },
        ),
    ]
