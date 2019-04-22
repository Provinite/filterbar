//@ts-check

/**
 * @typedef InputConfiguration
 * @type {object}
 * @property {string} type - The input type
 */

export class FilterConfiguration {
  /**
   * @type {string}
   */
  displayName;

  /**
   * @type {InputConfiguration}
   */
  inputConfiguration;

  constructor() {
    if (this.constructor === FilterConfiguration) {
      throw new Error("Cannot construct virtual class: FilterConfiguration");
    }
  }

  /**
   * @method getChip
   * @param {any} value - The value to get a chip for.
   * @returns {{left: string, right: string}} The chip.
   */
  getChip(value) {
    throw new Error("Unimplemented method: getChip");
  }

  /**
   * @function onApply
   * Behavior when applying a filter.
   * @param {?} inputValue - The value to apply (from user input, or getInputValue).
   */
  onApply(inputValue) {
    throw new Error("Unimplemented method: onApply");
  }

  /**
   * @function onRemove
   * Behavior when removing a filter.
   */
  onRemove() {
    throw new Error("Unimplemented method: onRemove");
  }
}