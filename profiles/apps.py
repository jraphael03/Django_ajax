from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'profiles'


# When creating a User automatically create Profile
    def ready(self):
        import profiles.signals


        # use __init__.py to set default app configuration

