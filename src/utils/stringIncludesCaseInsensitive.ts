const stringIncludesCaseInsensitive = (str: string, part: string): boolean => (
  str.toLocaleLowerCase().includes(part.toLocaleLowerCase())
);

export default stringIncludesCaseInsensitive;
