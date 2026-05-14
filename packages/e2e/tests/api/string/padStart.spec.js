const { test, expect } = require("@playwright/test");

const str1 = "abc";
const str2 = "abcde";
const emptyStr = "";
const numberStr = 123;
const nullStr = null;
const nanStr = NaN;
const shorterThanStrLength = 1;
const equalToStrLength = 3;
const equalToStrPlusOneFillLength = 4;
const shorterThanStrPlusOneFillLength = 5;
const longerThanStrPlusOneFillLength = 10;
const shortFill = "x";
const longFill = "xyz";
const expectedResult1 = "  abc";
const expectedResult2 = "xabc";
const expectedResult3 = "xxxxxxxabc";
const expectedResult4 = "xyzxyzxabc";
const expectedResult5 = "xyzx";
const expectedResult6 = "12312abcde";
const expectedResult7 = "nuabc";
const expectedResult8 = "Str should be a string";

// --- API tests ---

test("Both GET /api/string/manual/padStart and GET /api/string/builtin/padStart responses are ok", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/padStart`, { data: { str: emptyStr, length: equalToStrPlusOneFillLength, fill: shortFill } });
    const req2 = await request.post(`/api/string/builtin/padStart`, { data: { str: emptyStr, length: equalToStrPlusOneFillLength, fill: shortFill } });
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

test("Both GET /api/string/manual/padStart and GET /api/string/builtin/padStart messages are strings", async ({ request }) => {
    const req1 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: longFill } });
    const req2 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: longFill } });
    const resBody1 = await req1.json();
    const resBody2 = await req2.json();
    expect(typeof resBody1.message).toEqual("string");
    expect(typeof resBody2.message).toEqual("string");
});

test("Both GET /api/string/builtin/padStart and GET /api/string/manual/padStart can return valid str without changes", async ({ request }) => {
  // {str: "abcde", length: 1, fill: "x", expectedResult: "abcde"}
  const req1 = await request.post(`/api/string/builtin/padStart`, { data: { str: str2, length: shorterThanStrLength, fill: shortFill } });            
  const req2 = await request.post(`/api/string/manual/padStart`, { data: { str: str2, length: shorterThanStrLength, fill: shortFill } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(str2);
  expect(resBody2.message).toEqual(str2);

  // {str: "abc", length: 3, fill: "x", expectedResult: "abc"}
  const req3 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: equalToStrLength, fill: shortFill } });                
  const req4 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: equalToStrLength, fill: shortFill } }); 
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(resBody3.message).toEqual(str1);
  expect(resBody4.message).toEqual(str1);

  // {str: "abc", length: 4, fill: "", expectedResult: "abc"}
  const req5 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: emptyStr } }); 
  const req6 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: emptyStr } });
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  expect(resBody5.message).toEqual(str1);
  expect(resBody6.message).toEqual(str1);

  // {str: "abc", length: null, fill: "x", expectedResult: "abc"}
  const req7 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: nullStr, fill: shortFill } });                         
  const req8 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: nullStr, fill: shortFill } });
  const resBody7 = await req7.json();
  const resBody8 = await req8.json();
  expect(resBody7.message).toEqual(str1);
  expect(resBody8.message).toEqual(str1);

  // {str: "", length: false, fill: "x", expectedResult: ""}
  const req9 = await request.post(`/api/string/builtin/padStart`, { data: { str: emptyStr, length: false, fill: shortFill } });                      
  const req10 = await request.post(`/api/string/manual/padStart`, { data: { str: emptyStr, length: false, fill: shortFill } });
  const resBody9 = await req9.json();
  const resBody10 = await req10.json();
  expect(resBody9.message).toEqual(emptyStr);
  expect(resBody10.message).toEqual(emptyStr);

  // {str: "abc", length: "", fill: "x", expectedResult: "abc"}
  const req11 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: emptyStr, fill: shortFill } });                        
  const req12 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: emptyStr, fill: shortFill } });
  const resBody11 = await req11.json();
  const resBody12 = await req12.json();
  expect(resBody11.message).toEqual(str1);
  expect(resBody12.message).toEqual(str1);
});

test("Both GET /api/string/builtin/padStart and GET /api/string/manual/padStart are filling with space strings if no fill string is provided", async ({ request }) => {
  // {str: "abc", length: 5, expectedResult: "  abc"}
  const req1 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: shorterThanStrPlusOneFillLength } });
  const req2 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: shorterThanStrPlusOneFillLength } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult1);
  expect(resBody2.message).toEqual(expectedResult1);
});

test("Both GET /api/string/builtin/padStart and GET /api/string/manual/padStart are combining str and fill strings correctly", async ({ request }) => {
  // {str: "abc", length: 4, fill: "x", expectedResult: "xabc"}
  const req1 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: shortFill } });
  const req2 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: shortFill } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(resBody1.message).toEqual(expectedResult2);
  expect(resBody2.message).toEqual(expectedResult2);

  // {str: "abc", length: 4, fill: "xyz", expectedResult: "xabc"}
  const req3 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: longFill } });
  const req4 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: equalToStrPlusOneFillLength, fill: longFill } });
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(resBody3.message).toEqual(expectedResult2);
  expect(resBody4.message).toEqual(expectedResult2);

  // {str: "", length: 1, fill: "xyz", expectedResult: "x"}
  const req5 = await request.post(`/api/string/builtin/padStart`, { data: { str: emptyStr, length: shorterThanStrLength, fill: longFill } });
  const req6 = await request.post(`/api/string/manual/padStart`, { data: { str: emptyStr, length: shorterThanStrLength, fill: longFill } });
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  expect(resBody5.message).toEqual(shortFill);
  expect(resBody6.message).toEqual(shortFill);

  // {str: "abc", length: 10, fill: "x", expectedResult: "xxxxxxxabc"}
  const req7 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: longerThanStrPlusOneFillLength, fill: shortFill } });
  const req8 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: longerThanStrPlusOneFillLength, fill: shortFill } });
  const resBody7 = await req7.json();
  const resBody8 = await req8.json();
  expect(resBody7.message).toEqual(expectedResult3);
  expect(resBody8.message).toEqual(expectedResult3);

  // {str: "abc", length: 10, fill: "x", expectedResult: "xyzxyzxabc"}
  const req9 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: longerThanStrPlusOneFillLength, fill: longFill } });
  const req10 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: longerThanStrPlusOneFillLength, fill: longFill } });
  const resBody9 = await req9.json();
  const resBody10 = await req10.json();
  expect(resBody9.message).toEqual(expectedResult4);
  expect(resBody10.message).toEqual(expectedResult4);

  // {str: "", length: 4, fill: "xyz", expectedResult: "xyzx"}
  const req11 = await request.post(`/api/string/builtin/padStart`, { data: { str: emptyStr, length: equalToStrPlusOneFillLength, fill: longFill } });
  const req12 = await request.post(`/api/string/manual/padStart`, { data: { str: emptyStr, length: equalToStrPlusOneFillLength, fill: longFill } });
  const resBody11 = await req11.json();
  const resBody12 = await req12.json();
  expect(resBody11.message).toEqual(expectedResult5);
  expect(resBody12.message).toEqual(expectedResult5);

  // {str: "abcde", length: 10, fill: "123", expectedResult: "12312abcde"}
  const req13 = await request.post(`/api/string/builtin/padStart`, { data: { str: str2, length: longerThanStrPlusOneFillLength, fill: numberStr } });
  const req14 = await request.post(`/api/string/manual/padStart`, { data: { str: str2, length: longerThanStrPlusOneFillLength, fill: numberStr } });
  const resBody13 = await req13.json();
  const resBody14 = await req14.json();
  expect(resBody13.message).toEqual(expectedResult6);
  expect(resBody14.message).toEqual(expectedResult6);

  // {str: "abcde", length: 5, fill: null, expectedResult: "nuabc"}
  const req15 = await request.post(`/api/string/builtin/padStart`, { data: { str: str1, length: shorterThanStrPlusOneFillLength, fill: nullStr } });
  const req16 = await request.post(`/api/string/manual/padStart`, { data: { str: str1, length: shorterThanStrPlusOneFillLength, fill: nullStr } });
  const resBody15 = await req15.json();
  const resBody16 = await req16.json();
  expect(resBody15.message).toEqual(expectedResult7);
  expect(resBody16.message).toEqual(expectedResult7);
});

test("Both GET /api/string/manual/padStart and GET /api/string/builtin/padStart can handle invalid input", async ({ request }) => {
  // {str: "123", length: 3, fill: "x", expectedResult: "Str should be a string"}
  const req1 = await request.post(`/api/string/manual/padStart`, { data: { str: numberStr, length: equalToStrLength, fill: shortFill } });
  const req2 = await request.post(`/api/string/builtin/padStart`, { data: { str: numberStr, length: equalToStrLength, fill: shortFill } });
  const resBody1 = await req1.json();
  const resBody2 = await req2.json();
  expect(req1.status()).toEqual(400);
  expect(req2.status()).toEqual(400);
  expect(resBody1.status).toEqual("bad_request");
  expect(resBody2.status).toEqual("bad_request");
  expect(resBody1.message).toEqual(expectedResult8);
  expect(resBody2.message).toEqual(expectedResult8);
  expect(req1.ok()).toBeFalsy();
  expect(req2.ok()).toBeFalsy();

  // {str: "null", length: 3, fill: "x", expectedResult: "Str should be a string"}
  const req3 = await request.post(`/api/string/manual/padStart`, { data: { str: nullStr, length: equalToStrLength, fill: shortFill } });
  const req4 = await request.post(`/api/string/builtin/padStart`, { data: { str: nullStr, length: equalToStrLength, fill: shortFill } });
  const resBody3 = await req3.json();
  const resBody4 = await req4.json();
  expect(req3.status()).toEqual(400);
  expect(req4.status()).toEqual(400);
  expect(resBody3.status).toEqual("bad_request");
  expect(resBody4.status).toEqual("bad_request");
  expect(resBody3.message).toEqual(expectedResult8);
  expect(resBody4.message).toEqual(expectedResult8);

  // {str: NaN, length: 3, fill: "x", expectedResult: "Str should be a string"}  
  const req5 = await request.post(`/api/string/manual/padStart`, { data: { str: nanStr, length: equalToStrLength, fill: shortFill } });
  const req6 = await request.post(`/api/string/builtin/padStart`, { data: { str: nanStr, length: equalToStrLength, fill: shortFill } });
  const resBody5 = await req5.json();
  const resBody6 = await req6.json();
  expect(req5.status()).toEqual(400);
  expect(req6.status()).toEqual(400);
  expect(resBody5.status).toEqual("bad_request");
  expect(resBody6.status).toEqual("bad_request");
  expect(resBody5.message).toEqual(expectedResult8);
  expect(resBody6.message).toEqual(expectedResult8);

  // {length: 3, fill: "x", expectedResult: "Str should be a string"}   
  const req7 = await request.post(`/api/string/manual/padStart`, { data: { length: equalToStrLength, fill: shortFill } });
  const req8 = await request.post(`/api/string/builtin/padStart`, { data: { length: equalToStrLength, fill: shortFill } });
  const resBody7 = await req7.json();
  const resBody8 = await req8.json();
  expect(req7.status()).toEqual(400);
  expect(req8.status()).toEqual(400);
  expect(resBody7.status).toEqual("bad_request");
  expect(resBody8.status).toEqual("bad_request");
  expect(resBody7.message).toEqual(expectedResult8);
  expect(resBody8.message).toEqual(expectedResult8);
}
);

// --- UI test ---

