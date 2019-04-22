/**
 * @typedef InputConfiguration
 * @type {object}
 * @property {"text"|"enum"|"numeric"} type - The input type
 * @property {() => EnumOption[]} getEnumValues - Required for enum types
 */

/**
 * Base class for filter configurations. This API is all that the FilterBar
 * component should depend on.
 */
export class FilterConfiguration {
  /**
   * @type {string} - The option text to display for this configuration
   */
  displayName;

  /**
   * @type {InputConfiguration} - Input configuration options for this
   *  configuration
   */
  inputConfiguration;

  constructor() {
    if (this.constructor === FilterConfiguration) {
      throw new Error("Cannot construct virtual class: FilterConfiguration");
    }
  }
}
