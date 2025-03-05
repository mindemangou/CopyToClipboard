## COPYTO-CLIPBOARD

### Simple custum elements that allows you to copy text

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