import { DownloadIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      description: 'E.g., "SQL Cheat Sheet", "Resume Template", "DataCamp Course"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'What this resource is and how it helps',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Preview image for this resource',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
    }),

    // ============================================
    // 🆕 NEW: Price Tier Field
    // ============================================
    defineField({
      name: 'priceTier',
      title: 'Price Tier',
      type: 'string',
      description: 'What is the cost model for this resource?',
      options: {
        list: [
          { title: '🟢 Free', value: 'free' },
          { title: '🟡 Freemium (Free Trial + Paid)', value: 'freemium' },
          { title: '🔴 Paid', value: 'paid' },
        ],
        layout: 'radio', // Radio buttons for clear selection
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'free',
    }),

    // ============================================
    // 🆕 NEW: Provider Field
    // ============================================
    defineField({
      name: 'provider',
      title: 'Provider / Platform',
      type: 'string',
      description: 'Where is this resource hosted?',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'DataCamp', value: 'datacamp' },
          { title: 'Coursera', value: 'coursera' },
          { title: 'Udemy', value: 'udemy' },
          { title: 'LinkedIn Learning', value: 'linkedin' },
          { title: 'Udacity', value: 'udacity' },
          { title: 'Pluralsight', value: 'pluralsight' },
          { title: 'Khan Academy', value: 'khanacademy' },
          { title: 'freeCodeCamp', value: 'freecodecamp' },
          { title: 'Kaggle', value: 'kaggle' },
          { title: 'Google Cloud Skills', value: 'googlecloud' },
          { title: 'AWS Training', value: 'aws' },
          { title: 'Microsoft Learn', value: 'microsoft' },
          { title: 'Self-Hosted / PDF', value: 'self-hosted' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ============================================
    // 🆕 NEW: Certificate Available
    // ============================================
    defineField({
      name: 'hasCertificate',
      title: 'Offers Certificate?',
      type: 'boolean',
      description: 'Does this resource provide a certificate upon completion?',
      initialValue: false,
    }),

    // ============================================
    // Existing Fields (Enhanced)
    // ============================================
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      description: 'What kind of resource is this?',
      options: {
        list: [
          { title: '🎥 Video Course', value: 'course' },
          { title: '📺 Video Tutorial', value: 'video' },
          { title: '📄 PDF Download', value: 'pdf' },
          { title: '📋 Template', value: 'template' },
          { title: '📝 Cheat Sheet', value: 'cheatsheet' },
          { title: '📚 Guide / Article', value: 'guide' },
          { title: '🔗 External Link', value: 'external' },
          { title: '🎓 Learning Path', value: 'learning-path' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
      description: 'Upload a PDF, Excel file, etc. (for downloadable resources)',
      hidden: ({ document }) =>
        document?.resourceType === 'course' ||
        document?.resourceType === 'video' ||
        document?.resourceType === 'external',
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to external resource, course, or video',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    // ============================================
    // Affiliate Fields
    // ============================================
    defineField({
      name: 'isAffiliate',
      title: 'Is this an affiliate link?',
      type: 'boolean',
      description: 'Enable if you earn commission from this resource',
      initialValue: false,
    }),

    defineField({
      name: 'affiliateProgram',
      title: 'Affiliate Program',
      type: 'string',
      description: 'Which affiliate program?',
      options: {
        list: [
          { title: 'DataCamp (30%)', value: 'datacamp' },
          { title: 'Coursera (45%)', value: 'coursera' },
          { title: 'Udemy (15-25%)', value: 'udemy' },
          { title: 'LinkedIn Learning', value: 'linkedin' },
          { title: 'Pluralsight', value: 'pluralsight' },
          { title: 'Amazon Associates', value: 'amazon' },
          { title: 'Other', value: 'other' },
        ],
      },
      hidden: ({ document }) => !document?.isAffiliate,
    }),

    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Tracking URL',
      type: 'url',
      description: 'Your unique affiliate link with tracking parameters',
      hidden: ({ document }) => !document?.isAffiliate,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isAffiliate = (context.document as any)?.isAffiliate
          if (isAffiliate && !value) {
            return 'Affiliate link is required when "Is Affiliate" is enabled'
          }
          return true
        }),
    }),

    // ============================================
    // Email Gating
    // ============================================
    defineField({
      name: 'isPremium',
      title: 'Require Email to Access',
      type: 'boolean',
      description: 'Collect email addresses before allowing download/access',
      initialValue: false,
    }),

    // ============================================
    // Metadata
    // ============================================
    defineField({
      name: 'duration',
      title: 'Duration / Length',
      type: 'string',
      description: 'E.g., "45 minutes", "3 hours", "Self-paced"',
      placeholder: '2 hours',
    }),

    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'All Levels', value: 'all-levels' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      description: 'Which categories does this resource belong to?',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      description: 'Show prominently on Resources page?',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When was this resource added?',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      priceTier: 'priceTier',
      provider: 'provider',
      hasCertificate: 'hasCertificate',
      resourceType: 'resourceType',
      media: 'thumbnail',
      isAffiliate: 'isAffiliate',
      isPremium: 'isPremium',
    },
    prepare({ title, priceTier, provider, hasCertificate, resourceType, media, isAffiliate, isPremium }) {
      const badges = []

      // Price badge
      if (priceTier === 'free') badges.push('🟢 FREE')
      if (priceTier === 'freemium') badges.push('🟡 FREEMIUM')
      if (priceTier === 'paid') badges.push('🔴 PAID')

      // Certificate badge
      if (hasCertificate) badges.push('🏆 CERT')

      // Affiliate badge
      if (isAffiliate) badges.push('💰 AFF')

      // Premium badge
      if (isPremium) badges.push('✉️ EMAIL')

      const badgeString = badges.length > 0 ? ` ${badges.join(' ')}` : ''

      return {
        title: `${title}${badgeString}`,
        subtitle: `${provider || resourceType || 'Resource'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})