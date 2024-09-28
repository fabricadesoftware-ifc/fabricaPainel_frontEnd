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
