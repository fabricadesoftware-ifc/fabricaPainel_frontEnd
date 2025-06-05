<script lang="ts" setup>
// @ts-nocheck
const screenWidth = ref(0)

onMounted(() => {
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth
  })
  screenWidth.value = window.innerWidth
})

const teamMembers = [
  {
    role: 'Desenvolvedores Frontend',
    members: [
      { name: 'Mateus Lopes Albano', github: 'mateus-lopes' },
      { name: 'Cauã Vinícius Silva', github: 'Caussz' },
      { name: 'Jonatas Silva Peraza', github: 'jonatasperaza' },
      { name: 'Luan Silva', github: 'luansilva25' },
      { name: 'Rafael Bochi Barros', github: 'RafaelBochi' },
      { name: 'Vinícius Nilo Hiansdt', github: 'Hiansdt' },
    ]
  },
  {
    role: 'Desenvolvedores Backend',
    members: [
      { name: 'Lucas Gabriel Antonete', github: 'LucasGabrielAntonete' },
      { name: 'Rafael Bochi Barros', github: 'RafaelBochi' },
      { name: 'Vinícius Nilo Hiansdt', github: 'Hiansdt' },
    ]
  }
]

const features = [
  {
    title: 'Submissão Facilitada',
    description: 'Interface intuitiva para envio de trabalhos acadêmicos de forma simples e eficiente.',
    icon: 'mdi-upload',
    color: 'primary'
  },
  {
    title: 'Avaliação Imparcial',
    description: 'Sistema de avaliação aleatória garantindo transparência e qualidade.',
    icon: 'mdi-shield-check',
    color: 'success'
  },
  {
    title: 'Integração Acadêmica',
    description: 'Conectando ensino, pesquisa e extensão em uma única plataforma.',
    icon: 'mdi-school',
    color: 'info'
  }
]
</script>

<template>
  <div class="about-banner">
    <!-- Hero Section com Gradiente -->
    <v-container fluid class="hero-section pa-0">
      <v-row no-gutters class="hero-gradient d-flex align-center justify-center" style="min-height: 400px;">
        <v-col cols="12" md="10" lg="8" class="text-center text-white">
          <v-fade-transition appear>
            <div>
              <h1 class="display-1 font-weight-bold mb-4" :class="screenWidth < 600 ? 'text-h3' : 'display-1'">
                Sobre o Projeto
              </h1>
              <p class="text-h6 mb-6 font-weight-light" :class="screenWidth < 600 ? 'text-body-1' : 'text-h6'">
                Sistema de Gestão da Semana de Ensino, Pesquisa e Extensão
              </p>
                <v-chip color="primary cursor-pointer" size="large" variant="elevated" href="https://araquari.ifc.edu.br/">
                  <v-icon start icon="mdi-school"></v-icon>
                  Campus Araquari
                </v-chip>
            </div>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- Seções de Conteúdo -->
    <v-container class="py-12" fluid>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">

          <!-- Cards com informações principais -->
          <v-row class="mb-8">
            <v-col cols="12" md="6" lg="4" v-for="(feature, index) in features" :key="index">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  class="feature-card h-100 pa-6"
                  :elevation="isHovering ? 8 : 2"
                  rounded="xl"
                  :class="{ 'card-hover': isHovering }"
                >
                  <v-card-text class="text-center">
                    <v-avatar size="64" :color="feature.color" class="mb-4">
                      <v-icon size="32" :icon="feature.icon" color="white"></v-icon>
                    </v-avatar>
                    <h3 class="text-h6 font-weight-bold mb-3">{{ feature.title }}</h3>
                    <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>

          <!-- Seções Expandíveis -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-3">mdi-school-outline</v-icon>
                  <span class="text-h6 font-weight-medium">Semana de Ensino, Pesquisa e Extensão</span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 pa-4">
                  A Semana de Ensino, Pesquisa e Extensão é um evento central em nossa instituição, que atua na socialização do conhecimento e divulgação de pesquisas regionais e nacionais. Conta com a participação de palestrantes convidados, brasileiros e estrangeiros, e uma variedade de atividades como congressos, seminários, minicursos e workshops, incluindo as semanas acadêmicas de Medicina Veterinária, Informática, Licenciaturas e o Painel de Integração de Conhecimentos.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon color="success" class="mr-3">mdi-shield-check</v-icon>
                  <span class="text-h6 font-weight-medium">Excelência e Imparcialidade</span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 pa-4">
                  Nosso sistema visa a excelência e imparcialidade na avaliação de trabalhos, garantindo uma avaliação diversificada e de alta qualidade. O uso do Painel de Integração da SEPE para a escolha aleatória de orientadores e avaliadores assegura a diversidade nas avaliações. Os participantes têm acesso a uma ampla variedade de temas, promovendo a socialização de seus interesses acadêmicos.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon color="info" class="mr-3">mdi-upload</v-icon>
                  <span class="text-h6 font-weight-medium">Facilidade na Submissão</span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 pa-4">
                  Este sistema foi desenvolvido para facilitar a submissão de trabalhos de ensino, pesquisa e extensão, caracterizando o desenvolvimento colaborativo entre estudantes, professores e comunidade. Submeta projetos, colabore em diversas áreas e contribua para o avanço da ciência e sociedade.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Seção Fábrica de Software -->
          <v-card class="mb-8 pa-8" rounded="xl" color="grey-lighten-4">
            <v-row align="center">
              <v-col cols="12" md="8">
                <h2 class="text-h4 font-weight-bold text-primary mb-4">
                  <v-icon color="primary" class="mr-2">mdi-factory</v-icon>
                  Fábrica de Software
                </h2>
                <p class="text-body-1 mb-4">
                  A Fábrica de Software é uma iniciativa que aproxima alunos do mercado de trabalho, proporcionando a oportunidade de desenvolver soluções reais para iniciativas públicas e privadas, simulando o ambiente de grandes empresas de software.
                </p>
                <v-row>
                  <v-col cols="6" md="3">
                    <v-card class="text-center pa-4" color="primary" dark rounded="lg">
                      <h3 class="text-h4 font-weight-bold">10+</h3>
                      <p class="text-body-2">Anos</p>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-card class="text-center pa-4" color="success" dark rounded="lg">
                      <h3 class="text-h4 font-weight-bold">200+</h3>
                      <p class="text-body-2">Alunos</p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" class="text-center">
                <v-img
                  src="@/assets/logo_FABRICA.png"
                  alt="Fábrica de Software"
                  max-width="200"
                  class="mx-auto"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>

          <!-- Equipe de Desenvolvimento -->
          <v-card rounded="xl" class="pa-6">
            <h2 class="text-h4 font-weight-bold text-center mb-6">
              <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
              Equipe de Desenvolvimento
            </h2>

            <v-row>
              <v-col cols="12" md="6" v-for="team in teamMembers" :key="team.role">
                <v-card class="pa-4 h-100" variant="outlined" rounded="lg">
                  <h3 class="text-h6 font-weight-bold mb-3 text-primary">{{ team.role }}</h3>
                  <v-chip-group column>
                    <v-chip
                      v-for="member in team.members"
                      :key="member.name"
                      :href="`https://github.com/${member.github}`"
                      target="_blank"
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      <v-icon start icon="mdi-github"></v-icon>
                      {{ member.name }}
                    </v-chip>
                  </v-chip-group>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <v-row>
              <v-col cols="12" md="6">
                <h4 class="text-h6 font-weight-bold mb-2">Analista de Requisitos</h4>
                <v-chip color="info" href="https://github.com/ldmfabio" target="_blank">
                  <v-icon start icon="mdi-github"></v-icon>
                  Prof. Fábio Longo de Moura
                </v-chip>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="text-h6 font-weight-bold mb-2">Orientadores</h4>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip color="secondary" href="https://github.com/ldmfabio" target="_blank">
                    <v-icon start icon="mdi-github"></v-icon>
                    Prof. Fábio Longo de Moura
                  </v-chip>
                  <v-chip color="secondary" href="https://github.com/eduardo-da-silva">
                    <v-icon start icon="mdi-account"></v-icon>
                    Prof. Eduardo da Silva
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
}

.hero-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  position: relative;
}

.hero-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.feature-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.1);
}

.card-hover {
  transform: translateY(-4px);
}

.feature-card:hover {
  border-color: #1976d2;
}

a {
  text-decoration: none;
}

.v-chip {
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: scale(1.05);
}
</style>
