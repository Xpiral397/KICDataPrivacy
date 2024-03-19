from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


def validate_image_extension(value):
    import os
    from django.core.exceptions import ValidationError
    from django.utils.translation import gettext as _

    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png']

    if not ext.lower() in valid_extensions:
        raise ValidationError(_('Unsupported file extension. Please upload a valid image file.'))


class CustomImageField(models.ImageField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.validators.append(validate_image_extension)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, name, password, **extra_fields)

class UserAccount(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=225)
    name = models.CharField(max_length=225)
    is_active = models.BooleanField(default=True)
    has_registered = models.BooleanField(default=False)
    has_confirm_email = models.BooleanField(default=False)
    has_confirm_location = models.BooleanField(default=False)
    has_confirm_full_name = models.BooleanField(default=False)
    setCookies = models.BooleanField(default=False)
    account = models.JSONField(default = {})
    extract_cookies = models.JSONField(default = {})
    has_confirm_number = models.BooleanField(default=False)
    has_confirm_profile_picture = models.BooleanField(default=False)
    number = models.CharField(max_length=20, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    gender = models.CharField(max_length=20, choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE'), ('PREFER-NOT-TO-SAY', 'PREFER-NOT-TO-SAY')])
    date_of_birth = models.DateField(null=True, blank=True)
    bio = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    languages_spoken = models.CharField(max_length=255, blank=True)
    interests_hobbies = models.TextField(blank=True)
    education = models.CharField(max_length=255, blank=True)
    skills = models.TextField(blank=True)
    favorite_books_movies_tv_shows = models.TextField(blank=True)
    relationship_status = models.CharField(max_length=50, blank=True)
    favorite_quotes = models.TextField(blank=True)
    travel_experiences = models.TextField(blank=True)
    achievements = models.TextField(blank=True)
    volunteer_work = models.TextField(blank=True)
    pet_ownership = models.CharField(max_length=50, blank=True)
    music_preferences = models.TextField(blank=True)
    fitness_activities = models.TextField(blank=True)
    profile_picture = CustomImageField(upload_to='profile_pictures/', null=True, blank=True)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'gender', 'password']

    def __str__(self):
        return self.email
