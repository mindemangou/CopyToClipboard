export class CopyToClipboard extends HTMLElement {

    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
    }

    connectedCallback() {

        if(!this.hasAttribute('disabled')) {
            this.addEventListener('click',this.handleClick)
        }
    }

    disconnectedCallback() {
        
        this.removeEventListener('click',this.handleClick)
    }


   private getTemplate():HTMLTemplateElement|Element|null {

        const template:HTMLTemplateElement|null=this?.querySelector('template')

        const targetSelector=this.getAttribute('target')
        const target=targetSelector?document.querySelector(targetSelector):null
        
        return template||target
    }

    private isTemplateElement(template:Element|HTMLTemplateElement):template is HTMLTemplateElement {

       return template.content?true:false
    }

   async handleClick() {

        const template=this.getTemplate()
        

        if(template===null) {
            console.warn('The template tag or attribut target are not found')
            return false
        }

        //Get template textContent
        const templateContent=this.isTemplateElement(template)?template?.content.textContent:template.textContent;

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
