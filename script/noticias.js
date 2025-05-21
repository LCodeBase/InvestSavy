fetch('noticias.json')
    .then(response => response.json())
    .then(noticias => {
      const noticia = noticias[0]; // Pega a primeira notícia como destaque

      // Gerar uma chave única para a notícia (pode ser pelo título ou outro identificador)
      const viewKey = `views_${noticia.title.replace(/\s+/g, '_')}`;
      let views = parseInt(localStorage.getItem(viewKey)) || 0;
      views++;
      localStorage.setItem(viewKey, views);

      const data = new Date(noticia.date);
      const dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const horaFormatada = data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const artigoHTML = `
        <article class="featured-news">
          <div class="featured-news-image">
            <img src="${noticia.image}" alt="${noticia.title}" />
            <span class="tag ${noticia.categories.toLowerCase()}">${noticia.categories}</span>
          </div>
          <div class="featured-news-content">
            <h2>${noticia.title}</h2>
            <p>${noticia.excerpt}</p>
            <div class="news-meta">
              <span class="date"><i class="far fa-calendar"></i> ${dataFormatada}</span>
              <span class="time"><i class="far fa-clock"></i> ${horaFormatada}</span>
              <span class="views"><i class="far fa-eye"></i> ${views.toLocaleString('pt-BR')}</span>
            </div>
            <span class="author">Por ${noticia.author}</span>
          </div>
        </article>
      `;

      document.getElementById('noticia-destaque').innerHTML = artigoHTML;
    });
