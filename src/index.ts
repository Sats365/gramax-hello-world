import { PApplication, Plugin } from "./Plugin/index";

class HelloWorldPlugin extends Plugin {
	get name() {
		return "HelloWorld";
	}

	constructor(app: PApplication) {
		super(app);
	}

	onLoad(): void | Promise<void> {
		this._addCommand<string, number>({
			name: "index",
			do: async (props) => {
				console.log("Props: ", props);
				console.log("Hello, world!");
				return 10;
			},
		});
	}
}

export default HelloWorldPlugin;
