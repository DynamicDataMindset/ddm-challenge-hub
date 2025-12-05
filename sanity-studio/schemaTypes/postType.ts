import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline for your blog post',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version (click Generate)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary (160 characters max) - shown in previews',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image for the post (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The main body of your blog post',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Select one or more categories',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Add relevant tags (e.g., "beginner", "tutorial", "career")',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this post goes live',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show on homepage as featured?',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Draft posts will not show on the website',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
      status: 'status',
    },
    prepare({title, subtitle, media, status}) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'
      const statusBadge = status === 'published' ? '[PUBLISHED]' : '[DRAFT]'
      return {
        title: `${statusBadge} ${title}`,
        subtitle: date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})