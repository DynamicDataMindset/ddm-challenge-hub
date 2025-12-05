import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title shown in Google search results (50-60 characters ideal)',
      validation: (Rule) =>
        Rule.max(60).warning('Titles over 60 characters may be truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description shown in Google search results (150-160 characters ideal)',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions over 160 characters may be truncated'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Main keyword you want this page to rank for',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable this to prevent Google from indexing this page',
      initialValue: false,
    }),
  ],
})