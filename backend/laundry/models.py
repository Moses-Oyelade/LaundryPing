from django.db import models
from django.utils import timezone
from datetime import timedelta

class Machine(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('in_use', 'In Use'),
    ]

    name = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    in_use = models.BooleanField(default=False)  # for manual toggle
    start_time = models.DateTimeField(null=True, blank=True)  # for countdown
    duration = models.IntegerField(null=True, blank=True)  # in seconds

    last_updated = models.DateTimeField(auto_now=True)
    in_use_since = models.DateTimeField(null=True, blank=True)
    last_used = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        now = timezone.now()

        if self.pk:
            prev = Machine.objects.get(pk=self.pk)

            # Set last_used if switching from in_use to available
            if prev.status == 'in_use' and self.status == 'available':
                self.last_used = now
                self.in_use_since = None
                self.start_time = None
                self.duration = None

            # If set to in_use and in_use_since is not yet defined
            elif self.status == 'in_use' and self.in_use_since is None:
                self.in_use_since = now

            # If manually toggled off
            if not self.in_use:
                self.start_time = None
                self.duration = None

        else:
            # Initial creation
            if self.status == 'in_use':
                self.in_use_since = now

        super().save(*args, **kwargs)

    @property
    def time_left(self):
        """Time remaining if the machine is in timed use mode."""
        if self.start_time and self.duration:
            end_time = self.start_time + timedelta(seconds=self.duration)
            remaining = (end_time - timezone.now()).total_seconds()
            return max(0, int(remaining))
        return None

    @property
    def status_label(self):
        """Dynamic status label for frontend use."""
        if self.status == 'available':
            return "Idle"
        if self.start_time and self.duration:
            return "Running" if self.time_left > 0 else "Idle"
        return "In Use"

    def __str__(self):
        return self.name
