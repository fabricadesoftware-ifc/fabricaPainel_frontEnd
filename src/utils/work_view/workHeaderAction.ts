import { resolveUserFunction } from '@/utils/works';


export function handleWorkHeaderActionFn(
  workStore: any,
  authStore: any,
  updateStatus: any,
  toggle: any
): void {
  //@ts-ignore
  const userFunction = resolveUserFunction(workStore?.currentWork, authStore.user);

  if ([1, 2, 3].includes(updateStatus) && userFunction === 'STUDENT') {
    toggle.confirmation();
  } else if (updateStatus === 2 && userFunction !== 'EVALUATOR') {
    toggle.confirmation();
  } else if (userFunction === 'EVALUATOR') {
    toggle.workGrade();
  } else {
    toggle.aprove();
  }
}

export async function confirmsActionFn(
  confirm: any,
  authStore: any,
  dateValidation: any,
  workStore: any,
  userCase: any,
  tokenExpired: any,
  router: any,
  close: any
): Promise<void> {
  // Só fecha/navega depois de confirmar sucesso, senão uma falha parecia ter funcionado.
  try {
    if (confirm === "Confirmar") {
      if (authStore.user.is_advisor && dateValidation.advisor_able_to_aprove_work) {
        await userCase?.function?.(workStore.currentWork?.verification_token, workStore);
        close.aprove();
      } else if (!authStore.user.is_advisor && !tokenExpired) {
        await userCase?.function?.(workStore.currentWork?.id, workStore, authStore.token);
        router.push("/panel/works");
      }
    } else if (confirm === "Rejeitar" && authStore.user.is_advisor && dateValidation.advisor_able_to_aprove_work) {
      await userCase?.function_two?.(workStore.currentWork?.verification_token, workStore);
      close.aprove();
    }
  } catch (error) {
    console.error("Erro ao confirmar ação do trabalho:", error);
  }

  close.confirmation();
}