interface StorageService {
  getItem(): string;
  setItem(key: string, value: string): void;
  hasItem(key: string): boolean;
}

export default StorageService;
