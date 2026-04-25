export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role / Company',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'initials',
      title: 'Initials (e.g. "AO")',
      type: 'string',
      description: 'Shown in the avatar circle. If empty, first letter of name is used.',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' }
  }
}
