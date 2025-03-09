## COPYTO-CLIPBOARD

### A simple web component that allows you to copy text easily

### 📦 Installation

You can install **copyto-clipboard** using npm, yarn, or pnpm:

```sh
# Using npm
npm install @mindemangou/copyto-clipboard

# Using yarn
yarn add @mindemangou/copyto-clipboard

# Using pnpm
pnpm add @mindemangou/copyto-clipboard
```
###  Import the package
```js
import '@mindemangou/copyto-clipboard'
```

Example of use:
```html
<copyto-clipboard>

      <button>click me 📄</button>

      <template> 
        <!-- Add text to copy here -->
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Dignissimos reiciendis
      </template>  
     
</copyto-clipboard>
```
 You can use the ```trim``` attribute to remove leading and trailing whitespace from the copied text

```html
<copyto-clipboard trim>

      <button>click me 📄</button>

      <template> 
       
         
        Dignissimos reiciendis


      </template>  
     
</copyto-clipboard>
```

If you want to insert an HTML tag use "```&lt;```" for the sign < and "```&gt;```" for the sign >

```html
<copyto-clipboard>

    <button>click me 📄</button>

    <template> 
        <!-- ❌ -->
        <div>hello</div> // Resultat after pasting the text: hello 

        <!-- ✅ -->
        &lt;div&gt;hello&lt;/div&gt; //Resultat after pasting the text: <div>hello</div> 
    </template>
    
</copyto-clipboard> 
```

A data-copy attribute is set to the custom elements ```copyto-clipboard``` if the copy is successful

```html

  <copyto-clipboard>

      <button id="copyToClipboard" >copy to clipboard</button>

      <button id="copied" >copied</button>

      <template> 

        #content {
          display: flex;
        }
        
        div > div {
          border: 3px solid rgb(0 0 0 / 20%);
        }
        
        .small {
          flex-grow: 1;
        }
        
        .double {
          flex-grow: 2;
          border: 3px solid rgb(0 0 0 / 20%);
        }
        
      </template>  
  </copyto-clipboard> 

```

```css 
copyto-clipboard #copied,copyto-clipboard[data-copy] #copyToClipboard  {
  display: none;
}

copyto-clipboard[data-copy] #copied {
  display: block;
}

```

You can also listen to the javascript ```copytoclipboard:copy``` event to detect whether the copy was successful

```js
  const copyToClipboard=document.querySelector('copyto-clipboard')

  copyToClipboard.addEventListener('copytoclipboard:copy',()=> {
          alert('COPIED')
      })
```

###  Development
Clone the repo and install dependencies:
```sh
	git clone https://github.com/mindemangou/CopyToClipboard.git
	cd CopyToClipboard
	pnpm install
```
Run in development mode:
```sh
	pnpm run dev
```
Run tests:
```sh
	pnpm run test
```
💡 Feel free to contribute! If you have any ideas or issues, open an issue or submit a PR. 🚀


