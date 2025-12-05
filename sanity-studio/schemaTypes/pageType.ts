import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'E.g., "Start Here", "Contact", "Privacy Policy"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path (e.g., /start-here, /contact)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Large headline at the top of the page',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the hero title',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Optional background or featured image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Build your page with flexible content blocks',
      of: [
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare({ title }) {
              return {
                title: title || 'Text Section',
                subtitle: 'Text Block',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: {
              media: 'image',
              caption: 'caption',
            },
            prepare({ media, caption }) {
              return {
                title: caption || 'Image',
                subtitle: 'Image Block',
                media,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'ctaBlock',
          title: 'Call-to-Action',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url',
            },
            {
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Neon Green)', value: 'primary' },
                  { title: 'Secondary (Outline)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'buttonText',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Call-to-Action',
                subtitle: subtitle || 'CTA Block',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ Section',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            },
            {
              name: 'faqs',
              title: 'FAQs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  title: 'FAQ Item',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                    },
                    {
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                      rows: 3,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare({ title }) {
              return {
                title: title || 'FAQ Section',
                subtitle: 'FAQ Block',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      status: 'status',
    },
    prepare({ title, slug, status }) {
      const statusBadge = status === 'published' ? '[PUBLISHED]' : '[DRAFT]'
      return {
        title: `${statusBadge} ${title}`,
        subtitle: `/${slug}`,
      }
    },
  },
})