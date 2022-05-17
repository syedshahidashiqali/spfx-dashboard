export interface Ilist {
  Id: string;
  title: string;
  [inedx: string]: any;
}

export interface IListCollection {
  value: Ilist[];
}
