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

interface ItemProps {
	title: string;
	tags: string[];
}

export interface PItem {
	id: string;
	type: ItemType;
	parent: PCategory;
	getProp<T extends keyof ItemProps>(propName: T): ItemProps[T];
}

export interface PArticle extends PItem {
	content: string;
	type: ItemType.article;
}
export interface PCategory extends Omit<PArticle, "type"> {
	items: PItem[];
	type: ItemType.category;
}

export interface PCatalog {
	getName(): string;
	getItems(): PItem[];
	getItemById(id: string): PItem;
}

export interface PChangeCatalog {
	itemId: string;
	catalog: PCatalog;
	type: FileStatus;
}

export interface PStorage {
	get(key: string): Promise<string>;
	set(key: string, value: string): Promise<void>;
	delete(key: string): Promise<void>;
	exists(key: string): Promise<boolean>;
}

export interface PCatalogs {
	get(name: string): Promise<PCatalog>;
	getAll(): Promise<PCatalog[]>;
	onUpdate(callback: (catalogChanges: PChangeCatalog[]) => void | Promise<void>): void;
}

export interface PApplication {
	catalogs: PCatalogs;
	storage: PStorage;
}
