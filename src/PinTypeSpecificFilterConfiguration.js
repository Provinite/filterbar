import { FilterConfiguration } from "./FilterConfiguration";

export class PinTypeSpecificFilterConfiguration extends FilterConfiguration {
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

  constructor(
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
    super();
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
      this.pinField,
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