from django.test import TestCase
from .models import User

class UsersTestCase(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            username="testuser",
            email="test@user.com",
            password="textMe@325",
            )

    def test_create_superuser(self):
        pass
