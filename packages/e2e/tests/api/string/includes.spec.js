const { test, expect } = require("@playwright/test");

const reqStr1 = "aabbbc";
const startWithSearch = "a";
const middleCharSearch = "bbb";
const endWithSearch = "c";
const notIncludedLongSearch = "bbbbb";
const emptySearch = "";
const nanStr = null;
const numberStr = 123;
const nanSearch = NaN;
const numberSearch = 123;
const expectedResult1 = {result: true, index: 0};
const expectedResult2 = {result: true, index: 2};
const expectedResult3 = {result: true, index: reqStr1.length - 1};
const expectedResult4 = {result: false, index: -1};
const expectedResult5 = "Str should be a string";


// --- API tests ---

test("Both GET /api/string/manual/includes and GET /api/string/builtin/includes responses are ok", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: startWithSearch } });
    const req2 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: startWithSearch } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(req1.ok()).toBeTruthy();
    expect(req2.ok()).toBeTruthy();
    expect(req1.status()).toEqual(200);
    expect(req2.status()).toEqual(200);
    expect(resBody1.status).toEqual("ok");
    expect(resBody2.status).toEqual("ok");
    expect(resBody1.language).toEqual("javascript");
    expect(resBody2.language).toEqual("javascript");
});

test("Both GET /api/string/builtin/includes and GET /api/string/manual/includes can find search at 0 index of a string", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: startWithSearch } }); // single char search at the beginning of a string
  const req2 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: startWithSearch } });
  const req3 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: emptySearch } }); // empty search
  const req4 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: emptySearch } });
  const req5 = await request.post(`/api/string/builtin/includes`, { data: { str: endWithSearch, search: endWithSearch } }); // single char search which is equal to string
  const req6 = await request.post(`/api/string/manual/includes`, { data: { str: endWithSearch, search: endWithSearch } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  expect(resBody1.message).toEqual(expectedResult1);
  expect(resBody2.message).toEqual(expectedResult1);
  expect(resBody3.message).toEqual(expectedResult1);
  expect(resBody4.message).toEqual(expectedResult1);
  expect(resBody5.message).toEqual(expectedResult1);
  expect(resBody6.message).toEqual(expectedResult1);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/builtin/includes and GET /api/string/manual/includes can find multiple character search in string", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: middleCharSearch } }); // multiple char search in the middle of a string
  const req2 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: middleCharSearch } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult2);
  expect(resBody2.message).toEqual(expectedResult2);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/builtin/includes and GET /api/string/manual/includes can find search on last index of a string", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: endWithSearch } }); // single char search at the end of a string
  const req2 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: endWithSearch } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult3);
  expect(resBody2.message).toEqual(expectedResult3);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/builtin/includes and GET /api/string/manual/includes can handle non-included search in a string", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: nanSearch } }); // search is not a string
  const req2 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: nanSearch } });
  const req3 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: numberSearch } }); // search is not a string
  const req4 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: numberSearch } });
  const req5 = await request.post(`/api/string/builtin/includes`, { data: { str: endWithSearch, search: startWithSearch } }); // single char search is not included in the string
  const req6 = await request.post(`/api/string/manual/includes`, { data: { str: endWithSearch, search: startWithSearch } });
  const req7 = await request.post(`/api/string/builtin/includes`, { data: { str: reqStr1, search: notIncludedLongSearch } }); // long search is not included in the string
  const req8 = await request.post(`/api/string/manual/includes`, { data: { str: reqStr1, search: notIncludedLongSearch } });
  const req9 = await request.post(`/api/string/builtin/includes`, { data: { str: endWithSearch, search: middleCharSearch } }); // search is longer than a string
  const req10 = await request.post(`/api/string/manual/includes`, { data: { str: endWithSearch, search: middleCharSearch } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  const resBody7 = await req7.json();
  const resBody8 = await req8.json();
  const resBody9 = await req9.json();
  const resBody10 = await req10.json();
  expect(resBody1.message).toEqual(expectedResult4);
  expect(resBody2.message).toEqual(expectedResult4);
  expect(resBody3.message).toEqual(expectedResult4);
  expect(resBody4.message).toEqual(expectedResult4);
  expect(resBody5.message).toEqual(expectedResult4);
  expect(resBody6.message).toEqual(expectedResult4); 
  expect(resBody7.message).toEqual(expectedResult4);
  expect(resBody8.message).toEqual(expectedResult4);
  expect(resBody9.message).toEqual(expectedResult4);
  expect(resBody10.message).toEqual(expectedResult4);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/manual/includes and GET /api/string/builtin/includes can handle invalid str parameter", async ({ request }) => {
  const req1 = await request.post(`/api/string/manual/includes`, { data: { str: nanStr, search: emptySearch } });
  const req2 = await request.post(`/api/string/builtin/includes`, { data: { str: nanStr, search: emptySearch } });
  const req3 = await request.post(`/api/string/manual/includes`, { data: { str: numberStr, search: emptySearch } });
  const req4 = await request.post(`/api/string/builtin/includes`, { data: { str: numberStr, search: emptySearch } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(req1.ok()).toBeFalsy();
  expect(req2.ok()).toBeFalsy();
  expect(req3.ok()).toBeFalsy();
  expect(req4.ok()).toBeFalsy();
  expect(req1.status()).toEqual(400);
  expect(req2.status()).toEqual(400);
  expect(req3.status()).toEqual(400);
  expect(req4.status()).toEqual(400);
  expect(resBody1.status).toEqual("bad_request");
  expect(resBody2.status).toEqual("bad_request");
  expect(resBody3.status).toEqual("bad_request");
  expect(resBody4.status).toEqual("bad_request");
  expect(resBody1.message).toEqual(expectedResult5);
  expect(resBody2.message).toEqual(expectedResult5);
  expect(resBody3.message).toEqual(expectedResult5);
  expect(resBody4.message).toEqual(expectedResult5);
}
);

// --- UI test ---

