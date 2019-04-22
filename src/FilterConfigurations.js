import { SimpleModelFieldFilterConfiguration } from "./SimpleModelFieldFilterConfiguration";
import { FilterBarManager } from "./FilterBarManager";
import { CategoryFilterConfiguration } from "./CategoryFilterConfiguration";

/**
 * Create a new filter configuration instance appropriate for managing simple
 * model.name queries.
 * @param {FilterBarManager} manager
 */
export const createNameFilterConfiguration = manager => {
  const result = new SimpleModelFieldFilterConfiguration(manager, {
    chipName: "Name",
    displayName: "Name",
    inputType: "text",
    queryField: "name"
  });
  return result;
}
  
export const createPinTypeFilterConfiguration = (manager, building) =>
  new CategoryFilterConfiguration(manager, building);
