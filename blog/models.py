from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock


class BlogPage(Page):
    author = models.CharField(max_length=255)

    body = StreamField([
        ('heading', blocks.CharBlock(icon='title', classname="heading")),
        ('paragraph', blocks.RichTextBlock(icon='pilcrow')),
        ('image', ImageChooserBlock(icon='image')),
    ])

    content_panels = Page.content_panels + [
        FieldPanel('author'),
        StreamFieldPanel('body'),
    ]
