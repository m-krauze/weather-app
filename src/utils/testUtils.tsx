import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { AppStore } from "../store/store";
import { createStore } from "@/store/createStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = createStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
