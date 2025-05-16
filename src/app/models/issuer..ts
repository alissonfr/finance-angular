
export enum InstitutionType {
  BANK_ACCOUNT = "BANK_ACCOUNT",
  CREDIT_CARD = "CREDIT_CARD",
}

export class Issuer {
    issuerId: number;
    name: string;
    logoUrl: string;
    keyWord: string;
    popularity: number;
    color: string;
    institutionType: InstitutionType[];
}
