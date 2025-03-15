-- Criar políticas para o bucket bucketdolacia
begin;
  -- Permitir inserção para usuários autenticados
  create policy "Usuários autenticados podem fazer upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'bucketdolacia');

  -- Permitir leitura para usuários autenticados
  create policy "Usuários autenticados podem visualizar"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'bucketdolacia');

  -- Permitir atualização apenas para donos dos arquivos
  create policy "Usuários podem atualizar seus próprios arquivos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'bucketdolacia' AND owner = auth.uid())
  with check (bucket_id = 'bucketdolacia');

  -- Permitir deleção apenas para donos dos arquivos
  create policy "Usuários podem deletar seus próprios arquivos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'bucketdolacia' AND owner = auth.uid());
commit;
