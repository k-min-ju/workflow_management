import React from 'react';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type UseState<T> = [T, SetState<T>];

export type UseRef<T> = React.RefObject<T>;
