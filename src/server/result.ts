export type Failure<E = unknown> = {
  _tag: "Failure";
  error: E;
};

export type Success<T = void> = {
  _tag: "Success";
  data: T;
};

export type Result<T = void, E = unknown> = Failure<E> | Success<T>;

export function ok<T = void>(data: T): Success<T> {
  return {
    _tag: "Success",
    data: data,
  };
}

export function fail<E = unknown>(error: E): Failure<E> {
  return {
    _tag: "Failure",
    error: error,
  };
}

export function isSuccess<T = void, E = unknown>(
  result: Result<T, E>
): result is Success<T> {
  return result._tag === "Success";
}

export function isFailure<T = void, E = unknown>(
  result: Result<T, E>
): result is Failure<E> {
  return result._tag === "Failure";
}
