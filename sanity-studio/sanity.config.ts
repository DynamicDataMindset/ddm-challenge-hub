import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Dynamic Data Mindset Blog',
  projectId: 'f0lgf9ep',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})