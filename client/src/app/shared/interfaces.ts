export interface IUser {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ICategory {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface IMessage {
  message: string;
}

export interface IPosition {
  name: string;
  cost: number;
  user?: string;
  category: string;
  _id?: string;
  quantity?: number;
}

export interface IOrder {
  date?: Date;
  order?: number;
  user?: string;
  list?: IOrderPosition[];
  _id?: string;
}

export interface IOrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface IMaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface IMaterialDatepicker extends IMaterialInstance {
  date?: Date;
}
export interface IFilter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface IOverview {
  orders: IOverviewItem;
  profit: IOverviewItem;
}

export interface IOverviewItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}

export interface IAnalytics {
  average: number;
  chart: IAnalyticsChart[];
}

export interface IAnalyticsChart {
  profit: number;
  order: number;
  label: string;
}
