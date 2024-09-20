export interface Stakeholder{
  id?: number,
  company: string,
  name: string,
  timestamp: string, 
  involvedTokens: number[];
  description: string,
  maker: string,
  active: boolean,
  hashIPFS: string,
}

export interface Pedigree {
  id?: number,
  pedigreeIdToken: number,
  quantity: number,
  timestamp: string,
  maker: string,
  hashIPFS: string,
}

export interface Process {
  id?: number,
  name: string,
  description: string,
  involvedtokens: number[];
  timestamp: string,
  maker: string,
  active: boolean,
  hashIPFS: string,
}

export interface Product {
  id?: number,
  name: string,
  description: string,
  timestamp: string,
  maker: string,
  hashIPFS: string,
}

export interface Token {
  id?: number,
  mutable: boolean,
  name: string,
  information: string,
  timestamp: string[],
  pedigreeToken: number[],
  processesToken: number[],
  stakeholdersToken: number[],
  owner: string,
  active: boolean,
  hashIPFS: string,
}