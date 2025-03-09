export class CopyToClipboard extends HTMLElement {

    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
    }

    connectedCallback() {
        this.addEventListener('click',this.handleClick)
    }

    disconnectedCallback() {
        this.removeEventListener('click',this.handleClick)
    }

   async handleClick() {

    //console.log(await navigator.clipboard.readText());
        const template=this?.querySelector('template')

        if(template===null) {

            console.warn('The template tag is not found')

            return false;
        }

        //Get template textContent
        const templateContent=template?.content.textContent
               
        if(templateContent) {  

            //trim content if trim attribute is set
            const data=this.hasAttribute('trim')?templateContent?.trim():templateContent

            navigator.clipboard.writeText(data)
            .then(()=> {

                this.setAttribute('data-copy','')

                this.dispatchCopyEvent()

            }).catch((err)=> {

                this.hasAttribute('data-copy')?this.removeAttribute('data-copy'):''

                console.error(err.message);

            })
        }
        
    }

    /**
     * Dispatch event copytoclipboard:copy if copy is successful
     */
    dispatchCopyEvent() {
       
        const event=new CustomEvent('copytoclipboard:copy',{cancelable:true})

        this.dispatchEvent(event)

    }
}


customElements.define('copyto-clipboard',CopyToClipboard)
