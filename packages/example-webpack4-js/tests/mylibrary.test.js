jest.setTimeout(30000);
describe('Compilation', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
  });


// --------------------

test('test_mylibrary_add', async () => {
  await test_mylibrary_add();
}); // test

async function test_mylibrary_add() {
  await delay(300);
  const output1 = await page.evaluate(
    () => MyLibrary.wasmModule._mylibrary_add(10, 20)
  );
  expect(output1).toBe(30);    
}

// --------------------



// --------------------
// --------------------

}); // describe

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}