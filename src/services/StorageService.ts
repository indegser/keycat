class StorageService {
  static get(key: string) {
    return sessionStorage.getItem(key);
  }

  static put(key: string, value: string) {
    sessionStorage.setItem(key, value);
    return true;
  }
}

export default StorageService