const { DateTime } = require('luxon')

module.exports = function (eleventyConfig) {
  // Copiar arquivos estáticos
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('script')
  eleventyConfig.addPassthroughCopy('*.html')

  // Coleção de posts
  eleventyConfig.addCollection('post', function (collection) {
    return collection.getFilteredByGlob('src/posts/**/*.md')
  })

  // Coleção de categorias únicas
  eleventyConfig.addCollection('categories', function (collection) {
    const posts = collection.getFilteredByGlob('src/posts/**/*.md')
    const categories = new Set()
    posts.forEach((post) => {
      if (post.data.category) {
        categories.add(post.data.category)
      }
    })
    return Array.from(categories)
  })

  // Formatar datas
  eleventyConfig.addFilter('formatDate', function (date) {
    return DateTime.fromJSDate(date).toFormat("dd 'de' MMMM 'de' yyyy")
  })

  // Ordenar por visualizações
  eleventyConfig.addFilter('sortByViews', function (posts) {
    return posts.sort((a, b) => {
      const viewsA = a.data.views || 0
      const viewsB = b.data.views || 0
      return viewsB - viewsA
    })
  })

  // Limitar número de itens
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit)
  })

  // Configurações de entrada e saída
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_layouts',
      data: '_data',
    },
    templateFormats: ['html', 'md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/InvestSavy/',
    url: 'https://lcodebase.github.io',
    permalink: '/{{ page.filePathStem }}/',
  }
}
