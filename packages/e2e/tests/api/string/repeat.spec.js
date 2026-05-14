const { test, expect } = require("@playwright/test");

const reqStrRepeat = "abc";
const reqCount = 2;
const expectedResult1 = "abcabc";
const stringCount = "2";
const emptyStr = "";
const zeroCount = 0;
const expectedResult2 = "";
const numberStr = 123;
const negativeCount = -1;
const expectedResult3 = "Text to repeat should be a string";
const expectedResult4 = "Count should be a non-negative integer";


// --- API tests ---

test("Both POST /api/string/manual/repeat and POST /api/string/builtin/repeat responses are ok", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
    const req2 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(req1.status()).toEqual(200);
    expect(req2.status()).toEqual(200);
    expect(String(resBody1.status)).toEqual("ok");
    expect(String(resBody2.status)).toEqual("ok");
    expect(String(resBody1.language)).toEqual("javascript");
    expect(String(resBody2.language)).toEqual("javascript");
});

test("Both POST /api/string/manual/repeat and POST /api/string/builtin/repeat messages are strings", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
    const req2 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(typeof resBody1.message).toEqual("string");
    expect(typeof resBody2.message).toEqual("string");
});

test("Both POST /api/string/builtin/repeat and POST /api/string/manual/repeat can handle valid inputs", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
  const req2 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: reqCount } });
  const req3 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: stringCount } });
  const req4 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: stringCount } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(resBody1.message).toEqual(expectedResult1);
  expect(resBody2.message).toEqual(expectedResult1);
  expect(resBody3.message).toEqual(expectedResult1);
  expect(resBody4.message).toEqual(expectedResult1);
  expect(resBody1).toEqual(resBody2);
  expect(resBody3).toEqual(resBody4);
});

test("Both POST /api/string/manual/repeat and POST /api/string/builtin/repeat can handle empty string and zero count", async ({ request }) => {
  const req1 = await request.post(`/api/string/manual/repeat`, { data: { str: emptyStr, count: reqCount } });
  const req2 = await request.post(`/api/string/builtin/repeat`, { data: { str: emptyStr, count: reqCount } });
  const req3 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: zeroCount } });
  const req4 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: zeroCount } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(req1.status()).toEqual(200);
  expect(req2.status()).toEqual(200);
  expect(req3.status()).toEqual(200);
  expect(req4.status()).toEqual(200);
  expect(resBody1.message).toEqual(expectedResult2);
  expect(resBody2.message).toEqual(expectedResult2);
  expect(resBody3.message).toEqual(expectedResult2);
  expect(resBody4.message).toEqual(expectedResult2);
});

test("Both POST /api/string/manual/repeat and POST /api/string/builtin/repeat don't accept invalid arguments", async ({ request }) => {
  const req1 = await request.post(`/api/string/manual/repeat`, { data: { str: numberStr, count: stringCount } });
  const req2 = await request.post(`/api/string/builtin/repeat`, { data: { str: numberStr, count: stringCount } });
  const req3 = await request.post(`/api/string/manual/repeat`, { data: { str: reqStrRepeat, count: negativeCount } });
  const req4 = await request.post(`/api/string/builtin/repeat`, { data: { str: reqStrRepeat, count: negativeCount } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(req1.status()).toEqual(400);
  expect(req2.status()).toEqual(400);
  expect(req3.status()).toEqual(400);
  expect(req4.status()).toEqual(400);
  expect(resBody1.message).toEqual(expectedResult3);
  expect(resBody2.message).toEqual(expectedResult3);
  expect(resBody3.message).toEqual(expectedResult4);
  expect(resBody4.message).toEqual(expectedResult4);
});

// --- UI test ---

