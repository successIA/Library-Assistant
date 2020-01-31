export const getCurrentPageNumber = search => {
  let queryStringPatt = /[?]page=(?<page_num>[\d]+)/;
  let match = queryStringPatt.exec(search); // page
  if (match && match.groups.page_num) {
    return parseInt(match.groups.page_num);
  } else {
    return 1;
  }
};
