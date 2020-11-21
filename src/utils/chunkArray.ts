const chunk = (arr: any[], chunkSize: number = 3000) =>
  Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) =>
    arr.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

export default chunk;
