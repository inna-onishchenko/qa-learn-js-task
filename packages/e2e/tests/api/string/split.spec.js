const { test, expect } = require("@playwright/test");

const reqStr1 = "aaa,b,cc";
const reqSeparator1 = ",";
const expectedResult1 = ["aaa", "b", "cc"];
const reqStr2 = " aaa b cc ";
const spaceSeparator = " ";
const expectedResult2 = ["", "aaa", "b", "cc", ""];
const reqStr3 = "aaa,,b,cc ";
const longSeparator = ",,";
const expectedResult3 = ["aaa", "b,cc "];
const nanSeparator = NaN;
const numberStr = 123;
const expectedResult4 = "Invalid input parameters";


// --- API tests ---

test("Both GET /api/string/manual/split and GET /api/string/builtin/split responses are ok", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
    const req2 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
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

test("Both GET /api/string/manual/split and GET /api/string/builtin/split messages are arrays", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
    const req2 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(Array.isArray(resBody1.message)).toBeTruthy();
    expect(Array.isArray(resBody2.message)).toBeTruthy();
});

test("Both GET /api/string/builtin/split and GET /api/string/manual/split can handle single character separators", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
  const req2 = await request.post(`/api/string/manual/split`, { data: { str: reqStr1, separator: reqSeparator1 } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult1);
  expect(resBody2.message).toEqual(expectedResult1);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/builtin/split and GET /api/string/manual/split can handle space separators", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr2, separator: spaceSeparator } });
  const req2 = await request.post(`/api/string/manual/split`, { data: { str: reqStr2, separator: spaceSeparator } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult2);
  expect(resBody2.message).toEqual(expectedResult2);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/builtin/split and GET /api/string/manual/split can handle multiple character separators", async ({ request }) => {
  const req1 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr3, separator: longSeparator } });
  const req2 = await request.post(`/api/string/manual/split`, { data: { str: reqStr3, separator: longSeparator } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult3);
  expect(resBody2.message).toEqual(expectedResult3);
  expect(resBody1).toEqual(resBody2);
});

test("Both GET /api/string/manual/split and GET /api/string/builtin/split can handle invalid input", async ({ request }) => {
  const req1 = await request.post(`/api/string/manual/split`, { data: { str: reqStr1 } });
  const req2 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr1 } });
  const req3 = await request.post(`/api/string/manual/split`, { data: { separator: reqSeparator1 } });
  const req4 = await request.post(`/api/string/builtin/split`, { data: { separator: reqSeparator1 } });
  const req5 = await request.post(`/api/string/manual/split`, { data: { str: numberStr, separator: reqSeparator1 } });
  const req6 = await request.post(`/api/string/builtin/split`, { data: { str: reqStr1, separator: nanSeparator } });
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
  expect(resBody1.message).toEqual(expectedResult4);
  expect(resBody2.message).toEqual(expectedResult4);
  expect(resBody3.message).toEqual(expectedResult4);
  expect(resBody4.message).toEqual(expectedResult4);
  expect(resBody5.message).toEqual(expectedResult4);
  expect(resBody6.message).toEqual(expectedResult4);
}
);

// --- UI test ---

