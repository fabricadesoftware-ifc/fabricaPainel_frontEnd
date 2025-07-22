<template>
    <LayoutDefault>
        <v-container class="py-8 mt-10">
            <v-row class="justify-center">
                <v-col cols="12" lg="10" xl="8">
                    <!-- Header -->
                    <div class="text-center mb-8">
                        <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                            Suporte ao Usuário
                        </h1>
                        <p class="text-h6 text-grey-darken-1">
                            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo.
                        </p>
                    </div>

                    <!-- Cards de Contato -->
                    <v-row class="mb-8">
                        <!-- Card Fábrica de Software -->
                        <v-col cols="12" md="6">
                            <v-card class="h-100 pa-6 rounded-xl" elevation="3" hover>
                                <div class="text-center mb-4">
                                    <v-icon color="primary" size="64" class="mb-2">
                                        mdi-monitor-dashboard
                                    </v-icon>
                                    <h3 class="text-h5 font-weight-bold text-primary mb-2">
                                        Fábrica de Software
                                    </h3>
                                </div>

                                <v-divider class="mb-4"></v-divider>

                                <div class="mb-4">
                                    <h4 class="text-h6 font-weight-bold mb-3">Responsabilidades:</h4>
                                    <v-chip-group column>
                                        <v-chip color="blue-lighten-4" label>
                                            <v-icon start>mdi-bug</v-icon>
                                            Problemas técnicos no sistema
                                        </v-chip>
                                        <v-chip color="blue-lighten-4" label>
                                            <v-icon start>mdi-account-question</v-icon>
                                            Dificuldades de acesso
                                        </v-chip>
                                        <v-chip color="blue-lighten-4" label>
                                            <v-icon start>mdi-web</v-icon>
                                            Erros na plataforma
                                        </v-chip>
                                        <v-chip color="blue-lighten-4" label>
                                            <v-icon start>mdi-upload</v-icon>
                                            Problemas com uploads
                                        </v-chip>
                                    </v-chip-group>
                                </div>

                                <v-card-text class="pa-0">
                                    <v-btn :href="`mailto:fabricadesoftware.araquari@ifc.edu.br`" color="primary"
                                        variant="flat" block class="rounded-xl py-3" size="large">
                                        <v-icon start>mdi-email</v-icon>
                                        <span class="text-wrap d-inline-block email-text">
                                            fabricadesoftware.araquari@ifc.edu.br
                                        </span>
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Card Coordenação do Painel -->
                        <v-col cols="12" md="6">
                            <v-card class="h-100 pa-6 rounded-xl" elevation="3" hover>
                                <div class="text-center mb-4">
                                    <v-icon color="primary" size="64" class="mb-2">
                                        mdi-account-supervisor
                                    </v-icon>
                                    <h3 class="text-h5 font-weight-bold text-primary mb-2">
                                        Coordenação do Painel
                                    </h3>
                                </div>

                                <v-divider class="mb-4"></v-divider>

                                <div class="mb-4">
                                    <h4 class="text-h6 font-weight-bold mb-3">Responsabilidades:</h4>
                                    <v-chip-group column>
                                        <v-chip color="green-lighten-4" label>
                                            <v-icon start>mdi-school</v-icon>
                                            Questões acadêmicas
                                        </v-chip>
                                        <v-chip color="green-lighten-4" label>
                                            <v-icon start>mdi-calendar-check</v-icon>
                                            Cronograma e prazos
                                        </v-chip>
                                        <v-chip color="green-lighten-4" label>
                                            <v-icon start>mdi-file-document</v-icon>
                                            Regras e regulamentos
                                        </v-chip>
                                        <v-chip color="green-lighten-4" label>
                                            <v-icon start>mdi-account-group</v-icon>
                                            Orientações gerais
                                        </v-chip>
                                    </v-chip-group>
                                </div>

                                <v-card-text class="pa-0">
                                    <v-btn :href="`mailto:painel.araquari@ifc.edu.br`" color="primary" variant="flat"
                                        block class="rounded-xl py-3" size="large">
                                        <v-icon start>mdi-email</v-icon>
                                        <span class="text-wrap d-inline-block email-text">
                                            painel.araquari@ifc.edu.br
                                        </span>
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Seção de Dicas -->
                    <v-card class="mb-8 pa-6 rounded-xl" elevation="2">
                        <h3 class="text-h5 font-weight-bold mb-4 text-primary">
                            <v-icon start color="primary">mdi-lightbulb-on</v-icon>
                            Dicas para um melhor atendimento
                        </h3>

                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-start ga-3 mb-4">
                                    <v-icon color="success" size="24">mdi-check-circle</v-icon>
                                    <div>
                                        <h5 class="font-weight-bold mb-1">Seja específico</h5>
                                        <p class="text-body-2 text-grey-darken-1">
                                            Descreva detalhadamente o problema encontrado
                                        </p>
                                    </div>
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-start ga-3 mb-4">
                                    <v-icon color="success" size="24">mdi-camera</v-icon>
                                    <div>
                                        <h5 class="font-weight-bold mb-1">Anexe prints</h5>
                                        <p class="text-body-2 text-grey-darken-1">
                                            Envie capturas de tela quando possível
                                        </p>
                                    </div>
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-start ga-3 mb-4">
                                    <v-icon color="success" size="24">mdi-clock-time-four</v-icon>
                                    <div>
                                        <h5 class="font-weight-bold mb-1">Informe o horário</h5>
                                        <p class="text-body-2 text-grey-darken-1">
                                            Mencione quando o problema ocorreu
                                        </p>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>

                    <!-- FAQ Rápido -->
                    <v-card class="pa-6 rounded-xl" elevation="2">
                        <h3 class="text-h5 font-weight-bold mb-4 text-primary">
                            <v-icon start color="primary">mdi-frequently-asked-questions</v-icon>
                            Dúvidas Frequentes
                        </h3>

                        <v-expansion-panels variant="accordion" class="rounded-lg">
                            <v-expansion-panel title="Como faço para submeter meu trabalho?"
                                text="Acesse a plataforma, vá até 'Submissão de Trabalhos' e siga o passo a passo. Certifique-se de que todos os campos obrigatórios estejam preenchidos." />

                            <v-expansion-panel title="Esqueci minha senha, como recuperar?"
                                text="Na tela de login, clique em 'Esqueci minha senha' e siga as instruções enviadas para seu e-mail cadastrado." />

                            <v-expansion-panel title="Posso editar meu trabalho após a submissão?"
                                text="Isso depende do prazo e das regras do edital. Consulte a coordenação do painel para mais informações específicas." />

                            <v-expansion-panel title="Como sei se meu trabalho foi aceito?"
                                text="Você receberá uma notificação por e-mail e poderá acompanhar o status diretamente na plataforma." />
                        </v-expansion-panels>
                    </v-card>

                    <!-- Botão de Voltar -->
                    <div class="text-center mt-8">
                        <v-btn color="primary" variant="outlined" class="rounded-xl px-8 py-2" @click="$router.go(-1)">
                            <v-icon start>mdi-arrow-left</v-icon>
                            Voltar
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </LayoutDefault>
</template>

<script setup>
import LayoutDefault from '@/components/layout/LayoutDefault.vue'

// Meta tags para SEO
onMounted(() => {
    document.title = 'Suporte ao Usuário - Painel de Integração'

    // Atualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Entre em contato conosco para suporte técnico e acadêmico. Fábrica de Software e Coordenação do Painel.')
})
</script>

<style scoped>
.v-chip {
    margin-bottom: 8px;
}

.v-card {
    transition: transform 0.2s ease-in-out;
}

.v-card:hover {
    transform: translateY(-2px);
}

.email-text {
    word-break: break-all;
    line-height: 1.2;
    max-width: 100%;
}

@media (max-width: 960px) {
    .text-h3 {
        font-size: 2rem !important;
    }

    .text-h5 {
        font-size: 1.5rem !important;
    }
}

@media (max-width: 600px) {
    .v-chip {
        font-size: 0.75rem;
    }

    .pa-6 {
        padding: 16px !important;
    }

    .email-text {
        font-size: 0.85rem;
        word-break: break-word;
    }

    .v-btn--size-large {
        padding: 12px 16px !important;
        min-height: auto !important;
    }
}

@media (max-width: 400px) {
    .email-text {
        font-size: 0.8rem;
    }
}
</style>