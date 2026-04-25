export default {
  name: 'pageHome',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page Settings',
      readOnly: true,
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroTitle',
      title: 'Hero Title (Overwrites Default)',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (Overwrites Default)',
      type: 'text',
    }
  ],
}
