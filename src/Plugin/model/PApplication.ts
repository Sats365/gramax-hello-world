export enum ItemType {
  article = "article",
  category = "category",
}

export enum FileStatus {
  modified = "modified",
  delete = "delete",
  new = "new",
  rename = "rename",
  conflict = "conflict",

  /**
   * ~ no changes
   **/
  current = "current",
}

export interface PPath {
  extension: string;

  get value(): string;
  get name(): string;
  get rootDirectory(): PPath;
  get allExtensions(): string[];
  get stripExtension(): string;
  get nameWithExtension(): string;
  get removeExtraSymbols(): PPath;
  get parentDirectoryPath(): PPath;
  get stripDotsAndExtension(): string;

  compare(path: PPath): boolean;
  endsWith(path: PPath): boolean;
  includes(path: PPath): boolean;
  startsWith(path: PPath): boolean;

  join(...paths: PPath[]): PPath;
  concat(...path: PPath[]): PPath;
  subDirectory(path: PPath): PPath;
  getRelativePath(path: PPath): PPath;
  getNewName(newFileName: string): PPath;
}

export interface PItemRef {
  path: PPath;
}

export interface PItem {
  ref: PItemRef;
  type: ItemType;
  parent: PCategory;
  getProp<T>(propName: string): T;
}

export interface PArticle extends PItem {
  content: string;
}
export interface PCategory extends PArticle {
  items: PItem[];
}

export interface PCatalogEntry {
  load(): Promise<PCatalog>;
  getPathname(item?: PItem): Promise<string>;
}
export interface PCatalog extends PCatalogEntry {
  getItems(): PItem[];
  getName(): string;
  getContentItems(): PItem[];
  findArticleByItemRef(itemRef: PItemRef): PArticle;
}

export interface PChangeCatalog {
  catalog: PCatalog;
  itemRef: PItemRef;
  type: FileStatus;
}
export interface PCacheProvider {
  get(key: string): Promise<string>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  set(key: string, value: string): Promise<void>;
}

export interface PLibrary {
  getCatalog(name: string): Promise<PCatalog>;
  getCatalogEntry(name: string): PCatalogEntry;
  getCatalogEntries(): Map<string, PCatalogEntry>;
  addOnChangeRule(
    callback: (catalogChanges: PChangeCatalog[]) => void | Promise<void>
  ): void;
}

export interface PApplication {
  lib: PLibrary;
  cacheProvider: PCacheProvider;
}
