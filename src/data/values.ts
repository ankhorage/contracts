export type DataContractValue =
  | string
  | number
  | boolean
  | null
  | readonly DataContractValue[]
  | {
      readonly [key: string]: DataContractValue;
    };

export type DataPath = string;
