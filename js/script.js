function alternarMenuMobile() {
            const menu = document.getElementById('menuMobile');
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
            }
        }


        (function(){
            emailjs.init("kzqkQzyyono0LWles");
        })();

        function enviarEmail(event) {
            event.preventDefault();
            
            const botaoEnviar = document.getElementById('botaoEnviar');
            const textoOriginal = botaoEnviar.textContent;
            

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !mensagem) {
                alert('❌ Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            

            botaoEnviar.textContent = 'Enviando...';
            botaoEnviar.disabled = true;
            

            const parametrosTemplate = {
                from_name: nome,
                from_email: email,
                project_type: document.getElementById('tipoProjeto').value,
                message: mensagem,
                to_email: 'contato@codebuildstudio.com.br',
                reply_to: email
            };
            

            emailjs.send('service_kkacw8s', 'template_xnijapq', parametrosTemplate)
                .then(function(response) {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    

                    botaoEnviar.textContent = textoOriginal;
                    botaoEnviar.disabled = false;
                    

                    alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    

                    document.getElementById('formularioContato').reset();
                    
                }, function(error) {
                    console.error('Erro ao enviar email:', error);
                    

                    botaoEnviar.textContent = textoOriginal;
                    botaoEnviar.disabled = false;
                    

                    alert('❌ Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp: +55 (11) 95939-9021');
                });
        }


        document.querySelectorAll('a[href^="#"]').forEach(ancora => {
            ancora.addEventListener('click', function (e) {
                e.preventDefault();
                

                document.querySelectorAll('.link-navegacao').forEach(link => {
                    link.classList.remove('ativo');
                });
                

                this.classList.add('ativo');
                
                const alvo = document.querySelector(this.getAttribute('href'));
                if (alvo) {
                    alvo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });


        document.querySelectorAll('#menuMobile a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('menuMobile').style.display = 'none';
            });
        });


        window.addEventListener('scroll', () => {
            const secoes = ['home', 'about', 'services', 'portfolio', 'contact'];
            const posicaoScroll = window.scrollY + 100;

            secoes.forEach(secao => {
                const elemento = document.getElementById(secao);
                if (elemento) {
                    const topoOffset = elemento.offsetTop;
                    const fundoOffset = topoOffset + elemento.offsetHeight;

                    if (posicaoScroll >= topoOffset && posicaoScroll < fundoOffset) {

                        document.querySelectorAll('.link-navegacao').forEach(link => {
                            link.classList.remove('ativo');
                        });
                        

                        document.querySelectorAll(`a[href="#${secao}"]`).forEach(link => {
                            link.classList.add('ativo');
                        });
                    }
                }
            });
        });


        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('a[href="#home"]').forEach(link => {
                link.classList.add('ativo');
            });
        });


        const textos = [
            'ideias digitais',
            'sites responsivos', 
            'lojas virtuais',
            'landing pages',
            'sistemas web',
            'experiências únicas'
        ];
        let indiceAtual = 0;
        const elementoTextoAlternado = document.getElementById('textoAlternado');
        let estaDigitando = false;

        function digitarTexto(texto, callback) {
            if (estaDigitando) return;
            estaDigitando = true;
            
            elementoTextoAlternado.textContent = '';
            let indiceCaracter = 0;
            
            const intervaloDigitacao = setInterval(() => {
                if (indiceCaracter < texto.length) {
                    elementoTextoAlternado.textContent += texto.charAt(indiceCaracter);
                    indiceCaracter++;
                } else {
                    clearInterval(intervaloDigitacao);
                    estaDigitando = false;
                    if (callback) callback();
                }
            }, 100);
        }

        function apagarTexto(callback) {
            if (estaDigitando) return;
            estaDigitando = true;
            
            const textoAtual = elementoTextoAlternado.textContent;
            let indiceCaracter = textoAtual.length;
            
            const intervaloApagar = setInterval(() => {
                if (indiceCaracter > 0) {
                    elementoTextoAlternado.textContent = textoAtual.substring(0, indiceCaracter - 1);
                    indiceCaracter--;
                } else {
                    clearInterval(intervaloApagar);
                    estaDigitando = false;
                    if (callback) callback();
                }
            }, 50);
        }

        function iniciarAnimacaoDigitacao() {

            digitarTexto(textos[indiceAtual], () => {

                setTimeout(() => {

                    apagarTexto(() => {

                        indiceAtual = (indiceAtual + 1) % textos.length;
        
                        setTimeout(iniciarAnimacaoDigitacao, 500);
                    });
                }, 2000);
            });
        }


        document.addEventListener('DOMContentLoaded', () => {

            setTimeout(iniciarAnimacaoDigitacao, 1000);
        });
