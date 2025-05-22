const { DateTime } = require('luxon')

module.exports = function (eleventyConfig) {
  // Copiar arquivos estáticos
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('script')
  eleventyConfig.addPassthroughCopy('index.html')
  eleventyConfig.addPassthroughCopy('**/*.html')

  // Formatar datas
  eleventyConfig.addFilter('formatDate', function (date) {
    return DateTime.fromJSDate(date)
      .setLocale('pt-BR')
      .toFormat("dd 'de' MMMM, yyyy")
  })

  // Ordenar por visualizações
  eleventyConfig.addFilter('sortByViews', function (posts) {
    return posts.sort((a, b) => (b.data.views || 0) - (a.data.views || 0))
  })

  // Limitar número de itens
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit)
  })

  // Coletar categorias únicas
  eleventyConfig.addCollection('categories', function (collection) {
    const categories = new Set()
    collection.getAll().forEach((item) => {
      if (item.data.category) {
        categories.add(item.data.category)
      }
    })
    return Array.from(categories)
  })

  // Configurações de entrada e saída
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['html', 'md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  }
}
