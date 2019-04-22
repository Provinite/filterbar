//@ts-check
import { FilterBarManager } from "./FilterBarManager";
import { FilterConfiguration } from "./FilterConfiguration";

/**
 * Base class for filter configurations that are dependent upon the
 * FilterBarManager.
 */
export class ManagerAwareFilterConfiguration extends FilterConfiguration {
  /**
   * @type {FilterBarManager}
   */
  manager;

  /**
   *
   * @param {FilterBarManager} manager - The filter bar manager instance to use
   *  with this filter.
   */
  constructor(manager) {
    super();
    if (this.constructor === ManagerAwareFilterConfiguration) {
      throw new Error(
        "Cannot instantiate virtual class: ManagerAwareFilterConfiguration"
      );
    }
    this.manager = manager;
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

  /**
   * @method getInputValue
   * This function is relied upon to recreate an acceptable inputValue for this
   * configuration from the manager if it has a filter loaded for this configuration.
   * @return A valid inputValue for this configuration representing the filter
   *  value in the manager. If the manager has no filter registered for this
   *  configuration, undefined.
   */
  getInputValue() {
    throw new Error("Unimplemented method: getInputValue");
  }

  /**
   * @method getChip
   * @param {any} value - The value to get a chip for.
   * @returns {{left: string, right: string}} The chip.
   */
  getChip(value) {
    throw new Error("Unimplemented method: getChip");
  }
}
