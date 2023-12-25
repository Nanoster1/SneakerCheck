import Fuse, { IFuseOptions } from 'fuse.js'

export function searchMatching<T>(
  array: T[],
  getText: (item: T) => string,
  searchInput: string,
  options?: IFuseOptions<string>
) {
  if (!Array.isArray(array)) return [] as T[]
  const textArray = array.map(getText)
  const fuse = new Fuse(textArray, options)
  const result = fuse.search(searchInput)
  const resultIndexes = result.map((i) => i.refIndex)
  return resultIndexes.map((idx) => array[idx])
}
