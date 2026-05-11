export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tech Skills', value: 'tech' },
          { title: 'Language Mastery', value: 'languages' },
          { title: 'Musical Arts', value: 'musical' },
          { title: 'Handcraft Studio', value: 'handcrafts' },
          { title: 'Business & Management', value: 'business' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 12 Weeks'
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
          { title: 'All Levels', value: 'All Levels' }
        ]
      }
    },
    {
      name: 'icon',
      title: 'Icon Name (Phosphor)',
      type: 'string',
      description: 'e.g., ph-code, ph-music-notes',
      initialValue: 'ph-graduation-cap'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category'
    }
  }
}
