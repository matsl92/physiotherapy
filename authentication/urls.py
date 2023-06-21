from django.urls import path
from . import views

app_name = 'authentication'
urlpatterns = [
    # path('login/', views.login_view, name="login"),
    # path('register/', views.register_user, name="register"),
    path("logout/", views.logout_view, name="logout"),
    path('index', views.index, name='index'),
]