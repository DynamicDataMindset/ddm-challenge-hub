import { defineField, defineType } from 'sanity'

export const challengeType = defineType({
  name: 'challenge',
  title: 'Weekly Challenges',
  type: 'document',
  fields: [
    // ════════════════════════════════════════════════════════
    // COMMON FIELDS (Both Project & Certification)
    // ════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Challenge Title',
      type: 'string',
      description: 'E.g., "SQL Dashboard Challenge" or "DataCamp Data Analyst Certificate"',
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
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary (300 characters max) - shown in previews',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Thumbnail',
      type: 'image',
      description: 'REQUIRED for slider. Recommended: 1200x675px (16:9). Keep important content centered.',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'track',
      title: 'Career Track',
      type: 'reference',
      to: [{ type: 'track' }],
      description: 'Which career path is this for?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      description: 'How challenging is this for learners?',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this challenge goes live',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'deadline',
      title: 'Submission Deadline',
      type: 'datetime',
      description: 'When submissions close (determines if challenge is active)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
      description: 'E.g., "4-6 hours", "2 weeks", "3 months"',
      placeholder: '4-6 hours',
    }),
    defineField({
      name: 'socialPrompt',
      title: 'Social Media Prompt',
      type: 'text',
      rows: 6,
      description: 'Users copy-paste this to LinkedIn when they complete the challenge',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'hashtags',
      title: 'Suggested Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Hashtags for users to include',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featuredSubmissions',
      title: 'Featured User Submissions',
      type: 'array',
      description: 'Manually add best submissions from LinkedIn/Twitter',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'userName',
              type: 'string',
              title: 'User Name',
            },
            {
              name: 'socialPostUrl',
              type: 'url',
              title: 'LinkedIn/Twitter Post URL',
            },
            {
              name: 'projectUrl',
              type: 'url',
              title: 'Project Link',
            },
            {
              name: 'screenshot',
              type: 'image',
              title: 'Project Screenshot',
              options: { hotspot: true },
            },
            {
              name: 'feedback',
              type: 'text',
              title: 'Your Feedback',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'userName',
              media: 'screenshot',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'recycleDate',
      title: 'Auto-Recycle Date',
      type: 'datetime',
      description: 'Challenge can be reused after this date (default: 6 months from deadline)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Challenge',
      type: 'boolean',
      description: 'Show on homepage as featured?',
      initialValue: false,
    }),
    defineField({
      name: 'showInSlider',
      title: 'Show in Homepage Slider',
      type: 'boolean',
      description: 'Toggle ON to display this challenge in the homepage active challenges slider',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Draft challenges will not show on the website',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
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

    // ════════════════════════════════════════════════════════
    // CHALLENGE TYPE SELECTOR
    // ════════════════════════════════════════════════════════
    defineField({
      name: 'challengeType',
      title: 'Challenge Type',
      type: 'string',
      description: 'What type of challenge is this?',
      options: {
        list: [
          {
            title: '📊 Project Challenge',
            value: 'project',
          },
          {
            title: '🎓 Certification Challenge',
            value: 'certification',
          },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'project',
    }),

    // ════════════════════════════════════════════════════════
    // PROJECT-SPECIFIC FIELDS (Only visible when type = project)
    // ════════════════════════════════════════════════════════
    defineField({
      name: 'dataset',
      title: 'Dataset Information',
      type: 'object',
      description: 'Details about the dataset users will work with',
      hidden: ({ document }) => document?.challengeType !== 'project',
      fields: [
        {
          name: 'title',
          title: 'Dataset Name',
          type: 'string',
          description: 'E.g., "E-commerce Sales Data Q4 2024"',
        },
        {
          name: 'url',
          title: 'Download URL',
          type: 'url',
          description: 'Kaggle, GitHub, Google Drive, or Dropbox link',
        },
        {
          name: 'size',
          title: 'File Size',
          type: 'string',
          description: 'E.g., "2.5 MB" (optional)',
        },
        {
          name: 'format',
          title: 'File Format',
          type: 'string',
          options: {
            list: ['CSV', 'Excel', 'JSON', 'SQL Database', 'API', 'Multiple Files'],
          },
        },
      ],
    }),
    defineField({
      name: 'instructions',
      title: 'Challenge Instructions',
      type: 'array',
      description: 'Full project requirements, steps, and deliverables',
      hidden: ({ document }) => document?.challengeType !== 'project',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
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
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
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
      name: 'learningObjectives',
      title: "What You'll Learn",
      type: 'array',
      description: 'IMPORTANT FOR SEARCH: List skills practiced (3-5 items)',
      hidden: ({ document }) => document?.challengeType !== 'project',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'requiredTools',
      title: 'Required Tools',
      type: 'array',
      description: 'IMPORTANT FOR SEARCH: e.g., Excel, Python, SQL, Power BI',
      hidden: ({ document }) => document?.challengeType !== 'project',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'solutionBlogPost',
      title: 'Your Solution Blog Post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Link to your blog post explaining your solution',
      hidden: ({ document }) => document?.challengeType !== 'project',
    }),
    defineField({
      name: 'solutionGithub',
      title: 'Solution GitHub Repo',
      type: 'url',
      description: 'Link to your code solution (optional)',
      hidden: ({ document }) => document?.challengeType !== 'project',
    }),
    defineField({
      name: 'solutionVideo',
      title: 'Solution Video URL',
      type: 'url',
      description: 'YouTube or Loom walkthrough (optional)',
      hidden: ({ document }) => document?.challengeType !== 'project',
    }),

    // ════════════════════════════════════════════════════════
    // CERTIFICATION-SPECIFIC FIELDS (Only visible when type = certification)
    // ════════════════════════════════════════════════════════
    defineField({
      name: 'certification',
      title: 'Certification Details',
      type: 'object',
      description: 'Course and certification information',
      hidden: ({ document }) => document?.challengeType !== 'certification',
      fields: [
        {
          name: 'provider',
          title: 'Course Provider',
          type: 'string',
          description: 'Which platform offers this course?',
          options: {
            list: [
              { title: 'DataCamp', value: 'DataCamp' },
              { title: 'Coursera', value: 'Coursera' },
              { title: 'Udemy', value: 'Udemy' },
              { title: 'LinkedIn Learning', value: 'LinkedIn Learning' },
              { title: 'Pluralsight', value: 'Pluralsight' },
              { title: 'edX', value: 'edX' },
              { title: 'Udacity', value: 'Udacity' },
              { title: 'Other', value: 'Other' },
            ],
            layout: 'dropdown',
          },
        },
        {
          name: 'courseName',
          title: 'Course Name',
          type: 'string',
          description: 'E.g., "Data Analyst Professional Certificate"',
        },
        {
          name: 'affiliateLink',
          title: 'Affiliate Link',
          type: 'url',
          description: 'YOUR tracking URL with affiliate code',
        },
        {
          name: 'pricingTier',
          title: 'Pricing',
          type: 'string',
          options: {
            list: [
              { title: 'Free', value: 'free' },
              { title: 'Paid', value: 'paid' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'originalPrice',
          title: 'Original Price',
          type: 'number',
          description: 'E.g., 399 (only for paid courses)',
          hidden: ({ parent }) => parent?.pricingTier !== 'paid',
        },
        {
          name: 'discountedPrice',
          title: 'Discounted Price',
          type: 'number',
          description: 'E.g., 99 (optional - if you have a discount code)',
          hidden: ({ parent }) => parent?.pricingTier !== 'paid',
        },
        {
          name: 'certificateBadge',
          title: 'Certificate Badge',
          type: 'image',
          description: 'Preview of the certificate badge/logo (optional)',
          options: { hotspot: true },
        },
        {
          name: 'coursePreviewImage',
          title: 'Course Preview Image',
          type: 'image',
          description: 'Screenshot of course interface (optional)',
          options: { hotspot: true },
        },
        {
          name: 'benefits',
          title: 'Course Benefits',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'What will they learn/gain? (3-8 items)',
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'hiringStats',
          title: 'Hiring Statistics (OPTIONAL)',
          type: 'string',
          description: 'ONLY fill if verified. E.g., "43% hired within 3 months". Leave empty if unknown.',
          placeholder: 'e.g., 43% hired within 3 months',
        },
        {
          name: 'hiringCompanies',
          title: 'Hiring Companies (OPTIONAL)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'ONLY fill if verified from course platform. E.g., Google, Meta, Amazon. Leave empty if unknown.',
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'platformRating',
          title: 'Platform Rating (OPTIONAL)',
          type: 'number',
          description: 'Course rating from platform (1-5). Leave empty if unknown.',
          validation: (Rule) => Rule.min(1).max(5),
        },
        {
          name: 'totalEnrolled',
          title: 'Total Students (OPTIONAL)',
          type: 'number',
          description: 'How many students enrolled. E.g., 127000. Leave empty if unknown.',
        },
        {
          name: 'completionTime',
          title: 'Completion Time',
          type: 'string',
          description: 'How long to complete. E.g., "3 weeks", "40 hours"',
          placeholder: '3 weeks',
        },
      ],
    }),
    defineField({
      name: 'completionRequirement',
      title: 'Completion Requirement',
      type: 'text',
      rows: 3,
      description: 'What they need to do to complete this certification challenge',
      placeholder: 'Complete the course, earn certificate, post on LinkedIn with #DataChallenge and tag @DynamicDataMindset',
      hidden: ({ document }) => document?.challengeType !== 'certification',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'track.name',
      media: 'coverImage',
      status: 'status',
      deadline: 'deadline',
      challengeType: 'challengeType',
      showInSlider: 'showInSlider',
    },
    prepare({ title, subtitle, media, status, deadline, challengeType, showInSlider }) {
      const statusBadge = status === 'published' ? '[PUBLISHED]' : '[DRAFT]'
      const typeBadge = challengeType === 'certification' ? '🎓' : '📊'
      const sliderBadge = showInSlider ? '[SLIDER]' : ''
      const date = deadline ? new Date(deadline).toLocaleDateString() : 'No deadline'
      return {
        title: `${statusBadge}${sliderBadge} ${typeBadge} ${title}`,
        subtitle: `${subtitle || 'No Track'} | ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Deadline (Newest)',
      name: 'deadlineDesc',
      by: [{ field: 'deadline', direction: 'desc' }],
    },
    {
      title: 'Deadline (Oldest)',
      name: 'deadlineAsc',
      by: [{ field: 'deadline', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})