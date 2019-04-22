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
