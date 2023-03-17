export const DEFAULT_NAME = "_hw";

/**
 * Represents a model that is created in embedded script
 * as part of script initialization.
 */

/**
 * Loads widget instance.
 *
 * @param win Global window object which stores pre-loaded and post-loaded state of widget instance.
 * @param defaultConfig A configurations that are merged with user.
 * @param scriptElement The script tag that includes installation script and triggered loader.
 * @param render A method to be called once initialization done and DOM element for hosting widget is ready.
 */
export default (win, defaultConfig, scriptElement, render) => {
  // get a hold of script tag instance, which has an
  // attribute `id` with unique identifier of the widget instance
  const instanceName =
    scriptElement?.attributes.getNamedItem("id")?.value ?? DEFAULT_NAME;

  const loaderObject = win[instanceName];
  if (!loaderObject || !loaderObject.q) {
    throw new Error(
      `Widget didn't find LoaderObject for instance [${instanceName}]. ` +
        `The loading script was either modified, no call to 'init' method was done ` +
        `or there is conflicting object defined in \`window.${instanceName}\` .`
    );
  }

  // check that the widget is not loaded twice under the same name
  if (win[`loaded-${instanceName}`]) {
    throw new Error(
      `Widget with name [${instanceName}] was already loaded. ` +
        `This means you have multiple instances with same identifier (e.g. '${DEFAULT_NAME}')`
    );
  }

  // this will an root element of the widget instance
  let targetElement;

  // iterate over all methods that were called up until now
  for (let i = 0; i < loaderObject.q.length; i++) {
    const item = loaderObject.q[i];
    const methodName = item[0];
    if (i === 0 && methodName !== "init") {
      throw new Error(
        `Failed to start Widget [${instanceName}]. 'init' must be called before other methods.`
      );
    } else if (i !== 0 && methodName === "init") {
      continue;
    }

    switch (methodName) {
      case "init":
        const loadedObject = Object.assign(defaultConfig, item[1]);
        // the actual rendering of the widget
        const wrappingElement = document.getElementById(
          loadedObject.parentElementId
        );
        targetElement = wrappingElement.appendChild(
          win.document.createElement("div")
        );
        targetElement.setAttribute("id", `widget-${instanceName}`);
        render(targetElement, loadedObject);

        // store indication that widget instance was initialized
        win[`loaded-${instanceName}`] = true;

        break;
      // TODO: here you can handle additional async interactions
      // with the widget from page (e.q. `_hw('refreshStats')`)
      default:
        console.warn(`Unsupported method [${methodName}]`, item[1]);
    }
  }
};
