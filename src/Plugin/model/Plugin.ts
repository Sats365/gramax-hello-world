import { PApplication } from "./PApplication";

export interface PCommandConfig<P, O> {
	name: string
	do: (this: { _app: PApplication }, args: P) => O | Promise<O>;
}

export abstract class Plugin {
	private _commandConfigs: PCommandConfig<any, any>[];

	constructor(protected _app: PApplication) {
		this._commandConfigs = [];
	}

	abstract name: string;

	onLoad?(): Promise<void> | void;

	get commandConfigs(): PCommandConfig<any, any>[] {
		return this._commandConfigs;
	}

	protected _addCommand<P, O>(command: PCommandConfig<P, O>) {
		this._commandConfigs.push(command);
	}
}
