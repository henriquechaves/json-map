
export function comparisonSort(property, sortStatus) {
  let sortOrder = 1;
  if(!sortStatus[property]) sortOrder = -1;

  return function (a, b) {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

// Finally, test a single item property.
// A single input field from user is match against the related item property
// The test is based on the DATA TYPE of the content of property
function testSinglePropertyOfItem(singlePropValue, singlePropValueRequired) {

  const singlePropValueType = typeof singlePropValue;

  switch (singlePropValueType) {

    case 'string' :
      return singlePropValue.search(new RegExp(singlePropValueRequired, 'i')) > -1;

    case 'bool' :
      return singlePropValue === singlePropValueRequired;

    case 'number' :
      return singlePropValue.toString().search(new RegExp(singlePropValueRequired, 'i')) > -1;

    case 'array' :
      return false; // ...to be implemented

    case 'object' :
      return  false; // ...to be implemented

    default:
      return true;

  }
}

// Prepare item's property to be tested.
// Each property of the item need pass the whole test set.
// (test set: all the input fields from user)
function testItem(item, allPropertiesRequireds) {
  const prepareToPropTest = Object.entries(allPropertiesRequireds);
  return prepareToPropTest.every(singleRequire => {
    const propertyNameInJSON = singleRequire[0];
    const singlePropValueRequired = singleRequire[1];
    if(singlePropValueRequired === '') return true; // pass if input field is blank
    const singlePropValue = item[propertyNameInJSON];
    return testSinglePropertyOfItem(singlePropValue, singlePropValueRequired);
  });
}

// Prepare each item to be tested. After, return the results.
// Map the array's items selecting those passed in the applied test function.
export function filter(data, require) {
  console.log(typeof require.id);
  const testResult = data.map(item => {
    if(testItem(item, require)) return item;
  });

  // select the matcheds items
  let filteredData = [];
  filteredData = testResult.filter(item => {
    return (typeof item !== 'undefined');
  })
  return filteredData;
}
