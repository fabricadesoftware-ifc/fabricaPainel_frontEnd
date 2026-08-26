// Prioridade: motivo real do backend > sem conexão > erro de servidor > fallback da chamada.
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
