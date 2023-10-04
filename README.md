# Mexagex <img src="https://github.com/thbiell/App-de-Mensagens/blob/main/src/assets/logoW.png" width="100">

App React-Native CLI android, chat app, usando Realtime database e storage do Firebase.

<img src="https://github.com/thbiell/App-de-Mensagens/blob/main/src/assets/logo.png" width="600">

## Documentação do Projeto

### Introdução

- Mexagex é um app de troca de mensagens em tempo real, crie uma conta, adicione seus amigos e comece a conversar.

- Este projeto tinha como objetivo um app de mensagens em tempo real, além de mensagens, você pode enviar imagens.

- Tecnologias usadas: React Native, Firebase.

### Configuração

- Firebase
  - Crie uma conta no Firebase. Se você não souber como fazer isso, siga o passo a passo no próprio site.
  - Crie um projeto e adicione um aplicativo Android.
  - Depois de criado, adicione o arquivo JSON em `android/app/src`.

### Instalação

Rode o comando no terminal dentro da pasta raiz do projeto Mexagex:

```bash
$ npm install
# ou
$ npm clean install
```


### Funcionalidades Principais
1. Chat em Tempo Real
O aplicativo oferece uma funcionalidade de chat em tempo real que permite aos usuários trocar mensagens instantâneas com outros usuários. Esta funcionalidade inclui:

Envio de Mensagens de Texto: Os usuários podem digitar e enviar mensagens de texto para outros participantes da conversa.
Envio de Imagens: Os usuários podem selecionar imagens da galeria do dispositivo e enviá-las como mensagens.
Como Utilizar:

Abra a conversa desejada.
Digite sua mensagem no campo de texto na parte inferior da tela e toque em "Enviar" para enviar mensagens de texto.
Para enviar uma imagem, toque no ícone da câmera na parte inferior da tela, selecione uma imagem da galeria e toque em "Enviar".
2. Autenticação de Usuário
O aplicativo possui um sistema de autenticação de usuário que permite que os usuários acessem suas contas de forma segura. Esta funcionalidade inclui:

Registro de Conta: Novos usuários podem criar uma conta fornecendo informações básicas, como nome de usuário e senha.
Login de Usuário: Usuários registrados podem fazer login em suas contas usando seu nome de usuário e senha.
Como Utilizar:

Na tela inicial, toque em "Registrar" para criar uma nova conta ou em "Login" para acessar uma conta existente.
Siga as instruções na tela para fornecer as informações necessárias, como nome de usuário e senha.
3. Troca de Mensagens Offline
Os usuários podem trocar mensagens mesmo quando estão offline. As mensagens offline serão enviadas assim que o dispositivo recuperar a conexão com a internet.

Como Utilizar:

Escreva e envie mensagens normalmente quando estiver online. As mensagens serão armazenadas localmente no dispositivo.
As mensagens offline serão entregues automaticamente assim que o dispositivo estiver novamente online.
4. Gerenciamento de Perfil de Usuário
Os usuários podem personalizar seus perfis com informações pessoais, incluindo imagens de perfil e nomes de exibição.

Como Utilizar:

Toque na sua imagem de perfil ou nome na parte superior da tela.
Faça as alterações desejadas no seu perfil, como adicionar ou alterar sua imagem de perfil e nome de exibição.
5. Lista de Conversas
O aplicativo exibe uma lista de todas as conversas ativas dos usuários, permitindo que eles alternem facilmente entre diferentes chats.

Como Utilizar:

Na tela inicial, a lista de conversas ativas será exibida.
Toque em uma conversa na lista para abri-la e visualizar o histórico de mensagens.



### Fluxo de Dados

#### Autenticação
O Mexagex gerencia o fluxo de dados por meio de autenticação segura. O processo de autenticação envolve o seguinte fluxo:

Registro de Conta: Os novos usuários podem criar uma conta fornecendo informações básicas, como nome de usuário e senha.

Login de Usuário: Os usuários registrados podem fazer login em suas contas usando seu nome de usuário e senha.

Chat
O Mexagex permite a troca de mensagens em tempo real entre os usuários. O fluxo de dados no chat inclui:

Envio de Mensagens de Texto: Os usuários podem digitar mensagens de texto e enviá-las para outros participantes da conversa.

Envio de Imagens: Os usuários podem selecionar imagens da galeria de seus dispositivos e enviá-las como mensagens no chat.

Mensagens Offline: O aplicativo permite que os usuários troquem mensagens mesmo quando estão offline. As mensagens offline são armazenadas localmente no dispositivo e enviadas automaticamente assim que o dispositivo se reconecta à internet.

##### Tem como mudar o tema automáticamente

Basta você mudar de tema claro/escuro nas configurações do seu dispositivo.

#### Autenticação
Como funciona o processo de autenticação
O processo de autenticação no Mexagex segue um fluxo simples:

O usuário inicia o aplicativo e é apresentado com a tela de login ou registro.

Para registrar uma nova conta, o usuário fornece um nome de usuário e uma senha. Para fazer login, o usuário insere seu nome de usuário e senha previamente registrados.

O aplicativo verifica as credenciais do usuário com o Firebase Authentication para garantir a autenticidade.

Se as credenciais forem válidas, o usuário é autenticado e tem acesso às funcionalidades do aplicativo.

#### Fluxo de registro e login
##### Registro de Conta:

O usuário toca na opção "Registrar" na tela de início.
O usuário fornece um nome de usuário e senha.
O aplicativo envia as informações de registro para o Firebase Authentication.
O Firebase Authentication cria uma nova conta para o usuário.
O usuário é redirecionado para a tela principal do aplicativo e pode começar a usar as funcionalidades.
##### Login de Usuário:

O usuário toca na opção "Login" na tela de início.
O usuário insere seu nome de usuário e senha.
O aplicativo verifica as credenciais com o Firebase Authentication.
Se as credenciais forem válidas, o usuário é autenticado e redirecionado para a tela principal.

##### Chat
Como as mensagens são enviadas e recebidas
O Mexagex permite que os usuários enviem e recebam mensagens em tempo real. O fluxo de envio e recebimento de mensagens funciona da seguinte forma:

O usuário inicia uma conversa com outro usuário selecionando-o na lista de amigos ou contatos.

O usuário digita uma mensagem no campo de texto e toca em "Enviar".

A mensagem é enviada para o Firebase Realtime Database, onde é armazenada em um local específico da conversa.

O Firebase Realtime Database envia automaticamente a mensagem para o destinatário.

O destinatário recebe a mensagem em tempo real e ela é exibida na conversa.

Uso de imagens no chat
Os usuários do Mexagex podem compartilhar imagens no chat:

Para enviar uma imagem, o usuário toca no ícone da câmera na interface do chat.

Isso abre a galeria de imagens do dispositivo, e o usuário pode selecionar uma imagem para enviar.

A imagem é carregada para o Firebase Storage, e o URL da imagem é armazenado no Firebase Realtime Database.

O destinatário recebe o URL da imagem e pode visualizá-la na conversa.

Armazenamento em Nuvem
Como os dados e arquivos são armazenados no Firebase Storage
O Mexagex utiliza o Firebase Storage para armazenar imagens e arquivos compartilhados no chat. O armazenamento em nuvem funciona da seguinte forma:

Quando um usuário envia uma imagem, o arquivo é carregado para o Firebase Storage com uma referência única.

O URL de download é armazenado no Firebase Realtime Database junto com outras informações da mensagem.

Quando um usuário deseja visualizar uma imagem, o aplicativo faz o download do conteúdo usando o URL fornecido pelo Firebase Storage.

Banco de Dados em Tempo Real
Como os dados são estruturados no Firebase Realtime Database
O Firebase Realtime Database é usado pelo Mexagex para armazenar informações sobre usuários,


### Estilo e Design
#### O Mexagex apresenta um design limpo e amigável para os usuários, com foco na usabilidade e na experiência do usuário. Alguns dos aspectos de estilo e design incluem:

 - Interface de Usuário Intuitiva: O aplicativo possui uma interface de usuário intuitiva que permite aos usuários navegar facilmente por suas conversas, enviar mensagens e compartilhar mídia.

 - Paleta de Cores Agradável: O Mexagex utiliza uma paleta de cores agradável, incluindo tons de azul e branco para uma aparência moderna e atraente.

 - Imagens de Perfil Personalizáveis: Os usuários podem personalizar suas imagens de perfil para tornar seu perfil único e reconhecível.

 - Ícones e Elementos Visuais: O aplicativo utiliza ícones e elementos visuais para melhorar a usabilidade e tornar as ações do usuário mais claras.

### Estrutura do banco de dados

<img src="https://github.com/thbiell/ExemplobranchExercicio/assets/101123186/80c66967-8df5-4eb5-a01a-57101525ec48">

### ScreenShots

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/3b681ea2-255e-4bf9-b3a4-e0c58471f99f" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/f935a756-b070-4c86-9126-380c774a3e8e" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/53b4b84c-25aa-44c2-80e1-8730d6826608" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/a26b9d61-d61a-4992-ad1b-3f4473dd8d2d" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/8fd8851d-140d-4cbf-8ebf-50ac89c03da0" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/2a830ae0-0a7a-45bd-99e2-24802c475a9a" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/88374405-a9f6-4c33-b574-b8dac2239668" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/fad29212-274b-4c00-bec2-df7148b2c10d" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/9859a8d3-f480-499d-ba6f-381294de49c6" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/34c76928-ce66-46a6-992a-1b2bd513d49a" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/cc1b5a05-49d8-4c8d-84b2-f44a67a3b57a" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/80599c1a-2115-4184-bc89-9a68ec3604df" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/38a190b0-cf46-412d-a295-5c4855b7e440" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/18add231-a363-47bb-a767-c1d9be2ae908" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/6ebff206-c418-4dde-a805-b75f860b6b9e" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/563e524b-cc9c-4942-b37f-568994286fd2" width="300">

<img src="https://github.com/thbiell/App-de-Mensagens/assets/101123186/52c82f30-1388-459a-9a33-8e3aaac9394f" width="300">


### Algumas features futuras

 - Implementar grupos.
 - fazer upload de arquivos e áudios.

### Contato

 - email: thiago007gabriel@gmail.com

