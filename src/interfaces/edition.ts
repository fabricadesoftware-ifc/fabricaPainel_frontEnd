export interface IEdition {
  id?: string;
  year: number;
  theme: string;
  edition_name: string;

  // Datas relacionadas ao evento
  event_date?: string | null;
  final_event_date?: string | null;

  // Submissões
  initial_submission_date?: string | null;
  final_submission_date?: string | null;
  initial_second_submission_date?: string | null;
  final_second_submission_date?: string | null;

  // Aceitação de orientadores
  initial_advisor_acceptance?: string | null;
  final_advisor_acceptance?: string | null;
  initial_second_advisor_date?: string | null;
  final_second_advisor_date?: string | null;

  // Avaliadores
  initial_evaluators_date?: string | null;
  final_evaluators_date?: string | null;

  // Regras de quantidade
  members_min: number;
  members_max: number;
  collaborators_min: number;
  collaborators_max: number;
  subjects_min: number;
  subjects_max: number;
  evaluators_count: number;
  works_per_evaluator_max: number;
  works_per_collaborator_max: number;
  works_per_advisor_max: number;
  words_per_work_max: number;

  workload: number;

  // Mídia
  banner: { file: string } | null;
  logo: { file: string } | null;

  is_open: boolean;
}
