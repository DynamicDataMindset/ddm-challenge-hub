import {defineField, defineType} from 'sanity'

export const trackType = defineType({
  name: 'track',
  title: 'Career Tracks',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Track Name',
      type: 'string',
      description: 'E.g., "Data Analytics", "Data Science", "Data Engineering"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version (auto-generated from name)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description of what this career track covers',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji (optional)',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Brand color for this track (e.g., #FF0000)',
      placeholder: '#FF0000',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3, etc.)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare({title, subtitle, icon}) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: subtitle,
      }
    },
  },
})