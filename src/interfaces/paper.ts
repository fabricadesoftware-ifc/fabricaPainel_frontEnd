export interface IPaper {
    id: string;
    name: string;
    area: string;
    teamRep: string;
    crossCuttingThemes: string;
    ods: string;
    status: string;
    abstract: string;
    aproved?: boolean;
    aprovedBy?: string;
    aprovedDate?: string;
}
