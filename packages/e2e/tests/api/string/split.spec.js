const { test, expect } = require("@playwright/test");

let reqStr = "aaa,b,cc";
let reqSeparator = ",";
let expectedResult = ["aaa", "b", "cc"];
let spaceSeparator = " ";
let longSeparator = ",,";
let notIncludedSeparator = ";";
let startWithSeparator = ",aaa,b,cc";
let endWithSeparator = "aaa,b,cc,";

// --- API tests ---

test("Both GET /api/string/manual/split and GET /api/string/builtin/split responses are ok", async ({ request }) => {
    const res1 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: reqSeparator } });
    const res2 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: reqSeparator } });
    expect(res1.ok()).toBeTruthy();
    expect(res2.ok()).toBeTruthy();
    expect(res1.status()).toEqual(200);
    expect(res2.status()).toEqual(200);
    expect(String((await res1.json()).language)).toEqual("javascript");
    expect(String((await res2.json()).language)).toEqual("javascript");
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split messages are arrays", async ({ request }) => {
    const res1 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: reqSeparator } });
    const res2 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: reqSeparator } });
    expect(Array.isArray((await res1.json()).message)).toBeTruthy();
    expect(Array.isArray((await res2.json()).message)).toBeTruthy();
});

test("Both GET /api/string/builtin/split and GET /api/string/manual/split responses are equal", async ({ request }) => {
  const res1 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: reqSeparator } });
  const res2 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: reqSeparator } });
  expect(await res1.json()).toEqual(await res2.json());
});

test("Both GET /api/string/builtin/split and GET /api/string/manual/split messages are equal to expected result", async ({ request }) => {
  const res1 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: reqSeparator } });
  const res2 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: reqSeparator } });
  expect((await res1.json()).message).toEqual(expectedResult);
  expect((await res2.json()).message).toEqual(expectedResult);
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split handle space separator", async ({ request }) => {
  const res1 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: spaceSeparator } });
  const res2 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: spaceSeparator } });
  expect((await res1.json()).message).toEqual("Separator should not be a space character");
  expect((await res2.json()).message).toEqual("Separator should not be a space character");
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split handle long separator", async ({ request }) => {
  const res1 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: longSeparator } });
  const res2 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: longSeparator } });
  expect((await res1.json()).message).toEqual("Separator should be a single character");
  expect((await res2.json()).message).toEqual("Separator should be a single character");
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split handle not included separator", async ({ request }) => {
  const res1 = await request.post(`/api/string/manual/split`, { json: { str: reqStr, separator: notIncludedSeparator } });
  const res2 = await request.post(`/api/string/builtin/split`, { json: { str: reqStr, separator: notIncludedSeparator } });
  expect((await res1.json()).message).toEqual("String should contain the separator");
  expect((await res2.json()).message).toEqual("String should contain the separator");
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split handle string starting with separator", async ({ request }) => {
  const res1 = await request.post(`/api/string/manual/split`, { json: { str: startWithSeparator, separator: reqSeparator } });
  const res2 = await request.post(`/api/string/builtin/split`, { json: { str: startWithSeparator, separator: reqSeparator } });
  expect((await res1.json()).message).toEqual("String should not start or end with the separator");
  expect((await res2.json()).message).toEqual("String should not start or end with the separator");
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split handle string ending with separator", async ({ request }) => {
  const res1 = await request.post(`/api/string/manual/split`, { json: { str: endWithSeparator, separator: reqSeparator } });
  const res2 = await request.post(`/api/string/builtin/split`, { json: { str: endWithSeparator, separator: reqSeparator } });
  expect((await res1.json()).message).toEqual("String should not start or end with the separator");
  expect((await res2.json()).message).toEqual("String should not start or end with the separator");
});

// --- UI test ---

