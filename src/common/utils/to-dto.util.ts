export const toDto = <T, E>(model: new (entity: E, options?: unknown) => T, entity: E, options?: unknown): T => {
  return new model(entity, options)
}
