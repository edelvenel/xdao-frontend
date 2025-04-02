type IObjectWithID<T> = {
  id: T;
} & object;

export const objectIdMatcher = <T>(a: IObjectWithID<T>, b: IObjectWithID<T>) =>
  a.id === b.id;

type IObjectWithSymbol<T> = {
  symbol: T;
} & object;

export const objectSymbolMatcher = <T>(
  a: IObjectWithSymbol<T>,
  b: IObjectWithSymbol<T>
) => a.symbol === b.symbol;
