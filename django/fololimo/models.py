from django.db import models


TYPES = (
    ('farmer', 'Farmer'),
    ('agrovet', 'Agrovet'),
)

class Client(models.Model):
    name = models.CharField(max_length=100,blank=True, null=True)
    phone = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, choices=TYPES)
    
    # def __str__(self):
    #     return str(self.pk)
    
class Tip(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
class Transaction(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    mpesa_receipt = models.CharField(max_length=100, blank=True, null=True)
    mpesa_checkout_id = models.CharField(max_length=100, blank=True, null=True)
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.client.name