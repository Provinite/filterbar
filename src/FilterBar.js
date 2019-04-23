import { FilterConfiguration } from "./FilterConfiguration";

/**
 * @callback FilterBarOnApplyCallback
 * @param {FilterConfiguration} filterConfiguration - The filter configuration
 *  for which a value is being applied.
 * @param {any} inputValue - The input value.
 * @return {void}
 */

/**
 * @callback FilterBarOnClearCallback
 * @param {FilterConfiguration} filterConfiguration - The filter configuration
 *  to clear a value for.
 * @return {void}
 */

/**
 * @typedef FilterBarProps - Properties (bindings) for the filter bar component
 * @property {import("./typedefs").Chip[]} chips - Chips to display
 * @property {FilterConfiguration[]} filterConfigurations - Filter configurations
 *  for this bar.
 * @property {FilterBarOnApplyCallback} onApplyFilter - Callback invoked when a
 *  filter is applied.
 * @property {FilterBarOnClearCallback} onClearFilter - Callback invoked when a
 *  filter is cleared.
 */

 /**
  * Filter bar sortof
  * @param {FilterBarProps} props 
  */
 function FilterBar({chips, filterConfigurations, onApplyFilter, onClearFilter}) {
   // dropdown of filterConfigurations, onSelect sets filter configuration on self.selectedFilter
   
   // right side is generated based on selectedFilter.inputConfiguration.type, its
   // onSubmit handler invokes onApplyFilter(self.selectedFilter, inputValue)

   // alternatively, inputConfiguration could be a binding, but I don't think
   // we'll have a need for that kind of flexibility
 }
