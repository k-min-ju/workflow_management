import * as ReactSpinners from 'react-spinners';
import React from 'react';

export type SpinnerTypeKeys = keyof typeof ReactSpinners;

export type SpinnerProps<T extends SpinnerTypeKeys> = {
  spinnerType: T;
} & React.ComponentProps<(typeof ReactSpinners)[T]>;
