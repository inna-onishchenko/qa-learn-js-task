const { test, expect } = require("@playwright/test");

const startEndWithSpaces = "   aaa b cc ";
const startWithSpaces = " aaa b cc";
const endWithSpaces = "aaa b cc ";
const expectedResult1 = "aaa b cc";
const emptyStr = "";
const spaceStr = "     ";
const expectedResult2 = "";
const numberStr = 123;
const nullStr = null;
const nanStr = NaN;
const expectedResult3 = "Input parameter is not a string";


// --- API tests ---

test("Both GET /api/string/manual/trim and GET /api/string/builtin/trim responses are ok", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/trim`, { data: { str: startEndWithSpaces } });
    const req2 = await request.post(`/api/string/builtin/trim`, { data: { str: startEndWithSpaces } });
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

test("Both GET /api/string/manual/trim and GET /api/string/builtin/trim messages are strings", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/trim`, { data: { str: startEndWithSpaces } });
    const req2 = await request.post(`/api/string/builtin/trim`, { data: { str: startEndWithSpaces } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(typeof resBody1.message).toEqual("string");
    expect(typeof resBody2.message).toEqual("string");
});

test("Both GET /api/string/builtin/trim and GET /api/string/manual/trim handle leading and trailing whitespace correctly", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/trim`, { data: { str: startEndWithSpaces } });
  const req2 = await request.post(`/api/string/manual/trim`, { data: { str: startEndWithSpaces } });
  const req3 = await request.post(`/api/string/builtin/trim`, { data: { str: startWithSpaces } });
  const req4 = await request.post(`/api/string/manual/trim`, { data: { str: startWithSpaces } });
  const req5 = await request.post(`/api/string/builtin/trim`, { data: { str: endWithSpaces } });
  const req6 = await request.post(`/api/string/manual/trim`, { data: { str: endWithSpaces } });
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

test("Both GET /api/string/builtin/trim and GET /api/string/manual/trim can handle empty and space strings", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/trim`, { data: { str: emptyStr } });
  const req2 = await request.post(`/api/string/manual/trim`, { data: { str: emptyStr } });
  const req3 = await request.post(`/api/string/builtin/trim`, { data: { str: spaceStr } });
  const req4 = await request.post(`/api/string/manual/trim`, { data: { str: spaceStr } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(resBody1.message).toEqual(expectedResult2);
  expect(resBody2.message).toEqual(expectedResult2);
  expect(resBody3.message).toEqual(expectedResult2);
  expect(resBody4.message).toEqual(expectedResult2);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/manual/trim and GET /api/string/builtin/trim can handle invalid input", async ({ request }) => {
  const req1 = await request.post(`/api/string/manual/trim`, { data: { str: nullStr } });
  const req2 = await request.post(`/api/string/builtin/trim`, { data: { str: nullStr } });
  const req3 = await request.post(`/api/string/manual/trim`, { data: { str: nanStr } });
  const req4 = await request.post(`/api/string/builtin/trim`, { data: { str: nanStr } });
  const req5 = await request.post(`/api/string/manual/trim`, { data: { str: numberStr } });
  const req6 = await request.post(`/api/string/builtin/trim`, { data: { str: numberStr } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  expect(req1.ok()).toBeFalsy();
  expect(req2.ok()).toBeFalsy();
  expect(req1.status()).toEqual(400);
  expect(req2.status()).toEqual(400);
  expect(req3.status()).toEqual(400);
  expect(req4.status()).toEqual(400);
  expect(req5.status()).toEqual(400);
  expect(req6.status()).toEqual(400);
  expect(resBody1.status).toEqual("bad_request");
  expect(resBody2.status).toEqual("bad_request");
  expect(resBody3.status).toEqual("bad_request");
  expect(resBody4.status).toEqual("bad_request");
  expect(resBody5.status).toEqual("bad_request");
  expect(resBody6.status).toEqual("bad_request");
  expect(resBody1.message).toEqual(expectedResult3);
  expect(resBody2.message).toEqual(expectedResult3);
  expect(resBody3.message).toEqual(expectedResult3);
  expect(resBody4.message).toEqual(expectedResult3);
  expect(resBody5.message).toEqual(expectedResult3);
  expect(resBody6.message).toEqual(expectedResult3);
}
);

// --- UI test ---

