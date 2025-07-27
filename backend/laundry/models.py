from django.db import models
from django.utils import timezone

class Machine(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('in_use', 'In Use'),
    ]

    name = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    last_updated = models.DateTimeField(auto_now=True)
    in_use_since = models.DateTimeField(null=True, blank=True)
    last_used = models.DateTimeField(null=True, blank=True)  # 👈 NEW FIELD

    def save(self, *args, **kwargs):
        if self.pk:
            # Get previous status
            prev = Machine.objects.get(pk=self.pk)
            # If changing from in_use to available, update last_used
            if prev.status == 'in_use' and self.status == 'available':
                self.last_used = timezone.now()
            # If switching to in_use and in_use_since is not already set
            elif self.status == 'in_use' and self.in_use_since is None:
                self.in_use_since = timezone.now()
        else:
            if self.status == 'in_use':
                self.in_use_since = timezone.now()

        # Reset in_use_since if status is available
        if self.status == 'available':
            self.in_use_since = None

        super().save(*args, **kwargs)

    def get_usage_duration_minutes(self):
        if self.status == 'in_use' and self.in_use_since:
            return int((timezone.now() - self.in_use_since).total_seconds() // 60)
        return 0

    def __str__(self):
        return self.name
