import { Router } from 'vue-router';
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

export function confirmsActionFn(
  confirm: any,
  authStore: any,
  dateValidation: any,
  workStore: any,
  userCase: any,
  tokenExpired: any,
  router: any,
  close: any
): void {
  if (confirm === "Confirmar") {
    if (authStore.user.is_advisor && dateValidation.advisor_able_to_aprove_work) {
      userCase?.function?.(workStore.currentWork?.verification_token, workStore);
      close.aprove();
    } else if (!authStore.user.is_advisor && !tokenExpired) {
      userCase?.function?.(workStore.currentWork?.id, workStore, authStore.token);
      router.push("/panel/works");
    }
  } else if (confirm === "Rejeitar" && authStore.user.is_advisor && dateValidation.advisor_able_to_aprove_work) {
    userCase?.function_two?.(workStore.currentWork?.verification_token, workStore);
    close.aprove();
  }

  close.confirmation();
}