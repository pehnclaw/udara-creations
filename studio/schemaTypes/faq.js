export default {
  name: 'faq',
  title: 'Academy FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Enrollment', value: 'enrollment'},
          {title: 'Curriculum', value: 'curriculum'},
          {title: 'Payment & Logistics', value: 'payment'}
        ],
        layout: 'radio'
      },
      initialValue: 'general'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show up first. Leave blank for alphabetical ordering.'
    }
  ]
}
