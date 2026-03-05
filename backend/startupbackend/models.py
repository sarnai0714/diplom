from django.db import models
from django.contrib.auth.models import User


class Startup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="startups")
    name = models.CharField(max_length=255)
    description = models.TextField()
    industry = models.CharField(max_length=255)
    stage = models.CharField(max_length=100)  # idea, seed, seriesA...
    funding_goal = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Investor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="investors")
    company_name = models.CharField(max_length=255)
    investment_range = models.CharField(max_length=255)
    focus_industry = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name


class Investment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    startup = models.ForeignKey(Startup, on_delete=models.CASCADE, related_name="investments")
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE, related_name="investments")
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.investor.company_name} → {self.startup.name}"