/**
 *  List of element to be presented in the slider
 * @param {*} list
 * @returns List
 */
export const createSliderList = (list) => {
  const step = 100 / (list.length - 1);
  return list.map((item, index) => {
    return { value: index * step, label: `${item}` };
  });
};

/**
 * List of element to be presented in the selectors
 * @param {*} list
 * @returns List
 */
export const createSelectorModel = (list) => {
  return list.map((item, i) => {
    return { option: item, value: item };
  });
};

/**
 * Object to define the position on the screen
 * @param {*} locationClass
 * @param {*} top
 * @param {*} right
 * @param {*} left
 * @param {*} bottom
 * @returns style object
 */
export const buildLocation = (
  locationClass,
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
) => {
  if (locationClass === "bottom-left")
    return { bottom: `${bottom}px`, left: `${left}px` };
  if (locationClass === "bottom-right")
    return { right: `${right}px`, bottom: `${bottom}px` };
  if (locationClass === "top-right")
    return { right: `${right}px`, top: `${top}px` };
  if (locationClass === "top-left")
    return { left: `${left}px`, top: `${top}px` };

  return {};
};

/**
 * Formated number string ex: 15000 => 15 000
 * @param {*} number
 * @returns String
 */
export const numberFormater = (number, decimals = 0) => {
  const result = Number(Number(number).toFixed(decimals)).toLocaleString(
    undefined, // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: decimals },
  );

  return result;
};

/**
 * Return an Object of groups objects created
 * @param {*} list
 * @param {*} column
 * @returns Object
 */
export const groupList = (list, column) => {
  return list.reduce(function (acc, item) {
    (acc[item[column]] = acc[item[column]] || []).push(item);
    return acc;
  }, {});
};

/**
 *
 * @param {*} objList
 * @param {*} column
 * @returns
 */
export const sortByColumn = (objList, column) => {
  return objList.sort((obj1, obj2) => (obj1[column] < obj2[column] ? -1 : 1));
};

/**
 * Return a list of objects grouped by column1 param and sorted by column2 param
 * @param {*} list
 * @param {*} column1
 * @param {*} column2
 * @return List of objects
 */
export const groupingAndSortList = (list, column1, column2) => {
  const groupedList = groupList(
    removeDuplicateObjectsByColumn(list, column2),
    column1,
  );

  const grouped_and_sortedList = Object.keys(groupedList).reduce(
    (acc, item) => {
      return [
        ...acc,
        { group_fr: item },
        ...sortByColumn(groupedList[item], column2),
      ];
    },
    [],
  );

  return grouped_and_sortedList;
};

/**
 * List of unique objects filtered by a given column
 * @param {*} arr list of objects to be cleaned
 * @param {*} column column used to conduct the cleaning
 * @returns List of objects
 */
export const removeDuplicateObjectsByColumn = (arr, column) => [
  ...new Map(arr.map((item) => [item[column], item])).values(),
];
