import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'E.g., "SQL Tutorials", "Career Advice", "Python Guides"',
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
      description: 'Short description of what this category covers',
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
      description: 'Brand color for this category (optional, e.g. #FF0000)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3, etc.)',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: subtitle,
      }
    },
  },
})