import { ICrossCuttingTheme } from '@/interfaces/themes'
export interface IWork {
    id: string
    title: string
    abstract: string
    edition: number
    field: number[]
    evaluator: number[]
    cross_cutting_theme: number
    initial_submission_work_date: string
    final_submission_work_date: string
    verification_token: string
    team: number
    ods: number[]
    reject_submission_work_date: string
    status: number
}

export enum Status {
    Pendente = 1,
    Aprovado = 2,
    Pendente_Com_Alteracoes = 3,
}

export interface IField {
  id: string | number
  name?: string
}

export interface IAdvisor {
  id: string | number
  name?: string
  email?: string
}

export interface ITeamMember {
  id?: string | number
  name?: string
  email: string
}

export interface IWorkStorage {
  title: string
  abstract: string
  field: IField[]
  advisor: IAdvisor[]
  cross_cutting_theme: ICrossCuttingTheme
  team: ITeamMember[]
  co_advisor: IAdvisor[]
  integrated_project: boolean
}