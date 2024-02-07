export enum ArticleType {
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

interface ArticleProps {
	title: string;
	tags: string[];
}

export interface PArticle {
	id: string;
	type: ArticleType.article;
	parent: PCategory;
	content: string;
	getProp<T extends keyof ArticleProps>(propName: T): ArticleProps[T];
}

export interface PCategory extends Omit<PArticle, "type"> {
	articles: PArticle[];
	type: ArticleType.category;
}

export interface PCatalog {
	getName(): string;
	getArticles(): PArticle[];
	getArticleById(id: string): PArticle;
}

export interface PChangeCatalog {
	articleId: string;
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
