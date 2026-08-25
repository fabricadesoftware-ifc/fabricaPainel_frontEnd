// Prioridade: motivo real do backend > sem conexão > erro de servidor > fallback
// da própria chamada. Sem isso toda falha de rede/servidor virava a mesma frase
// genérica em inglês ("Failed to create work"), escondendo se o problema era do
// usuário (dado inválido) ou passageiro (rede/servidor, vale tentar de novo).
export function buildApiError(error: any, fallbackMessage: string): Error {
  const response = error?.response;
  const backendMessage = response?.data?.error || response?.data?.detail;

  let message: string;
  if (backendMessage) {
    message = backendMessage;
  } else if (!response) {
    message = "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
  } else if (response.status >= 500) {
    message = "Erro interno no servidor. Tente novamente em instantes; se persistir, avise a organização.";
  } else {
    message = `${fallbackMessage} Tente novamente em instantes.`;
  }

  const err = new Error(message);
  (err as any).status = response?.status;
  return err;
}
