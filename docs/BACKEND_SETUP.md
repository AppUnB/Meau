# Setup de Backend (Firebase) — do zero

Este projeto já usa Firebase como backend. Sem Firebase configurado, a aplicação web pode ficar em tela branca com erro de configuração.

## Modo Stub (teste rápido sem backend real)

Se quiser validar UI/navegação primeiro, você pode ativar um backend fake local:

A. No `.env`, adicione:

```env
EXPO_PUBLIC_USE_STUB_BACKEND=true
```

B. Reinicie o Expo (`npm run web`).

Nesse modo:

- login/cadastro funcionam com mock local
- lista de animais usa dados de demonstração
- upload retorna URI local da imagem
- detalhes/chat/persistência real continuam dependentes de Firebase

Quando quiser backend real, volte para:

```env
EXPO_PUBLIC_USE_STUB_BACKEND=false
```

## 1) Pré-requisitos

- Conta Google
- Projeto no Firebase
- Node.js e npm instalados

## 2) Criar projeto no Firebase

1. Acesse o Firebase Console.
2. Clique em **Add project**.
3. Escolha um nome (ex.: `meau-dev`).
4. Pode desativar Google Analytics no início (opcional).

## 3) Ativar Authentication (Email/Senha)

1. No menu do Firebase, abra **Authentication**.
2. Clique em **Get started**.
3. Em **Sign-in method**, ative **Email/Password**.

## 4) Criar Firestore Database

1. Abra **Firestore Database**.
2. Clique em **Create database**.
3. Escolha modo **Production** (recomendado) ou **Test** (apenas para desenvolvimento rápido).
4. Selecione a região mais próxima dos usuários.

## 5) Ativar Storage

1. Abra **Storage**.
2. Clique em **Get started**.
3. Escolha a mesma região do Firestore, se possível.

## 6) Registrar app Web e copiar credenciais

1. Em **Project settings** > seção **Your apps**.
2. Clique no ícone **Web** (`</>`).
3. Registre o app.
4. Copie os valores de configuração Firebase.

Você vai preencher estes campos no `.env`:

- `EXPO_PUBLIC_API_KEY`
- `EXPO_PUBLIC_AUTH_DOMAIN`
- `EXPO_PUBLIC_PROJECT_ID`
- `EXPO_PUBLIC_STORAGE_BUCKET`
- `EXPO_PUBLIC_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_APP_ID`

## 7) Preencher variáveis de ambiente

No arquivo `.env` da raiz do projeto, preencha os valores reais:

```env
EXPO_PUBLIC_API_KEY=...
EXPO_PUBLIC_AUTH_DOMAIN=...
EXPO_PUBLIC_PROJECT_ID=...
EXPO_PUBLIC_STORAGE_BUCKET=...
EXPO_PUBLIC_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_APP_ID=...
```

> O projeto também aceita `REACT_APP_FIREBASE_CONFIG` (legado), mas prefira `EXPO_PUBLIC_*`.

## 8) Regras mínimas para funcionar com o app

Este app usa as coleções:

- `users`
- `animais`
- `chatRooms`
- `chatRooms/{chatId}/messages`

### Firestore rules (base para dev)

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }

    match /users/{userId} {
      allow read: if isSignedIn();
      allow create, update: if isSignedIn() && request.auth.uid == userId;
      allow delete: if false;
    }

    match /animais/{animalId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }

    match /chatRooms/{chatId} {
      allow read, create, update, delete: if isSignedIn();

      match /messages/{messageId} {
        allow read, create: if isSignedIn();
        allow update, delete: if isSignedIn();
      }
    }
  }
}
```

> Observação: essas regras são permissivas para desenvolvimento. Em produção, o ideal é restringir por dono/interessado usando validações por referência e UID.

### Storage rules (base para dev)

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 9) Subir o app

1. Reinicie o servidor Expo após alterar `.env`.
2. Rode `npm run web`.
3. Acesse `http://localhost:8081`.

## 10) Checklist rápido de validação

- [ ] Consigo abrir a tela de login sem erro de Firebase no console
- [ ] Consigo criar usuário (email/senha)
- [ ] O documento do usuário é criado em `users/{uid}`
- [ ] Consigo cadastrar pet em `animais`
- [ ] Consigo abrir/mandar mensagem em chat

## 11) Próximos passos (recomendado)

- Endurecer regras de segurança do Firestore e Storage
- Criar ambientes separados (`dev` / `prod`) com `.env` distinto
- Mover IDs fixos sensíveis (como `projectId` de notificações) para variável de ambiente

## 12) Arquitetura de desacoplamento (stub x firebase)

O app agora usa uma camada de adapter para backend:

- `src/backend/client.js` → escolhe implementação ativa
- `src/backend/stubClient.js` → mock local (modo demo)
- `src/backend/firebaseClient.js` → backend real Firebase

Serviços de domínio (`auth`, `animalService`, `imageUpload.service`) consomem apenas `backendClient`, o que reduz acoplamento da UI com Firebase.

### Como transitar para Firebase real

1. Defina `EXPO_PUBLIC_USE_STUB_BACKEND=false`
2. Preencha `EXPO_PUBLIC_*` no `.env`
3. Reinicie o Expo

A UI e os serviços permanecem os mesmos; apenas a implementação do adapter muda.
