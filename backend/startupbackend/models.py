from django.db import models
from django.contrib.auth.models import AbstractUser

# ===================================================================
# I. ХЭРЭГЛЭГЧИЙН УДИРДЛАГА (USERS & ROLES)
# ===================================================================

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('startup', 'Startup Founder'),
        ('investor', 'Investor'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='startup',
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


# ===================================================================
# II. STARTUP MODEL
# ===================================================================

class Startup(models.Model):

    STAGE_CHOICES = [
        ('Idea', 'Idea'),
        ('MVP', 'MVP'),
        ('Seed', 'Seed'),
        ('Growth', 'Growth'),
    ]

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="startups"
    )

    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    stage = models.CharField(max_length=50, choices=STAGE_CHOICES)

    # Funding information
    funding_goal = models.DecimalField(max_digits=15, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    equity_offered = models.FloatField(
        blank=True,
        null=True
    )

    # Startup description
    pitch = models.CharField(max_length=500)
    description = models.TextField()

    video_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['industry']),
            models.Index(fields=['stage']),
        ]

    def __str__(self):
        return self.name


# ===================================================================
# III. TEAM MEMBERS
# ===================================================================

class TeamMember(models.Model):

    ROLE_CHOICES = (
        ('leader', 'Ахлагч'),
        ('member', 'Гишүүн'),
    )

    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="team_members"
    )

    name = models.CharField(max_length=255)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='member',
        verbose_name="Төрөл"
    )

    image = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.get_role_display()}) - {self.startup.name}"


# ===================================================================
# IV. INVESTOR PROFILE
# ===================================================================

class Investor(models.Model):

    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="investor_profile"
    )

    company_name = models.CharField(max_length=255)
    investment_range = models.CharField(max_length=255)
    focus_industry = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name


# ===================================================================
# V. INVESTMENTS
# ===================================================================

class Investment(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="investments"
    )

    investor = models.ForeignKey(
        Investor,
        on_delete=models.CASCADE,
        related_name="investments"
    )

    amount = models.DecimalField(max_digits=15, decimal_places=2)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.investor.company_name} → {self.startup.name} (${self.amount})"


# ===================================================================
# VI. STARTUP APPLICATION
# ===================================================================

class StartupApplication(models.Model):

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="applications",
        null=True,
        blank=True
    )

    startup_name = models.CharField(
        max_length=255,
        verbose_name="Стартапын нэр"
    )

    industry = models.CharField(
        max_length=255,
        verbose_name="Салбар"
    )

    STAGE_CHOICES = [
        ('Idea', 'Idea'),
        ('MVP', 'MVP'),
        ('Growth', 'Growth'),
    ]

    stage = models.CharField(
        max_length=20,
        choices=STAGE_CHOICES,
        verbose_name="Хөгжүүлэлтийн шат"
    )

    pitch_deck_link = models.FileField(
        upload_to='description/',
        max_length=500,
        verbose_name="Pitch Deck Link",
        null=True,
        blank=True
    )
    demo_link = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name="Demo / Website"
    )

    fund_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name="Татах дүн ($)"
    )

    equity_offered = models.FloatField(
        verbose_name="Эзэмшил хувь (%)"
    )

    fund_purpose = models.TextField(
        verbose_name="Ашиглах зорилго"
    )

    founder_name = models.CharField(
        max_length=255,
        verbose_name="Үүсгэн байгуулагчийн нэр"
    )

    email = models.EmailField(
        verbose_name="Email хаяг"
    )

    linkedin_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name="LinkedIn Profile"
    )

    phone_number = models.CharField(
        max_length=20,
        verbose_name="Утасны дугаар"
    )

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    approved_startup = models.OneToOneField(
        Startup,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="application_source"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Стартап хүсэлт"
        verbose_name_plural = "Стартап хүсэлтүүд"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.startup_name} - {self.status}"