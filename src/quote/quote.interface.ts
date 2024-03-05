export interface Quote {
  source: string;
  price: number;
}

export interface Payload {
  source: string;
  inputAsset: string;
  outputAsset: string;
  inputAmount: string;
}
