//@ts-check
import { FilterBarManager } from "./FilterBarManager";
import { ManagerAwareFilterConfiguration } from "./ManagerAwareFilterConfiguration";

export class SimpleModelFieldFilterConfiguration extends ManagerAwareFilterConfiguration {

  /**
   * Create a new simple model field filter configuration. This configuration is
   * appropriate for handling filters like task.subject and asset.name.
   * @param {FilterBarManager} manager - The filter bar manager that owns this configuration.
   * @param {object} config
   * @param {string} config.displayName - The display name for this filter
   * @param {string} config.queryField - The model field to filter on
   * @param {string} config.chipName - The name of this field to use on the chip.
   * @param {"text"|"numeric"|"enum"} config.inputType - The input type to use
   * @param {() => {optionText: string, optionValue: any}[]} [config.getEnumValues] -
   *  Callback to get enum values.
   * @param {(value) => ?} [config.enumValueToFilterValue] - Callback used to convert enum values returned from getEnumValues into the value to be filtered on.
   * @param {(value) => ?} [config.filterValueToEnumValue] - Callback used to convert a filtered value back into an enum value.
   * @param {(value) => ?} [config.enumValueToChipText] - Callback used to convert an enum value to chip text.
   */
  constructor(manager,
    {
    displayName,
    queryField,
    chipName,
    inputType,
    getEnumValues,
    enumValueToFilterValue,
    filterValueToEnumValue,
    enumValueToChipText,
  }) {
    super(manager);
    this.displayName = displayName;
    this.queryField = queryField;
    this.chipName = chipName;
    if (getEnumValues) {
      this.getEnumValues = getEnumValues;
    }
    if (enumValueToFilterValue) this.enumValueToFilterValue = enumValueToFilterValue;
    if (filterValueToEnumValue) this.filterValueToEnumValue = enumValueToFilterValue;
    if (enumValueToChipText) this.enumValueToChipText = enumValueToChipText;
    this.inputConfiguration = {
      type: inputType,
      getEnumValues: this.getEnumValues.bind(this)
    };
  }

  // FilterConfiguration overrides
  getChip(value) {
    return { left: this.chipName, right: this.isEnum ? this.enumValueToChipText(value) : value };
  }

  onApply(value) {
    this.manager.addModelFieldFilter(this.queryField, this.isEnum ? this.enumValueToFilterValue(value) : value);
  }

  onRemove() {
    this.manager.removeModelFieldFilter(this.queryField);
  }

  // ManagerAwareFilterConfiguration overrides
  /**
   * Used to initialize this filter when the filter bar manager initializes.
   * @return {any} An appropriate input value for this filter configuration.
   */
  getInputValue() {
    const filterValue = this.manager.getModelFieldFilter(this.queryField);
    return this.isEnum ? this.filterValueToEnumValue(filterValue) : filterValue;
  }

  // Special enum logic
  /**
   * Convert a filter value applied by onApply to the associated enum value.
   * @param {*} filterValue 
   */
  filterValueToEnumValue(filterValue) {
    return filterValue;
  }

  /**
   * Convert an enum value returned from getEnumValues into a filter value (string).
   * @param {*} enumValue
   * @return {string} The enum value's query representation 
   */
  enumValueToFilterValue(enumValue) {
    return enumValue;
  }

  /**
   * Convert an enum value returned from getEnumValues into chip text (string).
   * @param {*} enumValue 
   * @return {string} The enum value's chip representation
   */
  enumValueToChipText(enumValue) {
    return enumValue;
  }

  getEnumValues() {
    throw new Error("getEnumValues must be implemented or provided in constructor.");
  }

  /**
   * Flag indicating this filter configuration is for an enum field.
   * @type boolean
   */
  get isEnum() {
    return this.inputConfiguration.type === "enum";
  }
}
