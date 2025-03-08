import { expect, test,describe, beforeEach, vi } from 'vitest'
import { Browser, type BrowserPage, type Document } from 'happy-dom';
import {CopyToClipboard} from '../src/copyToClipboard'

describe('Copy to clipboard',{skip:false},()=> {

  let page:BrowserPage;
  let document:Document
  let browser:Browser

  beforeEach(()=> {
    
      browser = new Browser();
      page = browser.newPage();

      const myCustomElements=page.mainFrame.window.customElements
      
      myCustomElements.define('copyto-clipboard',CopyToClipboard)

      document=page.mainFrame.document
  })


  test("Test for the absence of the <template> tag",async ()=> {
    
      page.content=/*html*/`
          <html>
              <body>
                  <copyto-clipboard>
                  </copyto-clipboard>
              </body>
          </html>
      `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement

    const consoleWarnMock=vi.spyOn(console,'warn')

    copyToClipboardComponent.click()

    await browser.close()
    expect(consoleWarnMock).toHaveBeenCalled()
    expect(consoleWarnMock).toHaveBeenCalledWith('The template tag is not found')

  })


  test("Test to detect the setting of the data-copy attribute",async ()=> {
  

      page.content=/*html*/`
          <html>
              <body>
                  <copyto-clipboard>
                    <template>John Doe</template>
                  </copyto-clipboard>
              </body>
          </html>
      `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement

    copyToClipboardComponent.click() 

    await browser.close();
    expect(copyToClipboardComponent.hasAttribute('data-copy')).toBe(true)
    
  })


  test("Test if the text is correctly copied",async ()=> {

    

    page.content=/*html*/`
        <html>
            <body>
                <copyto-clipboard>
                  <template>John Doe</template>
                </copyto-clipboard>
            </body>
        </html>
    `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement

    const WriteTestMock=vi.spyOn(navigator.clipboard,'writeText')

    copyToClipboardComponent.click()

    await browser.close()

    expect(WriteTestMock).toBeCalled()
    expect(WriteTestMock).toBeCalledWith('John Doe')

    const clipboardContent=await navigator.clipboard.readText()
    expect(clipboardContent).toBe('John Doe')
  })

  test("Test copying code with HTML tags",async ()=> {

    page.content=/*html*/`
        <html>
            <body>
                <copyto-clipboard trim>
                  <template>
                    <span>name: John doe</span> <strong>age:20</strong>
                  </template>
                </copyto-clipboard>
            </body>
        </html>
    `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement

    copyToClipboardComponent.click()

    await browser.close()
    const clipboardContent=await navigator.clipboard.readText()
    expect(clipboardContent).toBe('name: John doe age:20')
  })

  test(" Test the use of &lt; et &gt;",async ()=> {

    page.content=/*html*/`
        <html>
            <body>
                <copyto-clipboard trim>
                  <template>
                    &lt;span&gt;name: John doe&lt;/span&gt; &lt;strong&gt;age:20&lt;/strong&gt;
                  </template>
                </copyto-clipboard>
            </body>
        </html>
    `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement
    
    copyToClipboardComponent.click()

    await browser.close()
    const clipboardContent=await navigator.clipboard.readText()
    expect(clipboardContent).toBe('<span>name: John doe</span> <strong>age:20</strong>')
  })


  test(" Test the emission of the copytoclipboard:copy event after a copy",async ()=> {


    page.content=/*html*/`
        <html>
            <body>
                <copyto-clipboard trim>
                  <template>
                    hello
                  </template>
                </copyto-clipboard>
            </body>
        </html>
    `

    const copyToClipboardComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement
    
    const dispatchEventMock=vi.spyOn(copyToClipboardComponent,'dispatchEvent')

    copyToClipboardComponent.click()
    
    await browser.close()
    expect(dispatchEventMock.mock.calls[3][0].type).toBe('copytoclipboard:copy')
  })

})

// test('essai',async ()=> {
    
//     const window=new Window();
//     const document=window.document
//     document.body.innerHTML=/*html*/`
//         <html>
           
//             <body>
//                 <copyto-clipboard>
//                     <template>salut</template>
//                 </copyto-clipboard>
//             </body>
//         </html>
//     `
//     const copyComponent=document?.querySelector('copyto-clipboard') as unknown as HTMLElement

//     copyComponent.click()

//     const clipboardContent=await  navigator.clipboard.readText()
//     console.log(clipboardContent);
//     window.close();

//     expect('salut').toBe('salut') 
// })

// Simuler `navigator.clipboard`
/* Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('Mocked Text')),
  },
}); */

// const navigator={
//     clipboard: {
//       writeText: vi.fn((text) => Promise.resolve()),
//       readText: vi.fn(() => Promise.resolve('Mocked Text')),
//     },
//   }




/* const n={...navigator,
    clipboard: {
      writeText: vi.fn((text) => Promise.resolve()),
      readText: vi.fn(() => Promise.resolve('Mocked Text')),
    },
  } */
// describe('CopyToClipboard', () => {
//   let element:CopyToClipboard;

//   beforeEach(() => {
//     document.body.innerHTML = `
//       <copyto-clipboard>
//         <template>Copied Text</template>
//       </copyto-clipboard>
//     `;
//     element = document?.querySelector('copyto-clipboard')!;
//   });

//   it('devrait être défini', () => {
//     expect(element).toBeInstanceOf(CopyToClipboard);
//   });

//   it('devrait copier le texte au clic', async () => {
//     element.click(); // Simule le clic
//     await new Promise((resolve) => setTimeout(resolve, 100)); // Attendre l'async

//     expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Copied Text');
//     expect(element.hasAttribute('data-copy')).toBe(true);
//   });

//   it("devrait déclencher l'événement `copytoclipboard:copy`", async () => {
//     const eventSpy = vi.fn();
//     element.addEventListener('copytoclipboard:copy', eventSpy);

//     element.click();
//     await new Promise((resolve) => setTimeout(resolve, 100));

//     expect(eventSpy).toHaveBeenCalled();
//   });

//   it("ne devrait pas copier si le `template` est manquant", async () => {
//     document.body.innerHTML = `<copyto-clipboard></copyto-clipboard>`;
//     element = document.querySelector('copyto-clipboard')!;
    
//     const warnSpy = vi.spyOn(console, 'warn');
//     element.click();
    
//     expect(warnSpy).toHaveBeenCalledWith('The template tag is not found');
//     expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
//   });
// });
