export function ComputePagesCount(
  itemsCount: number,
  pageSize: number
): number {
  let np = Math.floor(itemsCount / pageSize);
  if (itemsCount % pageSize !== 0) {
    np = np + 1;
  }
  return np;
} //  ComputePagesCount
