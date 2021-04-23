from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# When creating a User automatically create Profile
@receiver(post_save, sender=User)   # When User is created do post_save
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    print(sender)
    print(instance)
    print(created)

    if created: 
        Profile.objects.create(user=instance)   # take user from my models and place to the instance of User that is created

# Update apps.py to register signals method