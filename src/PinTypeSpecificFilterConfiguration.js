import { FilterConfiguration } from "./FilterConfiguration";
import { ManagerAwareFilterConfiguration } from "./ManagerAwareFilterConfiguration";
import { FilterBarManager } from "./FilterBarManager";
import { CategoryFilterConfiguration } from "./CategoryFilterConfiguration";

/**
 * @class A filter configuration that is dependent upon an associated pin type
 * filter configuration.
 */
export class PinTypeSpecificFilterConfiguration extends ManagerAwareFilterConfiguration {
  /**
   * @member {FilterConfiguration}
   * The filter configuration for the associated pin type filter. Required to
   * facilitate cascading filter change behavior.
   */
  pinTypeConfiguration;

  /**
   * @member {(manager, pinField: PinField | PinField[]) => {optionText: string, optionValue: any}[]}
   * Function that will be delegated to to fetch enum values.
   */
  getEnumValuesDelegate;

  /**
   * @member (enumValue) => PinTypeSpecificFilterValue
   * Used to convert enum values back into filter values.
   */
  enumValueToFilterValue;

  /**
   * 
   * @param {FilterBarManager} manager 
   * @param {CategoryFilterConfiguration} pinTypeConfiguration - The associated pin type
   *  filter configuration for this filter. Must implement the getCurrentPinTypeId
   *  method.
   * @param {Object} config
   */
  constructor(
    manager,
    pinTypeConfiguration,
    {
      displayName,
      chipName,
      pinFieldName,
      inputType,
      getEnumValues,
      enumValueToFilterValue,
      building
    }
  ) {
    if (!pinTypeConfiguration) {
      throw new Error(
        "A pin type filter configuration is required to instantiate dependent filters."
      );
    }
    super(manager);
    this.building = building;
    this.displayName = displayName;
    this.chipName = chipName;
    this.inputConfiguration = {
      type: inputType,
      getEnumValues: this.getEnumValues
    };
    this.pinFieldName = pinFieldName;
    this.pinTypeConfiguration = pinTypeConfiguration;

    this.enumValueToFilterValue = enumValueToFilterValue;
    this.getEnumValuesDelegate = getEnumValues;
  }

  onApply(value) {
    const isEnum = this.inputConfiguration.type === "enum";
    this.manager.addPinTypeSpecificFilter(
      this.pinField, // ?
      isEnum ? this.enumValueToFilterValue(value) : value
    );
  }

  getEnumValues(manager) {
    const pinTypeId = this.pinTypeConfiguration.getCurrentPinTypeId(manager);
    // if no pin type id filter applied already, get all pinFields for building,
    // filter and pass those in
    let pinField;
    if (pinTypeId) {
      const pinFields = PinFieldService.getAllForPinType(pinTypeId);
      pinField = pinFields.find(
        pinField => pinField.name === this.pinFieldName
      );
    } else {
      // TODO: should be grouped
      const pinTypes = PinTypeService.getAllForBuilding(this.building);
      const pinFields = PinFieldService.getAllForPinTypes(pinTypes);
      pinField = pinFields.filter(
        pinField => pinField.name === this.pinFieldName
      );
    }
    return this.getEnumValuesDelegate(manager, pinField);
  }

  onRemove() {}
}


var PinTypeService;
var PinFieldService;