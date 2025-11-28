# 🌤️ ClimaAgora

Um aplicativo móvel elegante e eficiente para previsão do tempo em tempo real, construído com a robustez do **React Native** e **TypeScript**.

---

## 📋 Sobre o Projeto

O **ClimaAgora** é uma aplicação mobile desenvolvida para oferecer consultas meteorológicas rápidas e precisas.

O projeto foi arquitetado com foco em:

- **Clean Code**
- **UX responsiva**
- **Boas práticas de arquitetura**
- **Tipagem estática (Type-Safe)**

A interface se adapta perfeitamente a dispositivos móveis e também funciona via Web utilizando o ecossistema do Expo.

A forte tipagem via **TypeScript** garante maior estabilidade, legibilidade e segurança no desenvolvimento.

---

## ✨ Funcionalidades (Core Features)

O aplicativo contempla os requisitos funcionais e os aprimora com boas práticas modernas:

### 🔍 1. Busca Inteligente
- Campo de entrada com sanitização de dados:
  - `trim()`
  - `encodeURIComponent()`
- Evita consultas inválidas ou corrompidas.

### 📡 2. Integração via API
- Consumo assíncrono da **Open-Meteo API**:
  - Geocoding
  - Previsão do tempo (Forecast)

### ⚡ 3. Feedback Visual
- Utilização de `ActivityIndicator` para melhorar o UX.

### 🎨 4. UI Dinâmica
- Ícones e descrições climáticas variam automaticamente:
  - Ex.: *"Céu Limpo"*, *"Tempestade"*, *"Chuvisco"*.

### 🛡️ 5. Tratamento Robusto de Erros
- Estrutura `try/catch` garante resiliência mesmo com:
  - Falhas de rede
  - Cidades inexistentes
  - Dados inconsistentes da API

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com o que há de mais atual no ecossistema React Native:

- **React Native** — Framework principal
- **Expo** — Build, Dev Tools e suporte multiplataforma
- **TypeScript** — Tipagem estática e segurança
- **Expo Router** — Roteamento baseado em arquivos (file-system routing)
- **Open-Meteo API** — Geocoding + Weather Forecast
- **Ionicons** — Biblioteca de ícones vetoriais moderna

---
## 🔧 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente.

### ✔️ Pré-Requisitos
- **Node.js** instalado

### 📥 1. Clone o repositório

```bash
git clone [https://github.com/tassianasc/clima_agora.git]
```
