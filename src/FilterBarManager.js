//@ts-check
import { ManagerAwareFilterConfiguration } from "./ManagerAwareFilterConfiguration";

/**
 * @typedef Chip
 * @property {string} left
 * @property {string} right
 * @property {ManagerAwareFilterConfiguration} filterConfiguration
 */

export class FilterBarManager {
  /**
   * Simple key, value map for model field filters. Added to query as
   * ?key=value
   * @type {{[key: string]: string}}
   */
  modelFieldFilters = {};
  /**
   * Object mapping pin field ID's to values.
   * @type {{[pinFieldId: string]: any}}
   */
  pinTypeSpecificFilters = {};
  /**
   * Simple key, value map for cross-pin-type pinField filters.
   * @type {{[pinFieldName: string]: any}}
   */
  pinFieldFilters = {};
  /**
   * Array representing the current chips for the filter bar.
   * @type {Chip[]}
   */
  chips = [];
  /**
   * Array of filter configurations for this manager.
   * @type {ManagerAwareFilterConfiguration[]}
   */
  filterConfigurations = [];

  addFilterConfiguration(filterConfiguration) {
    this.filterConfigurations.push(filterConfiguration);
  }

  /**
   * Add a filter chip.
   * @param {object} chip - The chip to add
   * @param {string} chip.left - The left text for the chip
   * @param {string} chip.right - The right text for the chip
   * @param {ManagerAwareFilterConfiguration} filterConfiguration - The associated filter
   *  configuration
   */
  addChip(chip, filterConfiguration) {
    this.chips.push({ ...chip, filterConfiguration });
  }

  /**
   * Remove the chip for a provided filter configuration.
   * @param {ManagerAwareFilterConfiguration} filterConfiguration
   */
  removeChip(filterConfiguration) {
    const chips = this.chips.filter(
      chip => chip.filterConfiguration !== filterConfiguration
    );
    this.chips = chips;
  }

  /**
   * Apply a filter using the provided configuration and value. Adds the
   * associated chip as well.
   * @param {object} filterConfiguration - The filter configuration to use
   *  to apply this filter.
   * @param {*} value - The value to filter on
   */
  applyFilter(filterConfiguration, value) {
    filterConfiguration.onApply(value);
    const chip = filterConfiguration.getChip(value);
    this.addChip(chip, filterConfiguration);
  }

  /**
   * Clear the filter associated with a configuration.
   * @param {ManagerAwareFilterConfiguration} filterConfiguration
   */
  clearFilter(filterConfiguration) {
    filterConfiguration.onRemove();
    this.removeChip(filterConfiguration);
  }

  /**
   * Generate the query object for the currently applied filters.
   * @param {*} pinTypeId - The pintype ID to use for pin type specific queries
   *  (if any)
   */
  getQuery(pinTypeId) {
    // apply model field filters to the top level of the query
    const result = {
      ...this.modelFieldFilters,
      pin_fields: [],
      pin_type: { _id: pinTypeId }
    };

    // apply pinField filters to ?pin_fields=[. . .]
    if (Object.keys(this.pinFieldFilters).length === 0) {
      delete result.pin_fields;
    }
    for (const fieldName in this.pinFieldFilters) {
      result.pin_fields.push({
        name: fieldName,
        value: this.pinFieldFilters[fieldName]
      });
    }

    // apply pin type specific filters to
    // ?pin_type={_id: pinTypeId, values: [. . .]}
    if (Object.keys(this.pinTypeSpecificFilters).length === 0) {
      delete result.pin_type;
    }
    for (const pinFieldId in this.pinTypeSpecificFilters) {
      const filterItem = {
        _id: pinFieldId,
        ...this.pinTypeSpecificFilters[pinFieldId]
      };
      result.pin_type.values.push(filterItem);
    }
    return result;
  }

  /**
   * Load filters from a query.
   * @param {object} query - The query to load from.
   */
  loadFromQuery(query) {
    const { pin_fields, pin_type, ...modelFieldFilters } = query;
    this.modelFieldFilters = modelFieldFilters;
    this.pinFieldFilters = {};
    this.pinTypeSpecificFilters = {};
    if (pin_fields) {
      for (const pinFieldFilter of pin_fields) {
        this.pinFieldFilters[pinFieldFilter.name] = pinFieldFilter.value;
      }
    }
    if (pin_type) {
      for (const pinTypeSpecificFilter of pin_type.values) {
        const { _id, ...value } = pinTypeSpecificFilter;
        this.pinTypeSpecificFilters[_id] = value;
      }
    }
    for (const filterConfiguration of this.filterConfigurations) {
      const value = filterConfiguration.getInputValue();
      if (value !== undefined) {
        this.applyFilter(filterConfiguration, value);
      }
    }
  }

  /**
   * Add a "pin-field by id" filter.
   * @param {*} pinField - The pinField to set for.
   * @param {*} value - The pin field value
   */
  addPinTypeSpecificFilter(pinField, value) {
    this.pinTypeSpecificFilters[pinField._id] = value;
  }
  getPinTypeSpecificFilter(pinField) {
    return this.pinTypeSpecificFilters[pinField._id];
  }
  removePinTypeSpecificFilter(pinField) {
    delete this.modelFieldFilters[pinField._id];
  }

  /**
   * Add a model field filter.
   * @param {string} modelField
   * @param {*} value
   */
  addModelFieldFilter(modelField, value) {
    this.modelFieldFilters[modelField] = value;
  }
  removeModelFieldFilter(name) {
    delete this.modelFieldFilters[name];
  }
  /**
   * @param {string} name - The name of the model field filter to read
   * @return {string}
   */
  getModelFieldFilter(name) {
    return this.modelFieldFilters[name];
  }

  /**
   * Add a "pin-field by name" filter. Used for querying across pintypes.
   */
  addPinFieldFilter(pinFieldName, value) {
    this.pinFieldFilters[pinFieldName] = value;
  }
  removePinFieldFilter(pinFieldName) {
    delete this.pinFieldFilters[pinFieldName];
  }
  getPinFieldFilter(pinFieldName) {
    return this.pinFieldFilters[pinFieldName];
  }
}
