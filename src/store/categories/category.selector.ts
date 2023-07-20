import { createSelector } from 'reselect';

import { CategoriesState } from './category.reducer';
import { categoriesMap } from './category.types';

const selectCategoryReducer = (state) :CategoriesState=> state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice)  => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) : categoriesMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as categoriesMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
