// Views próprias devolvem {"error": "..."} ou {"detail": "..."}; serializers do DRF
// (ex.: ValidationError dentro de um validate()) devolvem {"non_field_errors": [...]}
// ou {"campo": [...]} — sem isso a mensagem real (ex.: "time deve ter no mínimo 3
// membros") nunca aparecia, só o fallback genérico.
function extractBackendMessage(data: any): string | undefined {
  if (!data) return undefined;
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.non_field_errors) && data.non_field_errors.length) {
    return data.non_field_errors[0];
  }
  if (Array.isArray(data) && data.length && typeof data[0] === "string") {
    return data[0];
  }
  if (typeof data === "object") {
    const firstField = Object.values(data).find(
      (v) => Array.isArray(v) && v.length && typeof v[0] === "string"
    ) as string[] | undefined;
    if (firstField) return firstField[0];
  }
  return undefined;
}

// Prioridade: motivo real do backend > sem conexão > erro de servidor > fallback da chamada.
export function buildApiError(error: any, fallbackMessage: string): Error {
  const response = error?.response;
  const backendMessage = extractBackendMessage(response?.data);

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
