<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>InvestSmart - Melhorando a vida dos nossos clientes</title>
    <meta name="description"
        content="InvestSmart - Melhorando a vida financeira dos nossos clientes com ferramentas de gestão financeira, recomendações de investimentos e notícias atualizadas." />
    <link rel="stylesheet" href="css/universal-css.css" />
    <link rel="shortcut icon" href="images/Camada 1.png" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <!-- Preload critical fonts -->
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2"
        as="font" type="font/woff2" crossorigin />
</head>

<body>
    <header>
        <div class="container-LOGO">
            <img src="images/Camada 1.png" alt="Logo InvestSmart" />
            <div class="logo">InvestSmart</div>
        </div>

        <!-- Menu Toggle Button -->
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>

        <nav class="nav-menu">
            <ul>
                <li id="comment-header"><a href="index.html">Home</a></li>
                <li id="comment-header"><a href="sobre.html">Sobre Nós</a></li>
                <li id="comment-header"><a href="blogs-main.html">Blogs</a></li>
                <li>
                    <button class="button-header" onclick="window.location.href='servicos.html'">
                        Serviços
                        <i class="fa-solid fa-arrow-right" id="seta"></i>
                    </button>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <?php
        require_once 'php/auth.php';
        if (!isLoggedIn()) {
            header('Location: login.html');
            exit();
        }
        ?>
        <section class="hero">
            <div class="hero-content">
                <h1 style="font-size: 64px">Melhorando a vida dos nossos clientes</h1>
                <p style="max-width: 900px">
                    Quer melhorar sua vida financeira e não sabe como? Aqui na
                    InvestSmart você descobre!
                </p>
                <a href="servicos.html"><button class="button-header" onclick="window.location.href='servicos.html'">
                        Serviços
                        <i class="fa-solid fa-arrow-right" id="seta"></i></button></a>
            </div>
            <div class="hero-image">
                <img src="images/01.png" alt="Imagem ilustrativa" />
            </div>
        </section>

        <section class="features">
            <h2>Gerencie todas suas finanças em um só lugar!</h2>
            <p>O que oferecemos?</p>
            <div class="features-grid">
                <div class="feature-item">
                    <img src="images/blog.svg" alt="Blog de finanças" />
                    <h3>Blog de finanças</h3>
                    <p>
                        Aqui temos blogs de notícias financeiras atualizadas diariamente
                        por nossa equipe, nos blogs tem ensinamentos de finanças e
                        notícias diárias sobre o mercado financeiro.
                    </p>
                </div>
                <div class="feature-item">
                    <img src="images/recommendations.svg" alt="Recomendações de investimentos" />
                    <h3>Recomendações de investimentos</h3>
                    <p>
                        Em um de nossos serviços possuímos ferramentas para auxiliá-los
                        para o que fazer com seu dinheiro e quais riscos quer e pode
                        correr.
                    </p>
                </div>
                <div class="feature-item">
                    <img src="images/analytics.svg" alt="Análise das suas finanças" />
                    <h3>Análise das suas finanças</h3>
                    <p>
                        Aqui na InvestSmart você pode listar todos os seus gastos,
                        oferecemos um gráfico sobre e também recomendamos onde pode ou não
                        economizar mais para investir seu dinheiro.
                    </p>
                </div>
            </div>
        </section>

        <section class="clientes-lista">
            <div class="clientes-content">
                <h2>Já ajudamos milhares de pessoas pelo mundo.</h2>
                <p>Nós da InvestSmart estamos a cada dia maior!</p>
            </div>
            <div class="clientes-stats">
                <div class="stat-item">
                    <i class="fa-solid fa-envelope fa-3x" aria-hidden="true" title="Assinantes Newsletter"></i>
                    <h3>545,341</h3>
                    <p>Assinantes <br />Newsletter</p>
                </div>
                <div class="stat-item">
                    <i class="fa-solid fa-eye fa-3x" aria-hidden="true" title="Visualizações no Blog"></i>
                    <h3>1,232,381</h3>
                    <p>
                        Visualizações no<br />
                        Blog
                    </p>
                </div>
                <div class="stat-item">
                    <i class="fa-solid fa-users fa-3x" aria-hidden="true" title="Seguidores nas Redes Sociais"></i>
                    <h3>128,867</h3>
                    <p>
                        Seguidores nas <br />
                        Redes Sociais
                    </p>
                </div>
            </div>
        </section>

        <section class="blog-container">
            <h2>
                Algumas de Nossas Principais Notícias sobre o Mercado Financeiro
            </h2>
            <p class="description">
                Mantenha-se informado com as últimas atualizações e análises sobre o
                mercado financeiro. Nesta seção, destacamos as notícias mais
                relevantes e impactantes que estão moldando o cenário econômico global
                e local.
            </p>
            <div class="blog-cards">
                <article class="card">
                    <img src="images/blog04.png" alt="Mercados em pânico" />
                    <div class="card-content">
                        <a href="noticia01.html" class="read-more">
                            <h3>
                                Milei nega desvalorização do peso e diz que economia argentina
                                não está sob pressão
                            </h3>
                            Ler Sobre →
                        </a>
                    </div>
                </article>
                <article class="card">
                    <img src="images/blog01.png" alt="Ação da Microsoft afunda" />
                    <div class="card-content">
                        <a href="noticia01.html" class="read-more">
                            <h3>
                                Bolsas de NY fecham em alta firme puxadas por tarifas de Trump
                                e alívio nos Treasuries
                            </h3>
                            Ler Sobre →
                        </a>
                    </div>
                </article>
                <article class="card">
                    <img src="images/blog02.png" alt="Ibovespa tem terceira queda seguida" />
                    <div class="card-content">
                        <a href="noticia03.html" class="read-more">
                            <h3>
                                Trump confirma aplicação de tarifas recíprocas, mas não
                                divulga países ou produtos
                            </h3>
                            Ler Sobre →
                        </a>
                    </div>
                </article>
            </div>
        </section>

        <button id="toggleForm" class="floating-button" aria-label="Abrir formulário de contato">
            <i class="fa-solid fa-envelope fa-2x"></i>
        </button>

        <div id="registerForm" class="form-container" style="display: none">
            <form class="form" id="contactForm" onsubmit="saveToFile(event)">
                <div class="header-container">
                    <p class="title">Entre em Contato</p>
                    <button id="close-btn">X</button>
                </div>
                <p class="message">
                    Ficou com alguma dúvida ou está enfrentando alguma dificuldade em um
                    de nossos serviços?
                </p>
                <div class="flex">
                    <label>
                        <input required="" placeholder="" type="text" class="input" maxlength="10" name="nome" />
                        <span>Nome</span>
                    </label>
                    <label>
                        <input required="" placeholder="" type="text" class="input" maxlength="30" name="sobrenome" />
                        <span>Sobrenome</span>
                    </label>
                </div>
                <label>
                    <input required="" placeholder="" type="text" class="input" name="email" />
                    <span>Email</span>
                </label>
                <textarea id="myTextarea" maxlength="1000" rows="5" placeholder="Escreva sua mensagem aqui..."
                    name="mensagem"></textarea>
                <div id="charCount" class="char-count">1000 caracteres restantes</div>
                <button class="submit">Enviar</button>
            </form>
        </div>
    </main>

    <footer>
        <div class="container-footer">
            <div class="row-footer">
                <!-- footer col-->
                <div class="footer-col">
                    <h4>Site</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="blogs-main.html">Blogs</a></li>
                        <li><a href="sobre.html">Quem somos</a></li>
                        <li><a href="servicos.html">Serviços</a></li>
                    </ul>
                </div>
                <!--end footer col-->
                <!-- footer col-->
                <div class="footer-col">
                    <h4>Redes Sociais</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instragram</a></li>
                        <li><a href="#">Tiktok</a></li>
                        <li><a href="#">Youtube</a></li>
                    </ul>
                </div>
                <!--end footer col-->
                <!-- footer col-->
                <div class="footer-col">
                    <h4>Serviços</h4>
                    <ul>
                        <li><a href="calculo-despesas.html">Calculos de Despesas</a></li>
                        <li><a href="recomendacaoinvestimento.html">Investimentos</a></li>
                    </ul>
                </div>
                <!--end footer col-->
                <!-- footer col-->
                <div class="footer-col">
                    <h4>Inscreva-se na Newsletter</h4>
                    <div class="form-sub">
                        <form>
                            <input type="email" placeholder="Digite o seu e-mail" required />
                            <button>Se inscrever</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Adicione antes do fechamento do </body> -->
    <script src="script/js-universal.js"></script>
    <script src="script/contact.js"></script>
    <script src="https://kit.fontawesome.com/65f22fe718.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script src="script/script.js"></script>
    <script src="https://kit.fontawesome.com/e1063b7707.js" crossorigin="anonymous"></script>
    <script src="script/enviar-email.js"></script>
    <!-- Move non-critical CSS to end of body -->
    <link rel="stylesheet" href="css/style-main.css" media="print" onload="this.media='all'" />
</body>

</html>
