from django.urls import path
from . import views

app_name = 'home'
urlpatterns = [
    # Views
    path('', views.patient_list, name="patients"),
    path('paciente/crear', views.create_patient, name='create_patient'),
    path('paciente/actualizar/<int:id>', views.update_patient, name="update_patient"),
    path('paciente/eliminar/<int:id>', views.delete_patient, name="delete_patient"),
    
    # APIs
    path('diagnostico/lista', views.get_diagnosis_list),
    path('test/lista', views.get_test_list),
    path('paciente/lista', views.get_patient_list, name='get_patient_list'),
    path('documento_adjunto/crear', views.create_attached_file),
    # path('test/crear', views.create_test, name="create_test"),
    # path('diagnostico/crear', views.create_diagnosis, name='create_diagnosis'),
    
    # Used to populate database
    # path('populate', views.populatate_database, name="populate_database"),
    # path('populate_test_table', views.populate_test_table), # commit 8b0cd21e66683633cffa83afd4d8c00ffa93b419
]