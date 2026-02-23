---
description: Otimizar e adicionar imagens de capa para o blog
---

Este workflow descreve como processar as imagens de capa enviadas pelo usuário e integrá-las aos artigos do blog.

### Passos:

1. **Receber Imagens**:
   - Peça ao usuário para colocar as imagens originais na pasta `blog-imagens-input`.

// turbo
2. **Otimizar para WebP**:
   - Execute o comando para converter e otimizar as imagens:
   ```bash
   npm run optimize-images
   ```
   - As imagens processadas estarão agora em `public/assets/blog/` no formato `.webp`.

3. **Atualizar Artigo**:
   - Localize o arquivo markdown do artigo em `src/content/blog/`.
   - Altere o campo `heroImage` no frontmatter para apontar para a nova imagem:
   ```markdown
   heroImage: "/assets/blog/nome-da-imagem.webp"
   ```

4. **Verificar**:
   - Verifique se a imagem está sendo renderizada corretamente no blog localmente.

5. **Limpeza**:
   - Opcionalmente, limpe a pasta `blog-imagens-input` se o script já não o fizer.
