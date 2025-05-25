import security from './security.js'

const sqlInjectionProtection = {
  // Configurações
  config: {
    maxQueryLength: 1000,
    maxParams: 10,
    allowedOperators: ['=', '>', '<', '>=', '<=', 'LIKE', 'IN', 'BETWEEN'],
    allowedFunctions: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
    allowedTables: ['noticias', 'usuarios', 'categorias'],
    allowedColumns: {
      noticias: ['id', 'titulo', 'conteudo', 'data', 'categoria', 'autor'],
      usuarios: ['id', 'nome', 'email', 'data_cadastro'],
      categorias: ['id', 'nome', 'descricao'],
    },
  },

  // Função para sanitizar parâmetros SQL
  sanitizeParams: (params) => {
    if (!params) return []

    // Verificar número máximo de parâmetros
    if (params.length > sqlInjectionProtection.config.maxParams) {
      throw new Error('Número máximo de parâmetros excedido')
    }

    return params.map((param) => {
      // Sanitizar string
      if (typeof param === 'string') {
        return security.sanitizeSQL(param)
      }
      // Sanitizar número
      if (typeof param === 'number') {
        return param
      }
      // Sanitizar array
      if (Array.isArray(param)) {
        return param.map((p) => sqlInjectionProtection.sanitizeParams([p])[0])
      }
      // Sanitizar objeto
      if (typeof param === 'object') {
        return sqlInjectionProtection.sanitizeObject(param)
      }
      return param
    })
  },

  // Função para sanitizar objeto
  sanitizeObject: (obj) => {
    if (!obj) return {}

    const sanitized = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = security.sanitizeSQL(value)
      } else if (typeof value === 'object') {
        sanitized[key] = sqlInjectionProtection.sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
    return sanitized
  },

  // Função para validar query SQL
  validateQuery: (query) => {
    if (!query) return false

    // Verificar tamanho máximo
    if (query.length > sqlInjectionProtection.config.maxQueryLength) {
      throw new Error('Query muito longa')
    }

    // Converter para minúsculas para comparação
    const lowerQuery = query.toLowerCase()

    // Verificar palavras-chave perigosas
    const dangerousKeywords = [
      'drop',
      'delete',
      'truncate',
      'update',
      'insert',
      'alter',
      'exec',
      'execute',
      'xp_',
      'sp_',
      '--',
      '/*',
      '*/',
      ';',
      'union',
      'select',
    ]

    for (const keyword of dangerousKeywords) {
      if (lowerQuery.includes(keyword)) {
        throw new Error('Query contém palavras-chave não permitidas')
      }
    }

    // Verificar tabelas permitidas
    const tableRegex = /from\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi
    let match
    while ((match = tableRegex.exec(lowerQuery)) !== null) {
      const table = match[1]
      if (!sqlInjectionProtection.config.allowedTables.includes(table)) {
        throw new Error(`Tabela '${table}' não permitida`)
      }
    }

    // Verificar colunas permitidas
    const columnRegex = /select\s+([^from]+)/i
    const columnMatch = columnRegex.exec(lowerQuery)
    if (columnMatch) {
      const columns = columnMatch[1].split(',').map((col) => col.trim())
      for (const column of columns) {
        let found = false
        for (const table of sqlInjectionProtection.config.allowedTables) {
          if (
            sqlInjectionProtection.config.allowedColumns[table].includes(column)
          ) {
            found = true
            break
          }
        }
        if (!found) {
          throw new Error(`Coluna '${column}' não permitida`)
        }
      }
    }

    return true
  },

  // Função para construir query segura
  buildSafeQuery: (table, conditions = {}, options = {}) => {
    // Validar tabela
    if (!sqlInjectionProtection.config.allowedTables.includes(table)) {
      throw new Error(`Tabela '${table}' não permitida`)
    }

    // Construir SELECT
    let query = `SELECT * FROM ${table}`

    // Adicionar condições
    if (Object.keys(conditions).length > 0) {
      query += ' WHERE '
      const conditionsArray = []

      for (const [column, value] of Object.entries(conditions)) {
        // Validar coluna
        if (
          !sqlInjectionProtection.config.allowedColumns[table].includes(column)
        ) {
          throw new Error(`Coluna '${column}' não permitida`)
        }

        // Sanitizar valor
        const sanitizedValue = security.sanitizeSQL(value)
        conditionsArray.push(`${column} = '${sanitizedValue}'`)
      }

      query += conditionsArray.join(' AND ')
    }

    // Adicionar opções
    if (options.orderBy) {
      const [column, direction] = options.orderBy.split(' ')
      if (
        !sqlInjectionProtection.config.allowedColumns[table].includes(column)
      ) {
        throw new Error(`Coluna '${column}' não permitida para ordenação`)
      }
      query += ` ORDER BY ${column} ${direction.toUpperCase()}`
    }

    if (options.limit) {
      query += ` LIMIT ${parseInt(options.limit)}`
    }

    if (options.offset) {
      query += ` OFFSET ${parseInt(options.offset)}`
    }

    return query
  },
}

export default sqlInjectionProtection
