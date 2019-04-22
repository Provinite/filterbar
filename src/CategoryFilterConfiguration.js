import { SimpleModelFieldFilterConfiguration } from "./SimpleModelFieldFilterConfiguration";

export class CategoryFilterConfiguration extends SimpleModelFieldFilterConfiguration {
  constructor(manager, building) {
    super(manager, {
      displayName: "Category",
      queryField: "pin_type",
      chipName: "Category",
      inputType: "enum"
    });
    this.building = building;
  }

  enumValueToChipText(pinType) {
    return pinType.name;
  }

  enumValueToFilterValue(pinType) {
    return pinType._id;
  }

  filterValueToEnumValue(pinTypeId) {
    // fetch pinType from id. . .
    return pinTypeId;
  }

  getInputValue() {
    const filterValue = this.getCurrentPinTypeId();
    // fetch the pin_type from the id. . .
    return this.filterValueToEnumValue(filterValue);
  }

  onApply(value) {
    super.onApply(value);
    this.currentPinType = value;
  }

  setDependentConfigurations(filterConfigurations) {
    this.dependentConfigurations = filterConfigurations;
  }

  onRemove() {
    super.onRemove();
    for (const filter of this.dependentConfigurations) {
      this.manager.clearFilter(filter);
    }
  }

  /**
   * @type {() => {optionText: string, optionValue: any}[]}
   */
  getEnumValues() {
    // query for pin_types, return an array of `{optionText: pinType.name, optionValue: pinType}`
    return null;
  }

  getCurrentPinTypeId() {
    return this.manager.getModelFieldFilter(this.queryField);
  }
}
