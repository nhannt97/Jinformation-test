/* eslint-disable no-undef */
const moduleReducer = require.context('.', true, /reducer.tsx/);

const reducers: any = {};
const sagas: any[] = [];
moduleReducer.keys().forEach((file) => {
  if (file === './reducer.tsx') return;
  const module = moduleReducer(file);
  if (module.reducer) {
    reducers[module.namespace] = module.reducer;
  }
  if (module.saga) {
    sagas.push(module.saga);
  }
});

export { reducers, sagas };
