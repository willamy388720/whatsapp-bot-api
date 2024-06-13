# API para Gerenciamento de Contatos e Mensagens Maliciosas

Esta API permite gerenciar contatos maliciosos, palavras-chave usadas em golpes e mensagens maliciosas completas. As funcionalidades incluem salvar, atualizar, listar, visualizar detalhes e apagar esses dados, permitindo a análise de mensagens recebidas para detectar fraudes.

## Instalação

1. Clone o repositório para sua máquina local.
2. Instale as dependências necessárias utilizando npm:
   ```
   npm i
   ```

## Uso

1. Inicie a API:
   ```
   npm run dev
   ```
2. Utilize uma ferramenta como Postman ou cURL para interagir com os endpoints descritos.

## Funcionalidades

#### Contatos Maliciosos

- Salvar contato malicioso
- Atualizar contato malicioso
- Retornar lista de contatos maliciosos
- Ver detalhes de um contato específico
- Apagar um contato malicioso

### Palavras-Chave de Golpes

- Salvar palavra-chave
- Retornar lista de palavras-chave
- Apagar uma palavra-chave específica

#### Mensagens Maliciosas

- Salvar mensagem maliciosa
- Retornar lista de mensagens maliciosas
- Apagar uma mensagem maliciosa específica

## Endpoints

### Contatos Maliciosos

#### Salvar Contato Malicioso

- **URL:** `/contacts`
- **Método:** `POST`
- **Descrição:** Salva um novo contato malicioso.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Zé Augusto",
    "photo_url": "www.photo.com",
    "phone_number": "558588888888"
  }
  ```

#### Atualizar Contato Malicioso

- **URL:** `/contacts/{id}`
- **Método:** `PUT`
- **Descrição:** Atualiza as informações de um contato malicioso existente.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Zé Augusto",
    "photo_url": "www.photo.com",
    "phone_number": "558588888888"
  }
  ```

#### Retornar Lista de Contatos Maliciosos

- **URL:** `/contacts`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de todos os contatos maliciosos.

#### Ver Detalhes de um Contato Específico

- **URL:** `/contacts/{id}`
- **Método:** `GET`
- **Descrição:** Retorna os detalhes de um contato malicioso específico.

#### Apagar um Contato Malicioso

- **URL:** `/contacts/{id}`
- **Método:** `DELETE`
- **Descrição:** Apaga um contato malicioso específico.

### Palavras-Chave de Golpes

#### Salvar Palavra-Chave

- **URL:** `/keywords`
- **Método:** `POST`
- **Descrição:** Salva uma nova palavra-chave usada em golpes.
- **Corpo da Requisição:**
  ```json
  {
    "word": "Palavra-Chave"
  }
  ```

#### Retornar Lista de Palavras-Chave

- **URL:** `/akeywords`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de todas as palavras-chave usadas em golpes.

#### Apagar uma Palavra-Chave Específica

- **URL:** `/keywords/{id}`
- **Método:** `DELETE`
- **Descrição:** Apaga uma palavra-chave específica.

### Mensagens Maliciosas

#### Salvar Mensagem Maliciosa

- **URL:** `/suspicious_messages`
- **Método:** `POST`
- **Descrição:** Salva uma nova mensagem maliciosa completa.
- **Corpo da Requisição:**
  ```json
  {
    "message": "Conteúdo da Mensagem Maliciosa",
    "name": "Zé Augusto",
    "photo_url": "www.photo.com",
    "phone_number": "558588888888"
  }
  ```

#### Retornar Lista de Mensagens Maliciosas

- **URL:** `/suspicious_messages`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de todas as mensagens maliciosas completas.

#### Apagar uma Mensagem Maliciosa Específica

- **URL:** `/suspicious_messages/{id}`
- **Método:** `DELETE`
- **Descrição:** Apaga uma mensagem maliciosa específica.

#### Análise de Mensagens

#### Para analisar se uma mensagem recebida é maliciosa:

1. Verificar se o remetente está na lista de contatos maliciosos.
2. Se não estiver, verificar se a mensagem corresponde ou é similar a alguma mensagem maliciosa salva.
3. Se não corresponder, verificar se a mensagem contém alguma das palavras-chave de golpes.

- **URL:** `/suspicious_messages/catch`
- **Método:** `POST`
- **Descrição:** Analisa se uma mensagem é maliciosa.
- **Corpo da Requisição:**
  ```json
  {
    "message": "Conteúdo da Mensagem",
    "phone_number": "558588888888"
  }
  ```
