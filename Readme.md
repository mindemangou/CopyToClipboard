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
OR
```html
<script type="module" src="./node_modules/@mindemangou/copyto-clipboard" defer></script>
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
 Use ```target``` attribute if you want to copy the contents of a DOM element

 ```html
  <div id='template' >
    <span>John Doe</span>
  </div>

  <copyto-clipboard  target='#template'>
    <button>click me 📄</button>
  </copyto-clipboard>

  <!-- Output -->
   <span>John Doe</span>
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

Use the ```disable``` attribute to prevent copying

```html

<!-- copy not work -->
<copyto-clipboard disabled>
      <button>click me 📄</button>

      <template> </template>  
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


