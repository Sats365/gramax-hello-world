import { Plugin } from "./Plugin/index";

class HelloWorldPlugin extends Plugin {
  get name() {
    return "HelloWorld";
  }

  onLoad(): void | Promise<void> {
    this._addCommand({
      do() {
        console.log("Hello World!");
      },
    });
  }
}

export default HelloWorldPlugin;
