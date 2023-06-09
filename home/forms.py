from django import forms
from .models import (
    Patient,
    Diagnosis,
    PatientDiagnosis,
    Evolution,
    Test,
    PatientTest,
    Category,
    AttachedFile,
    FRECUENCIA_ACTIVIDAD_FISICA_OPCIONES,
    OCUPACION_OPCIONES,
    TEST_RESPONSE_TYPE
)

def get_diagnosis_options():
    return Diagnosis.objects.filter(is_active = True)

def get_category_options():
    return Category.objects.all()

def get_test_options():
    return Test.objects.all()

class PatientForm(forms.ModelForm):
    
    class Meta:
        model = Patient
        fields = '__all__'
        widgets = {
            'cedula': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'nombre': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'apellidos': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'fecha_nacimiento': forms.DateInput(attrs={
                'type': 'date',
                'class': 'django-patient-form'
            }),
            'telefono': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'django-patient-form'
            }),
            'acompanante': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'parentesco': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'telefono_acompanante': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'ocupacion': forms.Select(
                choices=OCUPACION_OPCIONES,
                attrs={
                'class': 'django-patient-form'
            }),
            'profesion': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'seguridad_social': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'motivo_consulta': forms.Textarea(attrs={
                'rows': "3",
                'class': 'django-patient-form'
            }),
            'cronologia_de_patologia': forms.Textarea(attrs={
                'rows': "3",
                'class': 'django-patient-form'
            }),
            'actividad_fisica': forms.CheckboxInput(attrs={
                'class': 'django-patient-form'
            }),
            'tipo_actividad_fisica': forms.TextInput(attrs={
                'class': 'django-patient-form'
            }),
            'frecuencia_actividad_fisica': forms.Select(
                choices=FRECUENCIA_ACTIVIDAD_FISICA_OPCIONES,
                attrs={
                'class': 'django-patient-form'
            }),
            'conclusion': forms.Textarea(attrs={
                'rows': "3",
                'class': 'django-patient-form'    
            }),
        }

class DiagnosisForm(forms.ModelForm):  # Fetch
    class Meta:
        model = Diagnosis
        fields = '__all__'
        widgets = {
            'diagnosis_code': forms.TextInput(
                attrs={
                    'class': 'django-diagnosis-form'
                }
            ),
            'diagnosis_description': forms.TextInput(
                attrs={
                    'class': 'django-diagnosis-form'
                }
            )
        }

class PatientDiagnosisForm(forms.ModelForm):
    class Meta:
        model = PatientDiagnosis
        fields = '__all__'
        widgets = {
            'diagnosis': forms.Select(
                choices=get_diagnosis_options(),
                attrs={
                    'class': 'django-patient-diagnosis-form'
                }
            )
        }
       
class EvolutionForm(forms.ModelForm):
    class Meta: 
        model = Evolution
        fields = '__all__'
        widgets = {
            'patient': forms.HiddenInput(
                attrs={
                    'required': False,
                    'class': 'django-evolution-form'
                }
            ),
            'evolution_record': forms.Textarea(
                attrs={
                    'rows': '3',
                    'class': 'django-evolution-form'
                }
            )
        }
        
class PatientTestForm(forms.ModelForm):
    class Meta:
        model = PatientTest
        fields = '__all__'
        widgets = {
            'patient': forms.HiddenInput(
                attrs={
                    'required': False,
                    'class': 'django-patient-test-form'
                }
            ),
            'test': forms.Select(
                choices=get_test_options(),
                attrs={
                    'class': 'django-patient-test-form'
                }
            ),
            'result': forms.Textarea(attrs={
                'rows': '3',
                'class': 'django-patient-test-form'
            })
        }
      
class TestForm(forms.ModelForm):    # Fetch
    class Meta:
        model = Test
        fields = '__all__'
        widgets = {
            'test_name': forms.TextInput(
                attrs={
                    'class': 'django-test-form'
                }
            ),
            'test_description': forms.Textarea(
                attrs={
                    'rows': '3',
                    'class': 'django-test-form'
                }
            ),
            'category': forms.Select(
                choices=get_category_options(),
                attrs={
                    'class': 'django-test-form'
                }
            ),
            'subcategory': forms.TextInput(
                attrs={
                    'class': 'django-test-form'
                }),
            'result_type': forms.Select(
                choices=TEST_RESPONSE_TYPE,
                attrs={
                    'class': 'django-test-form',
                    'required': True
                }
            )
        }
    
class AttachedFileForm(forms.ModelForm):
    class Meta:
        model = AttachedFile
        fields = '__all__'
        widgets = {
            'file': forms.FileInput(
                attrs={
                    'class': 'django-attached-file-form'
                }
            )
        }