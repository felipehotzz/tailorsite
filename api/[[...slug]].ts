import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

const SUPABASE_FUNCTION_URL = 'https://jymiciahmlsthaczrcbk.supabase.co/functions/v1/serve-landing-page';

export default async function handler(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const parts = hostname.split('.');
  
  if (parts.length < 2 || parts[0] === 'www' || hostname === 'tailor.site') {
    return new Response('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=https://tailor.new"></head></html>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  const subdomain = parts[0];
  
  try {
    const response = await fetch(`${SUPABASE_FUNCTION_URL}?subdomain=${subdomain}`);
    if (!response.ok) return new Response('Página não encontrada', { status: 404 });
    return new Response(await response.text(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (error) {
    return new Response('Erro ao carregar página', { status: 500 });
  }
}
